# Panduan Unggah & Instal — Aplikasi Saku PBJ (PWA)

## Penting sebelum mengunggah

- Situs **GitHub Pages bisa dibuka siapa saja** yang tahu link-nya. Dengan akun GitHub gratis, repository-nya juga harus **publik** (isi file bisa dilihat orang lain).
- Pastikan isi Pedoman & TKO **boleh dipublikasikan** (cek ke Fungsi Procurement / Legal). Kalau tidak boleh, pakai hosting internal kantor (server/intranet yang mendukung HTTPS) — file di folder ini sama saja.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Aplikasi utama, sudah berisi seluruh isi buku saku (bisa dibuka langsung untuk melihat isi) |
| `manifest.webmanifest` | Identitas aplikasi (nama, ikon, warna) |
| `sw.js` | Service worker, agar bisa dibuka offline |
| `icon-*.png`, `apple-touch-icon.png`, `logo.png` | Ikon & logo |

Semua file harus diunggah bersama, di folder yang sama.

## Coba di komputer

**Ekstrak dulu** zip-nya (klik kanan → *Extract All*), lalu buka `index.html`. Isi bisa dibaca, tetapi fitur instal & offline baru aktif setelah diunggah ke hosting HTTPS.

## Langkah unggah ke GitHub Pages

1. Masuk ke **github.com** → tombol **New** (repository baru).
2. Beri nama, mis. `saku-pbj`, pilih **Public**, lalu **Create repository**.
3. Klik **uploading an existing file** → tarik semua file dari folder ini → **Commit changes**.
4. Buka **Settings → Pages**. Di *Branch* pilih **main** dan folder **/(root)** → **Save**.
5. Tunggu 1–2 menit. Link aplikasi muncul di halaman itu, bentuknya:
   `https://NAMA-AKUN.github.io/saku-pbj/`

## Instal di HP

**Android (Chrome)**
1. Buka link aplikasi di Chrome.
2. Tekan tombol **Pasang aplikasi** di Beranda, atau menu ⋮ → **Instal aplikasi / Tambahkan ke layar utama**.

**iPhone (Safari)**
1. Buka link aplikasi di **Safari** (bukan Chrome).
2. Tekan tombol **Bagikan** (kotak dengan panah ke atas) → **Tambahkan ke Layar Utama**.

Setelah dibuka sekali saat online, aplikasi bisa dipakai **offline**.

## Memperbarui isi aplikasi

1. Ganti file yang berubah di repository GitHub (upload ulang).
2. Buka `sw.js`, naikkan versi (sekarang `saku-pbj-v2` → `saku-pbj-v3`) (naikkan angkanya setiap update), lalu upload.
3. Di HP, tutup lalu buka lagi aplikasinya (mungkin perlu dua kali) agar versi baru termuat.

## Catatan

- **Checklist paket tersimpan di masing-masing HP**, tidak tersinkron antar pengguna. Menghapus data browser/aplikasi akan menghapus checklist.
- Kalkulator tenggat **belum memperhitungkan libur nasional & cuti bersama**.
- Aplikasi ini ringkasan; keputusan tetap mengacu dokumen asli Pedoman No. A-002/B24000/2023-S9 dan TKO No. B-008/B24000/2023-S9.
