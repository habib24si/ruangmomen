// Ruang Momen Template - Elegant Film Strip (Instagramable)
import { roundRectPath } from '../utils/imageHelper'

export const generateFilmStripTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = 500
    const H = 1000
    canvas.width = W
    canvas.height = H

    // Palet
    const SAGE_TOP = '#b2b6a0'
    const SAGE_BOTTOM = '#9aa085'
    const CREAM = '#f1ece0'
    const FILM = '#17130f'

    // ============ BACKGROUND SAGE ============
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, SAGE_TOP)
    bg.addColorStop(1, SAGE_BOTTOM)
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Vignette lembut
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.75)
    vig.addColorStop(0, 'rgba(0,0,0,0)')
    vig.addColorStop(1, 'rgba(0,0,0,0.12)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

    // ============ FILM STRIP HITAM ============
    const strip = { x: 64, y: 40, w: 372, h: 920 }
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.28)'
    ctx.shadowBlur = 22
    ctx.shadowOffsetY = 8
    ctx.fillStyle = FILM
    roundRectPath(ctx, strip.x, strip.y, strip.w, strip.h, 14)
    ctx.fill()
    ctx.restore()

    // ============ SPROCKET HOLES ============
    const holeW = 16
    const holeH = 20
    const holeR = 5
    const leftCX = strip.x + 18
    const rightCX = strip.x + strip.w - 18
    ctx.fillStyle = CREAM
    for (let y = strip.y + 20; y <= strip.y + strip.h - 20; y += 34) {
      roundRectPath(ctx, leftCX - holeW / 2, y, holeW, holeH, holeR)
      ctx.fill()
      roundRectPath(ctx, rightCX - holeW / 2, y, holeW, holeH, holeR)
      ctx.fill()
    }

    // ============ FILM EDGE MARKINGS (detail autentik) ============
    ctx.fillStyle = 'rgba(241, 236, 224, 0.82)'
    ctx.textBaseline = 'alphabetic'
    ctx.font = 'bold 10px Arial'
    ctx.textAlign = 'left'
    ctx.fillText('RUANG MOMEN  ●  COLOR  ●  400', strip.x + 40, strip.y + 16)
    ctx.textAlign = 'right'
    ctx.fillText('24 EXP  ●  012345', strip.x + strip.w - 40, strip.y + 16)
    ctx.textAlign = 'left'
    ctx.fillText('KODAK-LIKE  ●  2', strip.x + 40, strip.y + strip.h - 8)
    ctx.textAlign = 'right'
    ctx.fillText('RUANG MOMEN  ●  5219', strip.x + strip.w - 40, strip.y + strip.h - 8)

    // ============ POSISI FOTO (KOTAK, ada gutter utk ornamen) ============
    const radius = 8
    const positions = [
      { x: 110, y: 110, width: 280, height: 240, radius },
      { x: 110, y: 380, width: 280, height: 240, radius },
      { x: 110, y: 650, width: 280, height: 240, radius }
    ]

    // Placeholder foto
    positions.forEach((pos) => {
      const ph = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + pos.height)
      ph.addColorStop(0, '#efe9dd')
      ph.addColorStop(1, '#ded6c6')
      ctx.fillStyle = ph
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.fill()

      ctx.strokeStyle = 'rgba(241, 236, 224, 0.35)'
      ctx.lineWidth = 1
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.stroke()
    })

    // ============ ORNAMEN: BRACKET SUDUT (di gutter hitam, terlihat) ============
    const drawCorners = (pos) => {
      const off = 8
      const len = 20
      const th = 3
      const x0 = pos.x - off
      const y0 = pos.y - off
      const x1 = pos.x + pos.width + off
      const y1 = pos.y + pos.height + off
      ctx.strokeStyle = CREAM
      ctx.lineWidth = th
      ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(x0, y0 + len); ctx.lineTo(x0, y0); ctx.lineTo(x0 + len, y0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x1 - len, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1, y0 + len); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x0, y1 - len); ctx.lineTo(x0, y1); ctx.lineTo(x0 + len, y1); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x1 - len, y1); ctx.lineTo(x1, y1); ctx.lineTo(x1, y1 - len); ctx.stroke()
    }
    positions.forEach(drawCorners)

    // Nomor frame di gutter kanan tiap foto
    ctx.fillStyle = CREAM
    ctx.font = 'bold 13px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    positions.forEach((pos, i) => {
      ctx.fillText(String(i + 1).padStart(2, '0'), 401, pos.y + pos.height / 2)
    })
    ctx.textBaseline = 'alphabetic'

    // ============ TEKS VERTIKAL KIRI ============
    const drawVertical = (text, cx, cy, font, color, alpha = 1) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = color
      ctx.font = font
      ctx.fillText(text, 0, 0)
      ctx.restore()
    }

    const drawSparkle = (cx, cy, r, rot, color, alpha) => {
      const inner = r * 0.28
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(rot)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -r)
      ctx.lineTo(inner, -inner)
      ctx.lineTo(r, 0)
      ctx.lineTo(inner, inner)
      ctx.lineTo(0, r)
      ctx.lineTo(-inner, inner)
      ctx.lineTo(-r, 0)
      ctx.lineTo(-inner, -inner)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const bandLX = 32
    const bandRX = W - 32
    drawVertical('R U A N G', bandLX, 92, 'bold 20px Georgia, serif', CREAM)
    drawVertical('M O M E N', bandLX, H / 2, '600 30px Georgia, serif', CREAM)

    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    drawVertical(dateStr, bandRX, H / 2, 'italic 16px Georgia, serif', CREAM, 0.9)

    // Aksen garis tipis di sekitar teks utama
    ctx.save()
    ctx.strokeStyle = 'rgba(241, 236, 224, 0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(bandLX, H / 2 - 210)
    ctx.lineTo(bandLX, H / 2 - 185)
    ctx.moveTo(bandLX, H / 2 + 185)
    ctx.lineTo(bandLX, H / 2 + 210)
    ctx.stroke()
    ctx.restore()

    // Sparkle dekoratif di kedua margin sage
    drawSparkle(bandLX, 150, 7, 0, CREAM, 0.85)
    drawSparkle(bandLX, H - 150, 7, 0.3, CREAM, 0.85)
    drawSparkle(bandRX, 150, 7, 0.2, CREAM, 0.85)
    drawSparkle(bandRX, H - 150, 7, 0, CREAM, 0.85)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Konfigurasi template
export const FilmStripTemplateConfig = {
  id: 6,
  nama: 'Film Strip',
  deskripsi: 'Template roll film elegan dengan bracket sudut, nomor frame, dan teks vertikal',
  jumlahFoto: 3,
  style: 'filmstrip',
  isDefault: false,
  generator: generateFilmStripTemplate
}
