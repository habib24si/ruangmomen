// Ruang Momen Template - Elegant Ivory & Gold Design
import { roundRectPath } from '../utils/imageHelper'

export const generateHSATemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = 450
    const H = 1350
    canvas.width = W
    canvas.height = H

    // Palet elegan
    const INK = '#2f2a25'      // charcoal lembut
    const GOLD = '#b08d57'     // emas solid
    const GOLD_SOFT = '#c9ad7c'

    // ============ BACKGROUND IVORY ============
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#f8f4ec')
    bg.addColorStop(0.5, '#f3ece0')
    bg.addColorStop(1, '#efe6d6')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Cahaya lembut di bagian atas agar tidak datar (sangat halus)
    const glow = ctx.createRadialGradient(W / 2, 40, 0, W / 2, 40, 420)
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)

    // ============ KEYLINE BORDER (garis emas tipis) ============
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1.5
    ctx.strokeRect(16, 16, W - 32, H - 32)
    ctx.strokeStyle = GOLD_SOFT
    ctx.lineWidth = 1
    ctx.strokeRect(23, 23, W - 46, H - 46)

    // ============ HEADER ============
    ctx.textAlign = 'center'

    // "RUANG" berjarak, serif, charcoal
    ctx.fillStyle = INK
    ctx.font = 'bold 28px Georgia, "Times New Roman", serif'
    ctx.fillText('R U A N G', W / 2, 82)

    // "Momen" serif italic elegan
    ctx.fillStyle = INK
    ctx.font = 'italic 34px Georgia, "Times New Roman", serif'
    ctx.fillText('Momen', W / 2, 122)

    // Pembatas: dua garis tipis + berlian emas di tengah
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(120, 148)
    ctx.lineTo(W / 2 - 14, 148)
    ctx.moveTo(W / 2 + 14, 148)
    ctx.lineTo(W - 120, 148)
    ctx.stroke()

    ctx.save()
    ctx.translate(W / 2, 148)
    ctx.rotate(Math.PI / 4)
    ctx.fillStyle = GOLD
    ctx.fillRect(-4, -4, 8, 8)
    ctx.restore()

    // ============ FOTO POSISI (gaya Polaroid elegan) ============
    const radius = 8
    const positions = [
      { x: 65, y: 186, width: 320, height: 250, radius },
      { x: 65, y: 512, width: 320, height: 250, radius },
      { x: 65, y: 838, width: 320, height: 250, radius }
    ]

    const MAT = { left: 14, top: 14, bottom: 40 }
    const numerals = ['I', 'II', 'III']

    positions.forEach((pos, index) => {
      const mx = pos.x - MAT.left
      const my = pos.y - MAT.top
      const matW = pos.width + MAT.left * 2
      const matH = pos.height + MAT.top + MAT.bottom

      // Bayangan halus dan hangat
      ctx.save()
      ctx.shadowColor = 'rgba(120, 95, 55, 0.22)'
      ctx.shadowBlur = 18
      ctx.shadowOffsetY = 8
      ctx.fillStyle = '#ffffff'
      roundRectPath(ctx, mx, my, matW, matH, radius + 4)
      ctx.fill()
      ctx.restore()

      // Keyline emas tipis mengelilingi matte
      ctx.strokeStyle = GOLD_SOFT
      ctx.lineWidth = 1
      roundRectPath(ctx, mx + 4, my + 4, matW - 8, matH - 8, radius + 2)
      ctx.stroke()

      // Area placeholder foto (abu hangat lembut)
      const ph = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + pos.height)
      ph.addColorStop(0, '#eae1d2')
      ph.addColorStop(1, '#ddd0ba')
      ctx.fillStyle = ph
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.fill()

      // Garis tepi dalam foto (emas tipis)
      ctx.strokeStyle = 'rgba(176, 141, 87, 0.5)'
      ctx.lineWidth = 1
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.stroke()

      // Nomor romawi kecil di area bawah matte
      ctx.fillStyle = GOLD
      ctx.font = 'italic 16px Georgia, "Times New Roman", serif'
      ctx.textAlign = 'center'
      ctx.fillText(numerals[index], pos.x + pos.width / 2, my + matH - 15)
    })

    // ============ FOOTER ============
    ctx.textAlign = 'center'

    // Pembatas emas pendek
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 40, 1165)
    ctx.lineTo(W / 2 + 40, 1165)
    ctx.stroke()

    ctx.fillStyle = INK
    ctx.font = 'italic 20px Georgia, "Times New Roman", serif'
    ctx.fillText('Capture Your Moments', W / 2, 1198)

    // Tanggal dengan sisipan garis (tanpa pil norak)
    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    ctx.fillStyle = '#8a7a63'
    ctx.font = '15px Georgia, "Times New Roman", serif'
    ctx.fillText('— ' + dateStr + ' —', W / 2, 1226)

    // Brand kecil berjarak di paling bawah
    ctx.fillStyle = GOLD
    ctx.font = 'bold 12px Georgia, "Times New Roman", serif'
    ctx.fillText('H S A   ·   P H O T O B O O T H', W / 2, 1305)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Konfigurasi template
export const HSATemplateConfig = {
  id: 1,
  nama: 'Ruang Momen',
  deskripsi: 'Template elegan bernuansa ivory dengan aksen emas dan frame polaroid',
  jumlahFoto: 3,
  style: 'hsa',
  isDefault: true,
  generator: generateHSATemplate
}
