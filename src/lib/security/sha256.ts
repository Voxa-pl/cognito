/**
 * Pure TypeScript standard SHA-256 and HMAC-SHA-256 (FIPS PUB 180-4)
 * Zero external dependencies. Works identically in Node.js and Browser.
 */

// Initial hash values (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19)
const H_INIT: readonly number[] = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];

// Round constants (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
const K: readonly number[] = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function rightRotate(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

function utf8Encode(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0xd800 || code >= 0xe000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      i++;
      code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    }
  }
  return bytes;
}

export function sha256Bytes(data: number[]): string {
  const bitLength = data.length * 8;

  // Pre-processing (Padding)
  const padded = [...data, 0x80];
  while ((padded.length % 64) !== 56) {
    padded.push(0x00);
  }

  // Append length in bits as 64-bit big-endian integer
  // High 32 bits
  const highBits = Math.floor(bitLength / 0x100000000);
  padded.push((highBits >>> 24) & 0xff);
  padded.push((highBits >>> 16) & 0xff);
  padded.push((highBits >>> 8) & 0xff);
  padded.push(highBits & 0xff);
  // Low 32 bits
  padded.push((bitLength >>> 24) & 0xff);
  padded.push((bitLength >>> 16) & 0xff);
  padded.push((bitLength >>> 8) & 0xff);
  padded.push(bitLength & 0xff);

  const h = [...H_INIT];
  const w = new Int32Array(64);

  // Process each 512-bit (64-byte) chunk
  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i++) {
      const idx = offset + (i * 4);
      w[i] =
        ((padded[idx] & 0xff) << 24) |
        ((padded[idx + 1] & 0xff) << 16) |
        ((padded[idx + 2] & 0xff) << 8) |
        (padded[idx + 3] & 0xff);
    }

    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }

    let a = h[0];
    let b = h[1];
    let c = h[2];
    let d = h[3];
    let e = h[4];
    let f = h[5];
    let g = h[6];
    let h_val = h[7];

    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h_val + S1 + ch + K[i] + w[i]) | 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h_val = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    h[0] = (h[0] + a) | 0;
    h[1] = (h[1] + b) | 0;
    h[2] = (h[2] + c) | 0;
    h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0;
    h[5] = (h[5] + f) | 0;
    h[6] = (h[6] + g) | 0;
    h[7] = (h[7] + h_val) | 0;
  }

  // Produce hex output
  let hex = '';
  for (let i = 0; i < 8; i++) {
    const val = (h[i] >>> 0).toString(16).padStart(8, '0');
    hex += val;
  }
  return hex;
}

export function sha256(input: string): string {
  return sha256Bytes(utf8Encode(input));
}

export function hmacSha256(key: string, message: string): string {
  const blockSize = 64; // 512 bits = 64 bytes
  let keyBytes = utf8Encode(key);

  if (keyBytes.length > blockSize) {
    const keyHashHex = sha256Bytes(keyBytes);
    keyBytes = [];
    for (let i = 0; i < keyHashHex.length; i += 2) {
      keyBytes.push(parseInt(keyHashHex.substring(i, i + 2), 16));
    }
  }

  while (keyBytes.length < blockSize) {
    keyBytes.push(0);
  }

  const oKeyPad: number[] = new Array(blockSize);
  const iKeyPad: number[] = new Array(blockSize);

  for (let i = 0; i < blockSize; i++) {
    oKeyPad[i] = keyBytes[i] ^ 0x5c;
    iKeyPad[i] = keyBytes[i] ^ 0x36;
  }

  const messageBytes = utf8Encode(message);
  const innerData = [...iKeyPad, ...messageBytes];
  const innerHashHex = sha256Bytes(innerData);

  const innerHashBytes: number[] = [];
  for (let i = 0; i < innerHashHex.length; i += 2) {
    innerHashBytes.push(parseInt(innerHashHex.substring(i, i + 2), 16));
  }

  const outerData = [...oKeyPad, ...innerHashBytes];
  return sha256Bytes(outerData);
}
