// Ruang Momen Template - Modern Gradient (Instagramable)
import { roundRectPath } from '../utils/imageHelper'

export const generateModernTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const W = (canvas.width = 800)
    const H = (canvas.height = 1800)

    // ===== BACKGROUND: putih polos (tanpa border/frame berwarna) =====
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)

    // accent gradient helper (violet -> pink)
    const accent = (x0, x1) => {
      const g = ctx.createLinearGradient(x0, 0, x1, 0)
      g.addColorStop(0, '#a855f7')
      g.addColorStop(1, '#ec4899')
      return g
    }
    const setSpacing = (v) => {
      try {
        ctx.letterSpacing = v
      } catch (e) {
        /* tidak didukung browser */
      }
    }

    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'

    // ===== Pill brand =====
    const pillW = 250
    const pillH = 34
    const pillX = W / 2 - pillW / 2
    const pillY = 74
    roundRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2)
    ctx.fillStyle = 'rgba(168,85,247,0.12)'
    ctx.fill()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'rgba(236,72,153,0.45)'
    ctx.stroke()
    ctx.fillStyle = '#a855f7'
    ctx.font = 'bold 14px Arial'
    setSpacing('3px')
    ctx.fillText('R U A N G   M O M E N', W / 2, pillY + 23)
    setSpacing('0px')

    // ===== Title MEMORIES (gradient) =====
    ctx.fillStyle = accent(180, 620)
    ctx.font = 'bold 58px Arial'
    setSpacing('4px')
    ctx.fillText('MEMORIES', W / 2, 172)
    setSpacing('0px')

    // subtitle
    ctx.fillStyle = '#9aa3b2'
    ctx.font = 'italic 20px Georgia, serif'
    ctx.fillText('capture your golden moments', W / 2, 206)

    // divider + diamond
    ctx.strokeStyle = accent(250, 550)
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(250, 232)
    ctx.lineTo(380, 232)
    ctx.moveTo(420, 232)
    ctx.lineTo(550, 232)
    ctx.stroke()
    ctx.save()
    ctx.translate(W / 2, 232)
    ctx.rotate(Math.PI / 4)
    ctx.fillStyle = accent(W / 2 - 8, W / 2 + 8)
    ctx.fillRect(-6, -6, 12, 12)
    ctx.restore()

    // sparkles
    const sparkle = (x, y, r, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.quadraticCurveTo(0, 0, 0, r)
      ctx.quadraticCurveTo(0, 0, -r, 0)
      ctx.quadraticCurveTo(0, 0, 0, -r)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    sparkle(120, 132, 12, 'rgba(236,72,153,0.5)')
    sparkle(680, 120, 9, 'rgba(168,85,247,0.5)')
    sparkle(690, 250, 7, 'rgba(236,72,153,0.4)')

    // helper: gambar "RUANG MOMEN" vertikal (dipakai utk template & overlay)
    const gambarTulisanVertikal = (c) => {
      c.save()
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.font = 'bold 72px Arial'
      c.lineJoin = 'round'
      const huruf = 'RUANG MOMEN'.split('')
      const x = 60 // geser sedikit ke kanan
      const startY = 300
      const endY = 1670
      const step = (endY - startY) / (huruf.length - 1)
      huruf.forEach((ch, i) => {
        if (ch === ' ') return
        const y = startY + i * step
        c.lineWidth = 8
        c.strokeStyle = 'rgba(255,255,255,0.95)'
        c.strokeText(ch, x, y)
        c.fillStyle = '#c026d3'
        c.fillText(ch, x, y)
      })
      c.restore()
    }
    // baked ke template supaya tetap terlihat di katalog
    gambarTulisanVertikal(ctx)

    // ===== PHOTOS =====
    const positions = [
      { x: 96, y: 300, width: 608, height: 430, radius: 18 },
      { x: 96, y: 770, width: 608, height: 430, radius: 18 },
      { x: 96, y: 1240, width: 608, height: 430, radius: 18 }
    ]

    positions.forEach((pos) => {
      // gradient frame dengan shadow
      ctx.save()
      ctx.shadowColor = 'rgba(124, 58, 237, 0.28)'
      ctx.shadowBlur = 24
      ctx.shadowOffsetY = 12
      const fg = ctx.createLinearGradient(
        pos.x,
        pos.y,
        pos.x + pos.width,
        pos.y + pos.height
      )
      fg.addColorStop(0, '#a855f7')
      fg.addColorStop(1, '#ec4899')
      roundRectPath(
        ctx,
        pos.x - 12,
        pos.y - 12,
        pos.width + 24,
        pos.height + 24,
        26
      )
      ctx.fillStyle = fg
      ctx.fill()
      ctx.restore()

      // white mat
      roundRectPath(
        ctx,
        pos.x - 6,
        pos.y - 6,
        pos.width + 12,
        pos.height + 12,
        22
      )
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // placeholder (akan tertutup foto)
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, pos.radius)
      ctx.fillStyle = '#eef1f7'
      ctx.fill()
    })

    // ===== FOOTER =====
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    ctx.textAlign = 'center'
    ctx.fillStyle = '#a0aec0'
    ctx.font = '18px Arial'
    ctx.fillText(today, W / 2, H - 92)
    ctx.fillStyle = accent(300, 500)
    ctx.font = 'bold 16px Arial'
    ctx.fillText('· ruangmomen ·', W / 2, H - 62)

    // ===== OVERLAY: tulisan vertikal di DEPAN foto (dipisah dr template) =====
    const overlayCanvas = document.createElement('canvas')
    overlayCanvas.width = W
    overlayCanvas.height = H
    const octx = overlayCanvas.getContext('2d')
    gambarTulisanVertikal(octx)
    const overlayUrl = overlayCanvas.toDataURL('image/png')

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions, overlay: overlayUrl })
  })
}

export const ModernTemplateConfig = {
  id: 2,
  nama: 'Modern Gradient',
  deskripsi: 'Frame gradient violet-pink premium dengan sudut membulat',
  jumlahFoto: 3,
  style: 'modern',
  isDefault: true,
  generator: generateModernTemplate
}
