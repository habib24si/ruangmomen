// Cute Pastel Template
// Frame pastel pink ala "cewek imut": 4 foto kotak di kartu putih membulat,
// dihiasi hati, bintang kelip, dan tulisan tangan manis — siap posting Instagram (4:5).
// Rotasi tiap foto didukung lewat field `rotation` pada positions.
import { roundRectPath } from '../utils/imageHelper'

// Gambar bentuk hati (berpusat di cx, cy dengan ukuran size)
const drawHeart = (ctx, cx, cy, size, color) => {
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

// Gambar bintang kelip 4 ujung (sparkle)
const drawSparkle = (ctx, cx, cy, size, color) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  const outer = size
  const inner = size * 0.28
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI / 4) * i - Math.PI / 2
    const x = Math.cos(a) * r
    const y = Math.sin(a) * r
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

export const generateCutePastelTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Rasio 4:5 — rasio ideal feed Instagram
    const W = (canvas.width = 1000)
    const H = (canvas.height = 1250)

    // ---------- LATAR PASTEL ----------
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#ffeaf3')
    bg.addColorStop(0.55, '#fddcec')
    bg.addColorStop(1, '#fbe3ef')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Titik-titik polka putih halus
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    for (let y = 40; y < H; y += 64) {
      for (let x = 40 + ((y / 64) % 2) * 32; x < W; x += 64) {
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Bingkai luar: garis putih berbulat (stitch) ala kartu ucapan
    ctx.strokeStyle = 'rgba(255,255,255,0.95)'
    ctx.lineWidth = 8
    ctx.setLineDash([2, 20])
    ctx.lineCap = 'round'
    roundRectPath(ctx, 26, 26, W - 52, H - 52, 42)
    ctx.stroke()
    ctx.setLineDash([])

    // ---------- JUDUL ----------
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#e0559a'
    ctx.font = '66px "Segoe Script", "Bradley Hand", "Comic Sans MS", cursive'
    ctx.fillText('Sweet Moment', W / 2, 118)

    // Pita & kelip di sekitar judul
    ctx.font = '44px "Segoe UI Emoji", "Apple Color Emoji", sans-serif'
    ctx.fillText('🎀', W / 2 - 260, 112)
    ctx.fillText('🎀', W / 2 + 260, 112)
    drawSparkle(ctx, W / 2 - 170, 70, 16, '#f9a8d4')
    drawSparkle(ctx, W / 2 + 175, 150, 13, '#f9a8d4')

    const tanggal = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    ctx.fillStyle = '#c06a97'
    ctx.font = '600 24px "Segoe UI", Arial, sans-serif'
    ctx.fillText(tanggal.toUpperCase(), W / 2, 190)

    // ---------- GEOMETRI KARTU FOTO ----------
    const PHOTO = 356
    const half = PHOTO / 2
    const cardW = 404
    const cardH = 404

    const cards = [
      { cx: 282, cy: 486, a: -3 },
      { cx: 718, cy: 486, a: 2.5 },
      { cx: 282, cy: 878, a: 2 },
      { cx: 718, cy: 878, a: -2.5 }
    ]

    // posisi foto (kotak 1:1, rotasi ikut agar pas dengan bingkai)
    const positions = cards.map((c) => ({
      x: c.cx - half,
      y: c.cy - half,
      width: PHOTO,
      height: PHOTO,
      radius: 22,
      rotation: c.a
    }))

    // warna aksen border tiap foto (pastel bergantian)
    const aksen = ['#f9a8d4', '#c4b5fd', '#a7f3d0', '#fdba74']

    // ---------- GAMBAR TIAP KARTU ----------
    cards.forEach((c, i) => {
      ctx.save()
      ctx.translate(c.cx, c.cy)
      ctx.rotate((c.a * Math.PI) / 180)

      // kartu putih membulat + bayangan lembut
      ctx.shadowColor = 'rgba(219, 39, 119, 0.22)'
      ctx.shadowBlur = 28
      ctx.shadowOffsetY = 14
      roundRectPath(ctx, -cardW / 2, -cardH / 2, cardW, cardH, 34)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      // bingkai pastel tipis mengelilingi foto
      roundRectPath(ctx, -half - 8, -half - 8, PHOTO + 16, PHOTO + 16, 28)
      ctx.strokeStyle = aksen[i % aksen.length]
      ctx.lineWidth = 5
      ctx.stroke()

      // area foto (placeholder, akan tertutup foto)
      roundRectPath(ctx, -half, -half, PHOTO, PHOTO, 22)
      ctx.fillStyle = '#fbe3ef'
      ctx.fill()

      // hati kecil di tengah bawah kartu
      drawHeart(ctx, 0, half + 24, 15, aksen[i % aksen.length])

      ctx.restore()
    })

    // ---------- DEKORASI DI SELA KARTU ----------
    drawHeart(ctx, W / 2, 682, 26, '#f472b6')
    drawSparkle(ctx, W / 2 - 70, 640, 15, '#f9a8d4')
    drawSparkle(ctx, W / 2 + 70, 724, 15, '#c4b5fd')
    drawHeart(ctx, 88, 682, 14, '#f9a8d4')
    drawHeart(ctx, W - 88, 682, 14, '#f9a8d4')

    // kelip di sudut-sudut
    drawSparkle(ctx, 96, 262, 18, '#fda4d0')
    drawSparkle(ctx, W - 96, 1096, 18, '#fda4d0')
    drawHeart(ctx, W - 100, 258, 16, '#f9a8d4')
    drawHeart(ctx, 100, 1094, 16, '#f9a8d4')

    // ---------- FOOTER ----------
    const pillW = 520
    const pillH = 86
    const pillY = 1122
    ctx.shadowColor = 'rgba(219, 39, 119, 0.16)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 8
    roundRectPath(ctx, W / 2 - pillW / 2, pillY, pillW, pillH, pillH / 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    roundRectPath(ctx, W / 2 - pillW / 2 + 6, pillY + 6, pillW - 12, pillH - 12, (pillH - 12) / 2)
    ctx.strokeStyle = '#f9a8d4'
    ctx.lineWidth = 2.5
    ctx.setLineDash([2, 10])
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#d1659f'
    ctx.font = '30px "Segoe Script", "Bradley Hand", "Comic Sans MS", cursive'
    ctx.fillText('so cute, save it!', W / 2 - 16, pillY + pillH / 2 + 1)

    // emoji hati digambar terpisah agar tampil warna
    ctx.font = '30px "Segoe UI Emoji", "Apple Color Emoji", sans-serif'
    ctx.fillText('💕', W / 2 + 152, pillY + pillH / 2 + 2)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const CutePastelTemplateConfig = {
  id: 10,
  nama: 'Cute Pastel',
  deskripsi: 'Pastel pink dengan hati & kelip, 4 foto kotak imut siap posting Instagram',
  jumlahFoto: 4,
  style: 'cute',
  isDefault: false,
  generator: generateCutePastelTemplate
}
