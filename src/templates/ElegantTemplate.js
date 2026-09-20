// Elegant Minimal Template (Instagramable)
// Tema tetap minimalis & elegan, tapi lebih premium: latar ivory hangat,
// bingkai emas tipis, tipografi serif ber-tracking, dan foto membulat berbayang.
import { roundRectPath } from '../utils/imageHelper'

export const generateElegantTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 1200)
    const H = (canvas.height = 900)

    // ---------- Palet ----------
    const INK = '#2f2a26'
    const GOLD = '#c9a86a'
    const MUTED = '#8a8177'

    const setSpacing = (v) => {
      try {
        ctx.letterSpacing = v + 'px'
      } catch (e) {
        /* noop */
      }
    }
    const diamond = (cx, cy, r, color) => {
      ctx.save()
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(cx, cy - r)
      ctx.lineTo(cx + r, cy)
      ctx.lineTo(cx, cy + r)
      ctx.lineTo(cx - r, cy)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    // bintang 5 sudut
    const star = (cx, cy, outerR, color) => {
      const innerR = outerR * 0.45
      ctx.save()
      ctx.fillStyle = color
      ctx.beginPath()
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outerR : innerR
        const a = -Math.PI / 2 + (i * Math.PI) / 5
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // ============ BACKGROUND IVORY (gradien lembut) ============
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#ffffff')
    bg.addColorStop(1, '#f6f2ec')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // ============ BINGKAI EMAS TIPIS (rounded) ============
    ctx.strokeStyle = 'rgba(201,168,106,0.5)'
    ctx.lineWidth = 1.5
    roundRectPath(ctx, 34, 34, W - 68, H - 68, 26)
    ctx.stroke()
    ctx.strokeStyle = 'rgba(47,42,38,0.08)'
    ctx.lineWidth = 1
    roundRectPath(ctx, 44, 44, W - 88, H - 88, 20)
    ctx.stroke()

    // ============ HEADER ============
    // ornamen garis + berlian kecil
    ctx.strokeStyle = 'rgba(201,168,106,0.85)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 130, 60)
    ctx.lineTo(W / 2 - 16, 60)
    ctx.moveTo(W / 2 + 16, 60)
    ctx.lineTo(W / 2 + 130, 60)
    ctx.stroke()
    diamond(W / 2, 60, 5, GOLD)

    // judul serif
    ctx.fillStyle = INK
    ctx.font = '400 46px Georgia, "Times New Roman", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    setSpacing(12)
    ctx.fillText('PHOTOBOOTH', W / 2, 106)
    setSpacing(0)

    // bintang di samping judul
    star(W / 2 - 250, 106, 12, GOLD)
    star(W / 2 + 250, 106, 12, GOLD)

    // subjudul brand
    ctx.fillStyle = 'rgba(201,168,106,0.95)'
    ctx.font = '16px Georgia, serif'
    setSpacing(6)
    ctx.fillText('R U A N G   M O M E N', W / 2, 138)
    setSpacing(0)

    // ============ FOTO ============
    const radius = 18
    const positions = [
      { x: 90, y: 168, width: 480, height: 570, radius },
      { x: 630, y: 168, width: 480, height: 570, radius }
    ]

    positions.forEach((pos) => {
      // kartu putih + shadow lembut
      ctx.save()
      ctx.shadowColor = 'rgba(60,45,30,0.14)'
      ctx.shadowBlur = 26
      ctx.shadowOffsetY = 14
      roundRectPath(ctx, pos.x - 8, pos.y - 8, pos.width + 16, pos.height + 16, radius + 8)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.restore()

      // keyline emas tipis di sekeliling foto
      ctx.strokeStyle = 'rgba(201,168,106,0.55)'
      ctx.lineWidth = 1.5
      roundRectPath(ctx, pos.x - 4, pos.y - 4, pos.width + 8, pos.height + 8, radius + 4)
      ctx.stroke()

      // placeholder (akan tertutup foto)
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.fillStyle = '#f3efe8'
      ctx.fill()
    })

    // nomor halus di bawah tiap foto
    ctx.fillStyle = 'rgba(47,42,38,0.45)'
    ctx.font = '14px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    setSpacing(3)
    ctx.fillText('01', positions[0].x + positions[0].width / 2, 762)
    ctx.fillText('02', positions[1].x + positions[1].width / 2, 762)
    setSpacing(0)

    // ============ FOOTER ============
    ctx.strokeStyle = 'rgba(201,168,106,0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 90, 806)
    ctx.lineTo(W / 2 + 90, 806)
    ctx.stroke()
    diamond(W / 2, 806, 4, 'rgba(201,168,106,0.8)')

    ctx.fillStyle = MUTED
    ctx.font = '15px Georgia, serif'
    setSpacing(2)
    ctx.fillText(
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      W / 2,
      840
    )
    setSpacing(0)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const ElegantTemplateConfig = {
  id: 5,
  nama: 'Elegant Minimal',
  deskripsi: 'Minimalis elegan: bingkai emas tipis, tipografi serif, dan foto membulat',
  jumlahFoto: 2,
  style: 'elegant',
  isDefault: true,
  generator: generateElegantTemplate
}
