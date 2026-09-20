# Contoh Konfigurasi Template

## Contoh 1: Template 3 Foto Vertikal

```javascript
{
  id: 1,
  nama: 'Classic Black & White',
  deskripsi: 'Frame vintage hitam putih dengan 3 foto',
  jumlahFoto: 3,
  image: template1,
  thumbnail: template1,
  fotoPositions: [
    { x: 115, y: 235, width: 580, height: 435 },   // Foto 1 (atas)
    { x: 115, y: 730, width: 580, height: 435 },   // Foto 2 (tengah)
    { x: 115, y: 1225, width: 580, height: 435 }   // Foto 3 (bawah)
  ]
}
```

## Contoh 2: Template 4 Foto Grid (2x2)

```javascript
{
  id: 2,
  nama: 'Modern Grid',
  deskripsi: 'Layout grid modern dengan 4 foto',
  jumlahFoto: 4,
  image: template2,
  thumbnail: template2,
  fotoPositions: [
    { x: 50, y: 100, width: 350, height: 450 },    // Foto 1 (kiri atas)
    { x: 420, y: 100, width: 350, height: 450 },   // Foto 2 (kanan atas)
    { x: 50, y: 570, width: 350, height: 450 },    // Foto 3 (kiri bawah)
    { x: 420, y: 570, width: 350, height: 450 }    // Foto 4 (kanan bawah)
  ]
}
```

## Contoh 3: Template 2 Foto Horizontal

```javascript
{
  id: 3,
  nama: 'Side by Side',
  deskripsi: 'Dua foto bersebelahan horizontal',
  jumlahFoto: 2,
  image: template3,
  thumbnail: template3,
  fotoPositions: [
    { x: 50, y: 200, width: 500, height: 700 },    // Foto 1 (kiri)
    { x: 570, y: 200, width: 500, height: 700 }    // Foto 2 (kanan)
  ]
}
```

## Contoh 4: Template 6 Foto (2x3)

```javascript
{
  id: 4,
  nama: 'Full Grid',
  deskripsi: 'Grid lengkap dengan 6 foto',
  jumlahFoto: 6,
  image: template4,
  thumbnail: template4,
  fotoPositions: [
    { x: 50, y: 80, width: 320, height: 240 },     // Foto 1
    { x: 390, y: 80, width: 320, height: 240 },    // Foto 2
    { x: 50, y: 340, width: 320, height: 240 },    // Foto 3
    { x: 390, y: 340, width: 320, height: 240 },   // Foto 4
    { x: 50, y: 600, width: 320, height: 240 },    // Foto 5
    { x: 390, y: 600, width: 320, height: 240 }    // Foto 6
  ]
}
```

## Tips Menentukan Koordinat:

### Menggunakan Browser DevTools:
1. Upload template ke halaman HTML sederhana
2. Gunakan browser DevTools (F12)
3. Hover mouse ke area foto yang diinginkan
4. Lihat koordinat di inspector

### Menggunakan Image Editor:
1. Buka template di Photoshop/GIMP/Figma
2. Aktifkan Ruler (Ctrl+R)
3. Buat Selection di area foto
4. Lihat properties untuk mendapat x, y, width, height

### Formula Umum:
- **x**: Jarak horizontal dari kiri canvas (px)
- **y**: Jarak vertikal dari atas canvas (px)
- **width**: Lebar area foto (px)
- **height**: Tinggi area foto (px)

### Best Practices:
1. Gunakan koordinat bulat (hindari desimal)
2. Pastikan semua foto memiliki ukuran proporsional
3. Sisakan minimal 10px padding dari tepi template
4. Test dengan berbagai ukuran foto untuk memastikan tidak ada distorsi
