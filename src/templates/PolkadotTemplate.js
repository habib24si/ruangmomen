// Polkadot Template (versi coding — tanpa file gambar)
// Dibuat 100% via Canvas API. Meniru pola polkadot pada gambar referensi:
// latar krem dengan titik-titik cokelat zaitun berganting (staggered grid),
// ukuran & jarak titik disamakan dengan aslinya. Foto diletakkan pada 3 slot
// vertikal di atas latar tersebut (kotak hijau pengisi sudah dihapus).
// Ukuran kanvas 2x dari referensi (600x1800 -> 1200x3600) agar tajam.

import { roundRectPath } from '../utils/imageHelper'

// ---------- PALET (diambil dari pixel sampling gambar referensi) ----------
const WARNA_LATAR = '#fffbeb'   // krem hangat
const WARNA_TITIK = '#7d622b'   // cokelat zaitun untuk titik polkadot
const WARNA_TEKS  = '#000000'   // caption footer: hitam pekat (sesuai sampling)
const WARNA_HATI  = '#cf3634'   // merah hati (rgb 207,54,52) sesuai gambar
const WARNA_PATOK = '#7dd956'   // hijau lembut sebagai penanda/patok slot foto

// ---------- GEOMETRI (koordinat final di kanvas 1200x3600) ----------
// Kotak hijau asli (di 600x1800): kiri=60, y=[80, 552, 1026], w=480, h=418, radius=20
const SLOT = [
  { x: 120,  y: 160,  width: 960, height: 838, radius: 40 },
  { x: 120,  y: 1104, width: 960, height: 838, radius: 40 },
  { x: 120,  y: 2052, width: 960, height: 838, radius: 40 }
]

// ---------- POLKADOT HELPER ----------
// Ukuran & jarak titik disamakan dengan gambar referensi (skala 2x):
// diameter titik ~60px (r=30), jarak horizontal ~370px, vertikal ~180px,
// baris genap digeser setengah periode (stagger) sama seperti aslinya.
const gambarPolkadot = (ctx, W, H) => {
  const periodX = 370
  const periodY = 180
  const radiusDot = 30
  ctx.fillStyle = WARNA_TITIK
  let baris = 0
  for (let y = 90; y < H; y += periodY, baris++) {
    const offset = (baris % 2) * (periodX / 2) + 240
    for (let x = offset - periodX; x < W + periodX; x += periodX) {
      ctx.beginPath()
      ctx.arc(x, y, radiusDot, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

export const generatePolkadotTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 1200)
    const H = (canvas.height = 3600)

    // ---------- LATAR KREM ----------
    ctx.fillStyle = WARNA_LATAR
    ctx.fillRect(0, 0, W, H)

    // ---------- TITIK POLKADOT ----------
    gambarPolkadot(ctx, W, H)

    // ---------- PATOKAN SLOT FOTO ----------
    // Sama seperti template lain: slot ditandai dengan bingkai putus-putus
    // + tint hijau tipis supaya terlihat jelas di mana foto akan ditempatkan.
    // Bukan blok hijau pekat — hanya guide, foto asli akan menimpanya.
    SLOT.forEach((s) => {
      // isian hijau sangat tipis (10%) — hanya untuk visual preview
      roundRectPath(ctx, s.x, s.y, s.width, s.height, s.radius)
      ctx.fillStyle = 'rgba(125, 217, 86, 0.10)'
      ctx.fill()

      // border hijau solid tipis
      roundRectPath(ctx, s.x, s.y, s.width, s.height, s.radius)
      ctx.strokeStyle = WARNA_PATOK
      ctx.lineWidth = 4
      ctx.stroke()

      // garis putus-putus di dalam (gaya "stitch" potong di sini)
      const inset = 14
      roundRectPath(
        ctx,
        s.x + inset, s.y + inset,
        s.width - inset * 2, s.height - inset * 2,
        Math.max(0, s.radius - inset)
      )
      ctx.strokeStyle = WARNA_PATOK
      ctx.lineWidth = 3
      ctx.setLineDash([14, 14])
      ctx.stroke()
      ctx.setLineDash([])
    })

    // ---------- CAPTION FOOTER (disamakan dengan gambar referensi) ----------
    // Di gambar asli teks berada pada baris y ~ 1600-1628 (600x1800) =
    // y ~ 3200-3256 (1200x3600), warna hitam pekat dengan dua hati merah
    // kecil mengapit kata. Font: script/handwritten tebal miring.
    const Y_TEKS = 3230
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = WARNA_TEKS
    ctx.font = 'italic 700 78px "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive'
    ctx.fillText('ruang momen', W / 2 + 30, Y_TEKS)

    // Dua hati merah kecil mengapit teks (menggambar manual agar warna solid)
    const gambarHati = (cx, cy, size, color) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(size / 100, size / 100)
      ctx.beginPath()
      ctx.moveTo(0, 30)
      ctx.bezierCurveTo(-60, -20, -30, -70, 0, -35)
      ctx.bezierCurveTo(30, -70, 60, -20, 0, 30)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }
    gambarHati(W / 2 - 260, Y_TEKS + 4, 34, WARNA_HATI)
    gambarHati(W / 2 + 300, Y_TEKS + 4, 34, WARNA_HATI)

    // positions dikembalikan persis dengan geometri slot (tanpa rotasi)
    const positions = SLOT.map((s) => ({
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
      radius: s.radius,
      rotation: 0
    }))

    resolve({ dataUrl: canvas.toDataURL('image/png'), positions })
  })
}

export const PolkadotTemplateConfig = {
  id: 12,
  nama: 'Polkadot',
  deskripsi: 'Krem polkadot dengan 3 foto hijau vertikal',
  jumlahFoto: 3,
  style: 'cute',
  isDefault: false,
  generator: generatePolkadotTemplate
}
