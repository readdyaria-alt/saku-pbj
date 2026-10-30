# Panduan Mengaktifkan Chatbot AI (Tanya Saku)

Chatbot AI butuh **server perantara** di Cloudflare supaya API key Dinoiki tidak terlihat di aplikasi. Waktu pengerjaan ±15 menit.

## Yang perlu disiapkan

- **API key Dinoiki** dari dashboard ai.dinoiki.com (pastikan saldo terisi).
- **Akun Cloudflare** gratis: daftar di dash.cloudflare.com/sign-up.
- File **`worker.js`** (ada di folder ini).

> **Jangan kirim API key ke siapa pun**, termasuk ke chat. API key hanya dimasukkan di langkah 3.

## 1. Buat Worker

1. Masuk ke **dash.cloudflare.com**.
2. Menu kiri: **Workers & Pages** → **Create** → **Create Worker** (pilih *Start with Hello World* bila ditanya).
3. Beri nama **`saku-pbj-ai`** → **Deploy**.

## 2. Tempel kode

1. Di halaman Worker, klik **Edit code**.
2. Hapus semua kode bawaan, lalu **tempel seluruh isi `worker.js`**.
3. Klik **Deploy** (kanan atas).

## 3. Masukkan API key

1. Kembali ke halaman Worker → tab **Settings** → **Variables and Secrets** → **Add**.
2. Isi:
   - **Type:** `Secret`
   - **Variable name:** `DINOIKI_KEY`
   - **Value:** API key Dinoiki Anda
3. Klik **Deploy**.

## 4. Atur alamat API (bila perlu)

Bawaan Worker: `https://ai.dinoiki.com/v1` dengan model `gpt-4o-mini`.

Cek dokumentasi API di dashboard Dinoiki. **Kalau alamatnya berbeda** (mis. `https://ai.dinoiki.com/api/v1`), tambahkan variabel:

- **Type:** `Text` · **Name:** `BASE_URL` · **Value:** alamat API **tanpa** `/chat/completions`

Untuk mengganti model, tambahkan `MODEL` (Text) dengan nama model dari dashboard Dinoiki.

## 5. Batas pemakaian harian (disarankan)

Supaya saldo tidak habis kalau link aplikasi tersebar:

1. Menu kiri: **Storage & Databases** → **KV** → **Create** → nama `saku-pbj-rate`.
2. Kembali ke Worker → **Settings** → **Bindings** → **Add** → **KV namespace**.
   - **Variable name:** `RATE` · **KV namespace:** `saku-pbj-rate` → **Deploy**.
3. Bawaan: **300 pertanyaan/hari** total dan **40/hari per perangkat**. Ubah lewat variabel Text `DAILY_LIMIT` dan `PER_IP_LIMIT`.

## 6. Cek & kirim alamat Worker

1. Di halaman Worker, salin alamatnya, bentuknya: `https://saku-pbj-ai.NAMA-ANDA.workers.dev`
2. Buka alamat itu di browser. Harus muncul:
   `{"ok":true,"service":"Saku PBJ AI","model":"gpt-4o-mini","key":true}`
   - `"key":false` → API key belum tersimpan (ulangi langkah 3).
3. **Kirim alamat Worker itu ke Claude.** Alamat ini **bukan rahasia**; Claude akan memasangnya di aplikasi.

## Kalau ada masalah

| Pesan di chatbot | Artinya | Yang dilakukan |
|---|---|---|
| API key ditolak | Key salah/kedaluwarsa | Ganti `DINOIKI_KEY` |
| Saldo layanan AI habis | Saldo Dinoiki kosong | Isi saldo |
| Alamat API/model tidak ditemukan | `BASE_URL`/`MODEL` salah | Cek dokumentasi Dinoiki |
| Kuota harian habis | Batas harian tercapai | Tunggu besok / naikkan `DAILY_LIMIT` |

Detail error teknis bisa dilihat di Worker → tab **Logs**.

## Catatan keamanan

- Worker hanya melayani aplikasi dari `https://readdyaria-alt.github.io`. Pembatasan ini menghalangi situs lain, tetapi tidak menghalangi skrip yang memalsukan asal, jadi **batas harian (langkah 5) tetap disarankan**.
- Pertanyaan pengguna dan kutipan Pedoman/TKO dikirim ke Dinoiki untuk diproses. Hindari mengetik data rahasia (nilai HPS, nama vendor tertentu) di chat.
