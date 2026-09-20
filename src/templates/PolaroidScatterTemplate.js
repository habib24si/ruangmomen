// Polaroid Scatter Template
// 4 foto polaroid miring (scattered) di atas dinding terang, ala instagramable.
// Rotasi tiap foto didukung lewat field `rotation` pada positions.
import { roundRectPath } from '../utils/imageHelper'

export const generatePolaroidScatterTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 1000)
    const H = (canvas.height = 1250)

    // ---------- LATAR TERANG (halus) ----------
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#efece7')
    bg.addColorStop(1, '#e2ded8')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    const vig = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W * 0.9)
    vig.addColorStop(0, 'rgba(255,255,255,0.35)')
    vig.addColorStop(1, 'rgba(120,110,98,0.16)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

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

    const cards = [
      { cx: 275, cy: 360, a: -6 },
      { cx: 725, cy: 360, a: 5 },
      { cx: 275, cy: 890, a: 4 },
      { cx: 725, cy: 890, a: -5 }
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

      // caption ala tulisan tangan di border bawah
      ctx.fillStyle = 'rgba(110,100,90,0.8)'
      ctx.font = 'italic 26px "Segoe Script", "Bradley Hand", "Comic Sans MS", cursive'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(caption, 0, 176)

      ctx.restore()
    })

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const PolaroidScatterTemplateConfig = {
  id: 9,
  nama: 'Polaroid Scatter',
  deskripsi: 'Empat foto polaroid miring di dinding terang, gaya santai & instagramable',
  jumlahFoto: 4,
  style: 'polaroid',
  isDefault: false,
  generator: generatePolaroidScatterTemplate
}
