# Cara Menambahkan Template Baru

## Langkah 1: Siapkan File Template

1. Buat file gambar template Anda (PNG/JPG) dengan design photo booth
2. Simpan file di folder: `src/assets/template/`
3. Beri nama yang jelas, contoh: `Modern-Colorful-4Photo.png`

## Langkah 2: Tentukan Posisi Foto

Anda perlu menentukan koordinat (x, y) dan ukuran (width, height) untuk setiap area foto di template.

**Cara menentukan koordinat:**
- Buka file template di aplikasi image editor (Photoshop, GIMP, dll)
- Gunakan tool Selection atau Ruler untuk mengukur:
  - `x`: jarak dari kiri (dalam pixel)
  - `y`: jarak dari atas (dalam pixel)
  - `width`: lebar area foto (dalam pixel)
  - `height`: tinggi area foto (dalam pixel)

## Langkah 3: Daftarkan Template di Kode

Buka file `src/data/templates.js` dan tambahkan template baru:

```javascript
// 1. Import file template di bagian atas
import template1 from '../assets/template/Black and White Vintage Photo Booth Frame Bookmark.png'
import template2 from '../assets/template/Modern-Colorful-4Photo.png' // Template baru

// 2. Tambahkan ke array templates
export const templates = [
  {
    id: 1,
    nama: 'Classic Black & White',
    deskripsi: 'Frame vintage hitam putih dengan 3 foto',
    jumlahFoto: 3,
    image: template1,
    thumbnail: template1,
    fotoPositions: [
      { x: 115, y: 235, width: 580, height: 435 },
      { x: 115, y: 730, width: 580, height: 435 },
      { x: 115, y: 1225, width: 580, height: 435 }
    ]
  },
  // Template baru
  {
    id: 2,
    nama: 'Modern Colorful',
    deskripsi: 'Frame modern warna-warni dengan 4 foto',
    jumlahFoto: 4,
    image: template2,
    thumbnail: template2,
    fotoPositions: [
      { x: 50, y: 100, width: 300, height: 400 },   // Foto 1
      { x: 370, y: 100, width: 300, height: 400 },  // Foto 2
      { x: 50, y: 520, width: 300, height: 400 },   // Foto 3
      { x: 370, y: 520, width: 300, height: 400 }   // Foto 4
    ]
  }
]
```

## Penjelasan Field Template:

- **id**: Nomor unik untuk template (harus berbeda)
- **nama**: Nama template yang akan ditampilkan
- **deskripsi**: Deskripsi singkat template
- **jumlahFoto**: Berapa banyak foto yang dibutuhkan (2, 3, 4, 6, dll)
- **image**: File template yang digunakan untuk hasil akhir
- **thumbnail**: Gambar preview (bisa sama dengan image)
- **fotoPositions**: Array koordinat untuk setiap foto
  - Jumlah element dalam array harus sama dengan `jumlahFoto`
  - Urutan array = urutan pengambilan foto

## Langkah 4: Test Template

1. Refresh aplikasi di browser
2. Klik "Mulai Sekarang"
3. Template baru akan muncul di halaman pilih template
4. Pilih template dan test pengambilan foto
5. Download hasil dan cek apakah foto sudah pas di posisinya

## Tips:

- Gunakan resolusi template yang konsisten (misal: 800x1200px untuk portrait)
- Pastikan area foto tidak terlalu dekat dengan tepi template
- Test dengan berbagai ukuran kamera untuk memastikan foto tidak terdistorsi
- Buat thumbnail khusus yang lebih kecil untuk performa lebih baik

## Troubleshooting:

**Foto tidak pas di template?**
- Sesuaikan nilai `x`, `y`, `width`, `height` di `fotoPositions`
- Gunakan tool inspector browser untuk debug koordinat

**Template tidak muncul?**
- Pastikan import path file sudah benar
- Cek console browser untuk error
- Pastikan file ada di folder `src/assets/template/`

**Foto terpotong atau terdistorsi?**
- Sesuaikan aspect ratio di `width` dan `height`
- Pastikan area foto di template cukup besar
