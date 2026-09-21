// Ruang Momen Template - Modern Gradient (versi "kucu" & sosial media)
// Konsep lama dipertahankan: dasar putih polos TANPA frame berwarna di tepi,
// frame foto gradient violet->pink, tulisan RUANG MOMEN vertikal di margin kiri.
// Perubahan: kanvas 1080x1920 (rasio 9:16 — pas untuk IG Story / WA Status / TikTok),
// sudut lebih membulat, hati & kelip pastel mungil supaya terasa cute.
import { roundRectPath } from '../utils/imageHelper'

export const generateModernTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const W = (canvas.width = 1080)
    const H = (canvas.height = 1920)

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

    // helper hati kecil (untuk divider & badge frame)
    const heart = (cx, cy, size, fill) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(size / 100, size / 100)
      ctx.beginPath()
      ctx.moveTo(0, 30)
      ctx.bezierCurveTo(-60, -20, -30, -70, 0, -35)
      ctx.bezierCurveTo(30, -70, 60, -20, 0, 30)
      ctx.closePath()
      ctx.fillStyle = fill
      ctx.fill()
      ctx.restore()
    }

    // helper kelip 4 ujung
    const sparkle = (x, y, r, color) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = color
      ctx.beginPath()
      const inner = r * 0.3
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 === 0 ? r : inner
        const a = (Math.PI / 4) * i - Math.PI / 2
        const px = Math.cos(a) * rad
        const py = Math.sin(a) * rad
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'

    // ===== Pill brand =====
    const pillW = 330
    const pillH = 46
    const pillX = W / 2 - pillW / 2
    const pillY = 92
    roundRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2)
    ctx.fillStyle = 'rgba(168,85,247,0.10)'
    ctx.fill()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'rgba(236,72,153,0.45)'
    ctx.setLineDash([2, 8])
    ctx.lineCap = 'round'
    roundRectPath(ctx, pillX + 5, pillY + 5, pillW - 10, pillH - 10, (pillH - 10) / 2)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = '#a855f7'
    ctx.font = 'bold 18px Arial'
    setSpacing('4px')
    ctx.fillText('R U A N G   M O M E N', W / 2, pillY + 31)
    setSpacing('0px')

    // ===== Title MEMORIES (gradient) =====
    ctx.fillStyle = accent(240, 840)
    ctx.font = 'bold 82px Arial'
    setSpacing('6px')
    ctx.fillText('MEMORIES', W / 2, 232)
    setSpacing('0px')

    // subtitle
    ctx.fillStyle = '#9aa3b2'
    ctx.font = 'italic 26px Georgia, serif'
    ctx.fillText('capture your golden moments', W / 2, 280)

    // divider + hati (pemanis "kucu")
    ctx.strokeStyle = accent(320, 760)
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(330, 322)
    ctx.lineTo(500, 322)
    ctx.moveTo(580, 322)
    ctx.lineTo(750, 322)
    ctx.stroke()
    heart(W / 2, 318, 42, accent(W / 2 - 21, W / 2 + 21))

    // kelip & hati mungil di sekitar header
    sparkle(150, 170, 16, 'rgba(236,72,153,0.5)')
    sparkle(930, 150, 12, 'rgba(168,85,247,0.5)')
    sparkle(945, 300, 9, 'rgba(236,72,153,0.45)')
    sparkle(120, 300, 8, 'rgba(168,85,247,0.4)')
    heart(205, 250, 22, 'rgba(249,168,212,0.9)')
    heart(875, 235, 20, 'rgba(196,181,253,0.9)')

    // helper: gambar "RUANG MOMEN" vertikal (dipakai utk template & overlay)
    const gambarTulisanVertikal = (c) => {
      c.save()
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.font = '900 132px "Arial Black", Arial, sans-serif'
      c.lineJoin = 'round'
      const huruf = 'RUANG MOMEN'.split('')
      const x = 100 // geser sedikit ke kanan, masih di luar frame foto
      const startY = 420
      const endY = 1780
      const step = (endY - startY) / (huruf.length - 1)

      // gradient ungu->pink membentang dari atas ke bawah seluruh kolom
      const colGrad = c.createLinearGradient(0, startY - 60, 0, endY + 60)
      colGrad.addColorStop(0, '#a855f7')
      colGrad.addColorStop(0.5, '#d946ef')
      colGrad.addColorStop(1, '#ec4899')

      huruf.forEach((ch, i) => {
        if (ch === ' ') return
        const y = startY + i * step

        // bayangan lembut di belakang huruf biar terasa "timbul"
        c.shadowColor = 'rgba(168, 85, 247, 0.35)'
        c.shadowBlur = 16
        c.shadowOffsetY = 5

        // outline putih tebal agar tetap terbaca saat menimpa foto
        c.lineWidth = 16
        c.strokeStyle = 'rgba(255,255,255,0.97)'
        c.strokeText(ch, x, y)

        c.shadowColor = 'transparent'
        c.shadowBlur = 0
        c.shadowOffsetY = 0
        c.fillStyle = colGrad
        c.fillText(ch, x, y)

        // kelip kecil di highlight (aksen manis)
        c.fillStyle = 'rgba(255,255,255,0.85)'
        c.beginPath()
        c.arc(x - 34, y - 40, 4, 0, Math.PI * 2)
        c.fill()
      })
      c.restore()
    }
    // baked ke template supaya tetap terlihat di katalog
    gambarTulisanVertikal(ctx)

    // ===== PHOTOS =====
    const positions = [
      { x: 190, y: 390, width: 760, height: 428, radius: 26 },
      { x: 190, y: 880, width: 760, height: 428, radius: 26 },
      { x: 190, y: 1370, width: 760, height: 428, radius: 26 }
    ]

    positions.forEach((pos, i) => {
      // gradient frame dengan shadow lembut
      ctx.save()
      ctx.shadowColor = 'rgba(124, 58, 237, 0.26)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 14
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
        pos.x - 15,
        pos.y - 15,
        pos.width + 30,
        pos.height + 30,
        40
      )
      ctx.fillStyle = fg
      ctx.fill()
      ctx.restore()

      // white mat
      roundRectPath(
        ctx,
        pos.x - 7,
        pos.y - 7,
        pos.width + 14,
        pos.height + 14,
        33
      )
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // placeholder (akan tertutup foto)
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, pos.radius)
      ctx.fillStyle = '#eef1f7'
      ctx.fill()

      // badge hati di sudut kanan-atas frame (selang-seling kiri/kanan)
      const bx = i % 2 === 0 ? pos.x + pos.width - 8 : pos.x + 8
      const by = pos.y - 8
      ctx.save()
      ctx.shadowColor = 'rgba(219, 39, 119, 0.35)'
      ctx.shadowBlur = 14
      ctx.shadowOffsetY = 4
      ctx.beginPath()
      ctx.arc(bx, by, 42, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.restore()
      ctx.beginPath()
      ctx.arc(bx, by, 42, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(236,72,153,0.5)'
      ctx.lineWidth = 2.5
      ctx.stroke()
      heart(bx, by + 3, 44, accent(bx - 22, bx + 22))
    })

    // ===== FOOTER =====
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    ctx.textAlign = 'center'
    ctx.fillStyle = '#a0aec0'
    ctx.font = '24px Arial'
    ctx.fillText(today, W / 2, H - 108)
    ctx.fillStyle = accent(380, 700)
    ctx.font = 'bold 22px Arial'
    ctx.fillText('· ruangmomen ·', W / 2, H - 66)
    heart(W / 2 - 200, H - 74, 22, 'rgba(249,168,212,0.9)')
    heart(W / 2 + 200, H - 74, 22, 'rgba(196,181,253,0.9)')

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
  deskripsi: 'Story 9:16 putih bersih, frame gradient violet-pink membulat dengan aksen hati lucu',
  jumlahFoto: 3,
  style: 'modern',
  isDefault: true,
  generator: generateModernTemplate
}
