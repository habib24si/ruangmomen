// Ruang Momen Template - Elegant Ivory & Gold (versi lebih hidup utk Instagram/Gen-Z)
// Tema asli dipertahankan: ivory hangat, aksen emas, 3 polaroid tegak lurus.
// Polesan: script Great Vibes + Playfair, kelip emas, hati mungil, grain lembut,
// dan overlay ✦ yang menimpa sudut foto supaya terasa "berkilau" di feed.
import { roundRectPath } from '../utils/imageHelper'

// ===== HELPER ORNAMEN =====
function gambarKelip(c, cx, cy, r, rot, color, alpha, glow) {
  c.save()
  c.translate(cx, cy)
  if (rot) c.rotate(rot)
  c.globalAlpha = alpha
  if (glow) {
    c.shadowColor = color
    c.shadowBlur = glow
  }
  c.fillStyle = color
  c.beginPath()
  c.moveTo(0, -r)
  c.quadraticCurveTo(0.18 * r, -0.18 * r, r, 0)
  c.quadraticCurveTo(0.18 * r, 0.18 * r, 0, r)
  c.quadraticCurveTo(-0.18 * r, 0.18 * r, -r, 0)
  c.quadraticCurveTo(-0.18 * r, -0.18 * r, 0, -r)
  c.closePath()
  c.fill()
  c.restore()
}

function gambarHati(c, cx, cy, s, color, alpha) {
  c.save()
  c.translate(cx, cy)
  c.scale(s / 10, s / 10)
  c.globalAlpha = alpha
  c.fillStyle = color
  c.beginPath()
  c.moveTo(0, 4)
  c.bezierCurveTo(-7, -2, -4, -8, 0, -4)
  c.bezierCurveTo(4, -8, 7, -2, 0, 4)
  c.closePath()
  c.fill()
  c.restore()
}

function setSpacing(ctx, val) {
  try { ctx.letterSpacing = val } catch (e) { /* unsupported */ }
}

export const generateHSATemplate = () => {
  const fontSiap = document.fonts && document.fonts.load ? Promise.allSettled([
    document.fonts.load('700 24px "Playfair Display"'),
    document.fonts.load('italic 500 16px "Playfair Display"'),
    document.fonts.load('44px "Great Vibes"'),
    document.fonts.load('30px "Great Vibes"')
  ]) : Promise.resolve()

  return fontSiap.then(() => new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = 450
    const H = 1350
    canvas.width = W
    canvas.height = H

    // Palet elegan (tetap)
    const INK = '#2f2a25'      // charcoal lembut
    const GOLD = '#b08d57'     // emas solid
    const GOLD_SOFT = '#c9ad7c'
    const GOLD_WARM = '#d4af6e'

    // ============ BACKGROUND IVORY ============
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#f8f4ec')
    bg.addColorStop(0.5, '#f3ece0')
    bg.addColorStop(1, '#efe6d6')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Cahaya lembut di atas
    const glow = ctx.createRadialGradient(W / 2, 40, 0, W / 2, 40, 420)
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)

    // Hangat lembut dari bawah agar tidak datar
    const glowBawah = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, 420)
    glowBawah.addColorStop(0, 'rgba(176, 141, 87, 0.10)')
    glowBawah.addColorStop(1, 'rgba(176, 141, 87, 0)')
    ctx.fillStyle = glowBawah
    ctx.fillRect(0, 0, W, H)

    // Grain hangat tipis — tekstur kertas mahal
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = 'rgba(176, 141, 87, 0.05)'
      ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1)
    }

    // ============ KEYLINE BORDER + SIKU KELIP ============
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1.5
    ctx.strokeRect(16, 16, W - 32, H - 32)
    ctx.strokeStyle = GOLD_SOFT
    ctx.lineWidth = 1
    ctx.strokeRect(23, 23, W - 46, H - 46)

    // ✦ kecil di keempat sudut bingkai
    const sudut = [[16, 16], [W - 16, 16], [16, H - 16], [W - 16, H - 16]]
    sudut.forEach(([sx, sy], i) => {
      gambarKelip(ctx, sx, sy, 7, 0, GOLD_WARM, 0.9, 8)
      gambarKelip(ctx, sx, sy, 3, Math.PI / 4, '#fff8ea', 0.9, 0)
      void i
    })

    // ============ HEADER ============
    ctx.textAlign = 'center'

    // "R U A N G" berjarak — Playfair, bukan Georgia kaku
    ctx.fillStyle = INK
    ctx.font = '700 24px "Playfair Display", Georgia, serif'
    setSpacing(ctx, '8px')
    ctx.fillText('RUANG', W / 2, 80)
    setSpacing(ctx, '0px')

    // "Momen" — script Great Vibes, emas berkilau
    const gradScript = ctx.createLinearGradient(W / 2 - 90, 96, W / 2 + 90, 136)
    gradScript.addColorStop(0, GOLD)
    gradScript.addColorStop(0.5, GOLD_WARM)
    gradScript.addColorStop(1, GOLD)
    ctx.fillStyle = gradScript
    ctx.font = '44px "Great Vibes", cursive'
    ctx.shadowColor = 'rgba(212, 175, 110, 0.45)'
    ctx.shadowBlur = 12
    ctx.fillText('Momen', W / 2, 128)
    ctx.shadowBlur = 0

    // hati mungil mengapit script
    gambarHati(ctx, W / 2 - 96, 118, 9, GOLD_SOFT, 0.85)
    gambarHati(ctx, W / 2 + 96, 118, 9, GOLD_SOFT, 0.85)

    // Pembatas: garis + kelip emas berpendar di tengah
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(120, 150)
    ctx.lineTo(W / 2 - 16, 150)
    ctx.moveTo(W / 2 + 16, 150)
    ctx.lineTo(W - 120, 150)
    ctx.stroke()
    gambarKelip(ctx, W / 2, 150, 7, 0, GOLD_WARM, 1, 10)

    // ============ FOTO POSISI (polaroid elegan, tetap lurus) ============
    const radius = 10
    const positions = [
      { x: 65, y: 186, width: 320, height: 250, radius },
      { x: 65, y: 512, width: 320, height: 250, radius },
      { x: 65, y: 838, width: 320, height: 250, radius }
    ]

    const MAT = { left: 14, top: 14, bottom: 40 }
    const nomor = ['01', '02', '03']

    positions.forEach((pos, index) => {
      const mx = pos.x - MAT.left
      const my = pos.y - MAT.top
      const matW = pos.width + MAT.left * 2
      const matH = pos.height + MAT.top + MAT.bottom

      // Bayangan halus dan hangat
      ctx.save()
      ctx.shadowColor = 'rgba(120, 95, 55, 0.24)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetY = 9
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

      // Caption di bawah foto: hati emas + nomor mungil
      gambarHati(ctx, pos.x + pos.width / 2, my + matH - 28, 8, GOLD, 0.9)
      ctx.fillStyle = GOLD
      ctx.font = 'italic 500 13px "Playfair Display", Georgia, serif'
      ctx.textAlign = 'center'
      ctx.fillText(nomor[index], pos.x + pos.width / 2, my + matH - 12)
    })

    // Ornamen margin: kelip & hati selang-seling di kolom kiri-kanan
    const titikMargin = [330, 640, 950]
    titikMargin.forEach((y, i) => {
      if (i % 2 === 0) {
        gambarKelip(ctx, 36, y, 5, 0.2, GOLD_SOFT, 0.75, 6)
        gambarHati(ctx, W - 36, y, 7, GOLD_SOFT, 0.7)
      } else {
        gambarHati(ctx, 36, y, 7, GOLD_SOFT, 0.7)
        gambarKelip(ctx, W - 36, y, 5, -0.2, GOLD_SOFT, 0.75, 6)
      }
    })

    // ============ FOOTER ============
    ctx.textAlign = 'center'

    // Pembatas emas pendek + kelip
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 42, 1160)
    ctx.lineTo(W / 2 + 42, 1160)
    ctx.stroke()
    gambarKelip(ctx, W / 2, 1160, 5, 0, GOLD_WARM, 0.95, 8)

    // "capture your moments" script
    ctx.fillStyle = INK
    ctx.font = '30px "Great Vibes", cursive'
    ctx.fillText('capture your moments', W / 2, 1198)

    // Tanggal Playfair italic berjarak
    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    ctx.fillStyle = '#8a7a63'
    ctx.font = 'italic 500 13px "Playfair Display", Georgia, serif'
    setSpacing(ctx, '1px')
    ctx.fillText('—  ' + dateStr + '  —', W / 2, 1226)
    setSpacing(ctx, '0px')

    // Handle sosial — bikin orang pengen ngetag
    ctx.fillStyle = GOLD
    ctx.font = '700 12px "Playfair Display", Georgia, serif'
    setSpacing(ctx, '3px')
    ctx.fillText('@RUANGMOMEN', W / 2, 1266)
    setSpacing(ctx, '0px')
    gambarHati(ctx, W / 2 - 64, 1262, 7, GOLD_SOFT, 0.8)
    gambarHati(ctx, W / 2 + 64, 1262, 7, GOLD_SOFT, 0.8)

    // Brand kecil berjarak + kelip mengapit
    ctx.fillStyle = INK
    ctx.font = '700 11px "Playfair Display", Georgia, serif'
    setSpacing(ctx, '5px')
    ctx.fillText('R U A N G   M O M E N', W / 2, 1310)
    setSpacing(ctx, '0px')
    gambarKelip(ctx, W / 2 - 108, 1306, 4, 0, GOLD_SOFT, 0.8, 5)
    gambarKelip(ctx, W / 2 + 108, 1306, 4, 0, GOLD_SOFT, 0.8, 5)

    // ============ OVERLAY: KELIP MENIMPA DEPAN FOTO ============
    const overlayCanvas = document.createElement('canvas')
    overlayCanvas.width = W
    overlayCanvas.height = H
    const oc = overlayCanvas.getContext('2d')

    const decosDepan = [
      // sudut tiap foto — kesan glitter emas
      { x: pos0(0, 'right'), y: pos0(0, 'top') + 16, r: 8, a: 0.95 },
      { x: pos0(0, 'left') + 16, y: pos0(0, 'bottom') - 16, r: 6, a: 0.9 },
      { x: pos0(1, 'left') + 18, y: pos0(1, 'top') + 14, r: 7, a: 0.92 },
      { x: pos0(1, 'right') - 14, y: pos0(1, 'bottom') - 20, r: 9, a: 0.95 },
      { x: pos0(2, 'right') - 16, y: pos0(2, 'top') + 18, r: 8, a: 0.95 },
      { x: pos0(2, 'left') + 14, y: pos0(2, 'bottom') - 14, r: 6, a: 0.88 },
      // kelip mungil semi-transparan di tengah foto — sparkle "kumur"
      { x: 224, y: 320, r: 4, a: 0.5 },
      { x: 214, y: 646, r: 4, a: 0.5 },
      { x: 236, y: 972, r: 4, a: 0.5 }
    ]

    function pos0(i, side) {
      const p = positions[i]
      if (side === 'left') return p.x
      if (side === 'right') return p.x + p.width
      if (side === 'top') return p.y
      return p.y + p.height
    }
    void decosDepan

    decosDepan.forEach((d) => {
      gambarKelip(oc, d.x, d.y, d.r, 0.25, GOLD_WARM, d.a, 10)
      gambarKelip(oc, d.x, d.y, d.r * 0.4, Math.PI / 4, '#fffaf0', d.a, 0)
    })
    // hati emas kecil menimpa pojok foto bawah
    gambarHati(oc, positions[2].x + positions[2].width - 22, positions[2].y + 20, 8, 'rgba(212,175,110,0.9)', 0.9)

    const overlayUrl = overlayCanvas.toDataURL('image/png')

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions, overlay: overlayUrl })
  }))
}

// Konfigurasi template
export const HSATemplateConfig = {
  id: 1,
  nama: 'Ruang Momen',
  deskripsi: 'Ivory & gold yang tetap elegan tapi lebih hidup — script emas, kelip menimpa foto, siap masuk feed',
  jumlahFoto: 3,
  style: 'hsa',
  isDefault: true,
  generator: generateHSATemplate
}
