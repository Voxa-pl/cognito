# Cognito • Bilişsel ve Akademik Öğrenme Platformu

> **Lise akademik standartlarına tam uyumlu**, yapay zeka destekli akıllı eksik teşhis motoru, dinamik kazanım takip sistemi, klanlar arası canlı akademik düello arenası ve dokunsal S-Curve oyunlaştırma kokpiti.

---

## 🌟 Öne Çıkan Sistemler & Özellikler

1. **Akıllı Eksik Teşhis & Telafi Motoru:**
   - Öğrencinin çözdüğü tüm test ve quiz sonuçlarını anlık analiz eder.
   - Kavram kavrama oranı **%60 akademik başarı eşiğinin altına düşen** konuları otomatik olarak "Geliştirilmesi Gereken Zayıf Nokta" etiketiyle işaretler.
   - Öğrenciye **1-tıkla "Eksik Kapatma Antrenmanı"** sunarak eksiklerin derhal telafi edilmesini sağlar.

2. **Kazanım Takip Sistemi & Sınav Tahmincisi:**
   - Tamamlanan ve ustalaşılan ders kazanımlarını ağırlıklarına göre puanlar.
   - Öğrencinin dönem sonu okul sınavı ve akademik başarı tahminini (örn. **Tahmini Okul Sınav Başarısı: 88/100**) dinamik hesaplar.
   - Branş bazlı (Matematik, Fizik, Kimya, Biyoloji vb.) kazanım hakimiyetini görsel ilerleme çubuklarıyla sunar.

3. **Klanlar Arası Canlı Akademik Düello & Bilişsel Hız Turu:**
   - 6 haneli özel oda kodları (`COG-XXX`) ile sınıf ve klan arkadaşlarına anlık meydan okuma.
   - 5 soruluk eşzamanlı sürat turu ve 30 saniyelik dinamik geri sayım sayacı.
   - Hızlı ve doğru yanıtlara +50 puana kadar sürat bonusu.
   - Düelloda kaçırılan veya boş bırakılan soruların otomatik olarak Akıllı Hata Defteri'ne yönlendirilmesi.

4. **Akıllı Hata Defteri & Ebbinghaus Aralıklı Tekrar (Spaced Repetition):**
   - Quiz, seviye belirleme ve yazılı senaryolarında yapılan tüm hataları hafıza havuzunda toplar.
   - Ebbinghaus unutma eğrisi algoritmasıyla kritik zamanlarda (1., 3., 7., 14. Gün) öğrencinin karşısına çıkarır.
   - Hatasız tamamlanan tekrar oturumlarında öğrencinin sınav tolerans kalkanını (+1) yeniler.

5. **Akademik Klanlar (10 Kişilik Kontenjan Sınırı):**
   - 10 kişilik butik akademik çalışma takımları.
   - Klan haftalık soru ve XP hedefleri, klan içi dayanışma panosu ve lig rekabeti.

6. **Prestijli ve Zorlu XP Ekonomisi & Bot Koruması:**
   - Rütbe enflasyonunu önleyen, yüzlerce soru ve disiplinli çalışma gerektiren seviye eğrisi.
   - Hızlı okuyan dahi öğrencileri engellemeyen, 0.5 saniye eşikli anti-cheat ve kriptografik oturum güvenliği.

7. **Kişiselleştirilmiş Oryantasyon & Phoenix (Yeniden Doğuş) Telafi Modu:**
   - 9, 10, 11 ve 12. Sınıf seviye seçimi.
   - Sınıf tekrarı yapan öğrencilere özel "Zümrüdüanka / Küllerinden Doğan Azim" telafi ve motivasyon modu.

8. **Google OAuth & Çevrimdışı/Demo Test Güvencesi:**
   - Supabase Auth `signInWithOAuth({ provider: 'google' })` altyapısı.
   - Canlı Supabase anahtarları olmadan da kesintisiz test ve değerlendirme yapılabilmesini sağlayan tek tıkla **Geliştirici / Demo Hesabı** modu.
   - Alt kısımda şık ve göze batmayan açılır **Yasal & Gizlilik Akordiyonu** (KVKK, Kullanım Koşulları ve Akademik Kazanım Standartları Bildirimi).

---

## 🛠️ Teknoloji Yığını

- **Framework:** Next.js 16 (App Router, Webpack / Turbopack)
- **UI & İkonlar:** React 19, Tailwind CSS 4, Lucide React (Sıfır raw unicode emoji, %100 vektörel SVG ikonlar)
- **Durum Yönetimi:** Zustand (Persistent `cognito-storage` with secure hash validation)
- **Veritabanı & Kimlik Doğrulama:** Supabase PostgreSQL (`profiles`, `topic_progress`, `quiz_attempts`, `duel_rooms`, `mistake_vault`)
- **Ses & Hissiyat:** Web Audio API sentezli dokunsal ses efektleri
- **Karanlık Mod:** Standart koyu tema (`#0f172a` deep slate) ve canlı tema değiştirici

---

## 🚀 Vercel Üzerinde Yayınlama (Deployment Guide)

Cognito, Vercel üzerinde tek tıkla çalışacak şekilde sıfır konfigürasyonla (zero-config) optimize edilmiştir:

### Yöntem 1: GitHub ile Dağıtım (Önerilen)
1. Bu projeyi bir GitHub deposuna gönderin:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Cognito academic platform"
   git branch -M main
   git remote add origin https://github.com/<kullanici-adiniz>/cognito.git
   git push -u origin main
   ```
2. [Vercel Dashboard](https://vercel.com/new)'a gidin ve GitHub deponuzu seçin.
3. **Framework Preset:** `Next.js` olarak otomatik algılanacaktır.
4. **Environment Variables (Opsiyonel):**
   - Canlı Supabase veritabanı kullanacaksanız:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - *Not: Bu değişkenler girilmese bile platform tam otomatik demo ve offline modda kusursuzca çalışır!*
5. **Deploy** butonuna tıklayın!

### Yöntem 2: Vercel CLI ile Doğrudan Dağıtım
```bash
npx vercel
# İlk dağıtım sonrası prodüksiyona almak için:
npx vercel --prod
```

---

## 💻 Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Doğrulama testlerini çalıştır
node scripts/verify-cognito.js
npx tsx scripts/verify-duels-and-xp.ts
npx tsx scripts/verify-anti-cheat.ts

# Üretim derlemesini test et
npm run build
```

---

## 📄 Lisans & Yasal Bildirim

Cognito © 2026 • Bilişsel ve Akademik Öğrenme Platformu. Tüm Hakları Saklıdır.
Tüm ders içerikleri ve soru modelleri Türkiye lise öğrenim standartları ve resmi kazanım çerçeveleri referans alınarak pedagojik prensiplerle tasarlanmıştır.
