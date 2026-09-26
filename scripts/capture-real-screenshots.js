/**
 * Headless Brave Screenshot Capture via Chrome DevTools Protocol
 * Captures authentic, non-redirected screenshots of /login, /dashboard, and /duels.
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

function httpPut(host, port, pathUrl) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host, port, path: pathUrl, method: 'PUT' }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

const bravePath = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const userDataDir = 'C:\\tmp\\brave-cdp-' + Date.now();
const screenshotsDir = path.resolve(__dirname, '..', 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

let reqId = 1;
function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = reqId++;
    const handler = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      } catch (err) {
        // ignore parse error
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  console.log('Spawning headless Brave...');
  const brave = spawn(bravePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
  ]);

  // wait for CDP port
  let connected = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      await httpGet('http://127.0.0.1:9222/json/version');
      connected = true;
      break;
    } catch {
      // retry
    }
  }

  if (!connected) {
    console.error('Failed to connect to Brave CDP');
    brave.kill();
    process.exit(1);
  }

  console.log('Connected to Brave CDP. Creating page via PUT /json/new...');
  const target = await httpPut('127.0.0.1', 9222, '/json/new');
  console.log('Page created:', target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });

  console.log('WebSocket connection opened. Configuring viewport...');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  // 1. Capture /login
  console.log('1. Navigating to /login...');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:3000/login' });
  await new Promise(r => setTimeout(r, 3000));
  const loginScreenshot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const loginPath = path.join(screenshotsDir, 'login.png');
  fs.writeFileSync(loginPath, Buffer.from(loginScreenshot.data, 'base64'));
  console.log(`✓ Saved ${loginPath} (${fs.statSync(loginPath).size} bytes)`);

  // Inject authenticated user into localStorage
  console.log('Injecting authenticated user state...');
  const userPayload = JSON.stringify({
    state: {
      user: {
        id: 'student-main',
        username: 'Öğrenci',
        fullName: 'Öğrenci',
        email: 'ogrenci@cognito.edu',
        avatarUrl: 'user',
        totalXP: 450,
        level: 3,
        currentStreak: 3,
        longestStreak: 5,
        lastActiveDate: new Date().toISOString().split('T')[0],
        badges: ['haftalik-istikrar', 'pisagor-ustasi'],
        gems: 150,
        hearts: 5,
        grade: 9,
        isRepeater: false,
        learningMode: 'standard',
        isOnboarded: true,
        isAuthenticated: true,
        placementTickets: 1,
        lastWeeklyClaimDate: new Date().toISOString().split('T')[0],
        clanId: 'clan-fen-bilimleri',
      }
    },
    version: 0,
  });

  await sendCommand(ws, 'Runtime.evaluate', {
    expression: `localStorage.setItem('cognito-storage', ${JSON.stringify(userPayload)});`,
  });

  // 2. Capture /dashboard
  console.log('2. Navigating to /dashboard...');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:3000/dashboard' });
  await new Promise(r => setTimeout(r, 3500));
  const dashScreenshot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const dashPath = path.join(screenshotsDir, 'dashboard.png');
  fs.writeFileSync(dashPath, Buffer.from(dashScreenshot.data, 'base64'));
  console.log(`✓ Saved ${dashPath} (${fs.statSync(dashPath).size} bytes)`);

  // 3. Capture /duels
  console.log('3. Navigating to /duels...');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:3000/duels' });
  await new Promise(r => setTimeout(r, 3500));
  const duelsScreenshot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const duelsPath = path.join(screenshotsDir, 'duels.png');
  fs.writeFileSync(duelsPath, Buffer.from(duelsScreenshot.data, 'base64'));
  console.log(`✓ Saved ${duelsPath} (${fs.statSync(duelsPath).size} bytes)`);

  ws.close();
  brave.kill();
  console.log('All screenshots captured successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
