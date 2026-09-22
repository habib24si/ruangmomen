// Polaroid Scatter Template
// Dinding hangat grid halus + judul tulisan tangan "memories" + 4 polaroid
// miring dengan washi tape warna pastel di tiap sudut + doodle hati/bintang/
// paperclip/noda kopi di sela-sela + caption tanggal ala tulisan tangan.
import { roundRectPath } from '../utils/imageHelper'

// ---------- HELPER DEKO ----------
const gambarHati = (ctx, cx, cy, size, color) => {
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

const gambarBintang = (ctx, cx, cy, size, color) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? size : size * 0.42
    const a = (Math.PI / 5) * i - Math.PI / 2
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

const gambarPaperclip = (ctx, cx, cy, scale, rotasi, color) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotasi)
  ctx.scale(scale, scale)
  ctx.strokeStyle = color
  ctx.lineWidth = 2.6
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(-6, -30)
  ctx.lineTo(-6, 30)
  ctx.arc(0, 30, 6, Math.PI, 0, true)
  ctx.lineTo(6, -22)
  ctx.arc(0, -22, 6, 0, Math.PI, true)
  ctx.lineTo(-3, 22)
  ctx.stroke()
  ctx.restore()
}

const gambarNodaKopi = (ctx, cx, cy, r, color) => {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.stroke()
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.78, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

export const generatePolaroidScatterTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 1000)
    const H = (canvas.height = 1250)

    // ---------- LATAR TERANG BERTEKSTUR ----------
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#efece7')
    bg.addColorStop(1, '#e2ded8')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Grid halus ala kertas kalkir
    ctx.strokeStyle = 'rgba(120,100,80,0.09)'
    ctx.lineWidth = 1
    for (let x = 30; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
    }
    for (let y = 30; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    }

    // Vignette lembut
    const vig = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W * 0.9)
    vig.addColorStop(0, 'rgba(255,255,255,0.35)')
    vig.addColorStop(1, 'rgba(120,110,98,0.18)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

    // ---------- JUDUL TULISAN TANGAN ----------
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#5c4a3a'
    ctx.font = 'italic 700 66px "Segoe Script", "Bradley Hand", "Comic Sans MS", cursive'
    ctx.fillText('memories', W / 2, 92)

    // Flourish lengkung di bawah judul + titik ujung
    ctx.strokeStyle = '#a67c52'
    ctx.lineWidth = 2.6
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(W / 2 - 130, 130)
    ctx.bezierCurveTo(W / 2 - 40, 148, W / 2 + 40, 118, W / 2 + 130, 140)
    ctx.stroke()
    ctx.fillStyle = '#a67c52'
    ctx.beginPath(); ctx.arc(W / 2 + 132, 140, 3, 0, Math.PI * 2); ctx.fill()

    // ---------- DEKO DI SELA KARTU (di bawah polaroid) ----------
    // Cluster tengah
    gambarHati(ctx, W / 2, 625, 22, '#c97b6f')
    gambarBintang(ctx, W / 2 - 80, 590, 13, '#a67c52')
    gambarBintang(ctx, W / 2 + 80, 660, 11, '#a67c52')
    // Samping tengah
    gambarHati(ctx, 60, 620, 14, '#c97b6f')
    gambarHati(ctx, W - 60, 630, 14, '#c97b6f')
    // Bintang sudut
    gambarBintang(ctx, 70, 220, 15, '#a67c52')
    gambarBintang(ctx, W - 70, 240, 13, '#a67c52')
    gambarBintang(ctx, 55, 1080, 12, '#a67c52')
    gambarBintang(ctx, W - 55, 1060, 14, '#a67c52')
    // Paperclip dekoratif
    gambarPaperclip(ctx, 500, 400, 1.2, -Math.PI / 6, '#8a7460')
    gambarPaperclip(ctx, 160, 640, 0.9, Math.PI / 5, '#8a7460')
    // Noda kopi dekoratif
    gambarNodaKopi(ctx, 100, 1180, 42, 'rgba(140,100,60,0.22)')
    gambarNodaKopi(ctx, W - 110, 160, 34, 'rgba(140,100,60,0.18)')

    // ---------- GEOMETRI POLAROID ----------
    const PHOTO = 328
    const half = PHOTO / 2
    const off = 30 // jarak pusat foto ke pusat kartu (border bawah lebih tebal)
    const cardW = 380
    const cardH = 440

    const caption = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

    // Warna washi tape pastel tiap kartu (berganti)
    const cards = [
      { cx: 275, cy: 360, a: -6, tape: 'rgba(226, 168, 176, 0.78)' },
      { cx: 725, cy: 360, a: 5,  tape: 'rgba(176, 202, 226, 0.78)' },
      { cx: 275, cy: 890, a: 4,  tape: 'rgba(226, 210, 168, 0.78)' },
      { cx: 725, cy: 890, a: -5, tape: 'rgba(190, 226, 200, 0.78)' }
    ]

    // posisi foto (sudah diperhitungkan terhadap rotasi agar pas dengan bingkai)
    const positions = cards.map((c) => {
      const rad = (c.a * Math.PI) / 180
      const px = c.cx + off * Math.sin(rad)
      const py = c.cy - off * Math.cos(rad)
      return {
        x: px - half,
        y: py - half,
        width: PHOTO,
        height: PHOTO,
        radius: 2,
        rotation: c.a
      }
    })

    // ---------- GAMBAR TIAP POLAROID ----------
    cards.forEach((c) => {
      ctx.save()
      ctx.translate(c.cx, c.cy)
      ctx.rotate((c.a * Math.PI) / 180)

      // kartu putih + bayangan lembut
      ctx.shadowColor = 'rgba(60,50,40,0.3)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 16
      roundRectPath(ctx, -cardW / 2, -cardH / 2, cardW, cardH, 6)
      ctx.fillStyle = '#fbfaf8'
      ctx.fill()

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      // garis tepi kartu halus
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'
      ctx.lineWidth = 1
      roundRectPath(ctx, -cardW / 2, -cardH / 2, cardW, cardH, 6)
      ctx.stroke()

      // area foto (placeholder, akan tertutup foto)
      roundRectPath(ctx, -half, -off - half, PHOTO, PHOTO, 2)
      ctx.fillStyle = '#e6e2dc'
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'
      ctx.lineWidth = 1
      roundRectPath(ctx, -half, -off - half, PHOTO, PHOTO, 2)
      ctx.stroke()

      // Washi tape diagonal di sudut atas tiap kartu
      ctx.save()
      ctx.translate(-cardW / 2 + 55, -cardH / 2 + 12)
      ctx.rotate(-Math.PI / 9)
      ctx.fillStyle = c.tape
      ctx.fillRect(-70, -16, 140, 32)
      // serat kain halus pada tape
      ctx.fillStyle = 'rgba(255,255,255,0.42)'
      for (let j = -62; j < 70; j += 12) {
        ctx.fillRect(j, -16, 2, 32)
      }
      // garis tepi tape
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'
      ctx.lineWidth = 1
      ctx.strokeRect(-70, -16, 140, 32)
      ctx.restore()

      // caption ala tulisan tangan di border bawah
      ctx.fillStyle = 'rgba(110,100,90,0.85)'
      ctx.font = 'italic 26px "Segoe Script", "Bradley Hand", "Comic Sans MS", cursive'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(caption, 0, 176)

      ctx.restore()
    })

    // ---------- FOOTER BRAND ----------
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(92,74,58,0.78)'
    ctx.font = 'italic 22px "Segoe Script", "Bradley Hand", "Comic Sans MS", cursive'
    ctx.fillText('· ruang momen ·', W / 2, H - 42)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const PolaroidScatterTemplateConfig = {
  id: 9,
  nama: 'Polaroid Scatter',
  deskripsi: 'Polaroid scattered + washi tape pastel, doodle hati/bintang, dan judul "memories"',
  jumlahFoto: 4,
  style: 'polaroid',
  isDefault: false,
  generator: generatePolaroidScatterTemplate
}
