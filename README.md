# Media Pembelajaran Interaktif — Perbandingan

Media pembelajaran interaktif Matematika untuk SMP Kelas 7, materi **Perbandingan**.

## Isi Materi

- **Konsep dasar perbandingan** — lewat Laboratorium Apel & Jeruk dengan slider visual
- **Menyederhanakan perbandingan** — kalkulator dengan langkah FPB
- **Perbandingan senilai** — simulasi toko buku, lengkap dengan tabel dan grafik garis lurus
- **Perbandingan berbalik nilai** — simulasi pekerja vs hari, lengkap dengan grafik melengkung
- **Skala peta** — kalkulator skala 3 mode
- **Contoh soal** — 4 contoh soal dengan pembahasan langkah demi langkah
- **Kuis interaktif** — 8 soal dengan penilaian dan penjelasan instan
- **Rangkuman rumus**

Tampilan responsif (nyaman dibuka di laptop maupun HP) dan mengikuti mode terang/gelap perangkat.

## Struktur File

```
media-perbandingan-html-css-js/
├── index.html   # Struktur dan isi media pembelajaran
├── style.css    # Semua tampilan (warna, layout, responsif)
├── script.js    # Semua interaktivitas (slider, kalkulator, simulasi, kuis)
└── README.md    # File ini
```

Ketiga file `index.html`, `style.css`, dan `script.js` harus tetap berada dalam satu folder yang sama, karena `index.html` memuat CSS dan JavaScript dari file tetangganya.

## Cara Menjalankan

1. Unduh ketiga file (`index.html`, `style.css`, `script.js`) ke dalam satu folder yang sama.
2. Buka `index.html` dengan cara klik dua kali, atau klik kanan lalu **Open with** browser (Chrome, Edge, Firefox, atau Safari).
3. Tidak perlu instalasi, server, atau aplikasi tambahan.

## Cara Menggunakan di Kelas

- **Pembelajaran klasikal:** tampilkan di proyektor, lalu ajak siswa mencoba slider dan simulasi bersama-sama.
- **Belajar mandiri:** siswa membuka file di laptop/HP masing-masing, mempelajari materi, lalu mengerjakan kuis.
- **Tugas/latihan:** siswa dapat mengulang kuis dan mencoba angka yang berbeda pada kalkulator serta simulasi.

## Catatan

- Font utama (Plus Jakarta Sans dan Caveat) dimuat dari Google Fonts, sehingga tampil paling bagus saat perangkat terhubung internet. Tanpa internet, media tetap bisa dibuka dan digunakan dengan font pengganti bawaan sistem.
- Gambar ilustrasi sudah tertanam di dalam `index.html`, jadi tidak ada file gambar tambahan yang perlu diunduh.

## Mengubah / Mengembangkan

- **Mengubah teks, soal, atau contoh:** edit `index.html` dan `script.js` (soal kuis ada di `script.js`).
- **Mengubah warna atau tampilan:** edit `style.css`.
- Setelah mengedit, simpan file lalu muat ulang (`refresh`) halaman di browser.

## Kebutuhan Sistem

- Browser modern (Chrome, Edge, Firefox, atau Safari versi terbaru).
- Tidak memerlukan koneksi internet, kecuali untuk memuat font Google Fonts.
