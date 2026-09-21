// Gallery Clip Template
// TEMA: cetakan foto instan yang keluar dari mesin photobooth —
// bukan digantung di rel. Kertas print menjulur dari celah mesin,
// lengkap dengan LED hijau, sekrup, dan caption tulisan tangan.
import { roundRectPath } from '../utils/imageHelper'

// ===== HELPER ORNAMEN =====
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

export const generateGalleryClipTemplate = () => {
  const fontSiap = document.fonts && document.fonts.load ? Promise.allSettled([
    document.fonts.load('34px "Great Vibes"'),
    document.fonts.load('700 22px "Playfair Display"'),
    document.fonts.load('600 11px "Playfair Display"'),
    document.fonts.load('italic 500 16px "Playfair Display"')
  ]) : Promise.resolve()

  return fontSiap.then(() => new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 800)
    const H = (canvas.height = 780)

    const setSpacing = (v) => {
      try {
        ctx.letterSpacing = v
      } catch (e) {
        /* noop */
      }
    }

    // ---------- DINDING (gradien taupe hangat) ----------
    const wall = ctx.createLinearGradient(0, 0, W, H)
    wall.addColorStop(0, '#d7d2cb')
    wall.addColorStop(0.5, '#c7c1b9')
    wall.addColorStop(1, '#b0aaa2')
    ctx.fillStyle = wall
    ctx.fillRect(0, 0, W, H)

    // ---------- TEKSTUR HALUS (bintik acak) ----------
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * W
      const y = Math.random() * H
      const a = Math.random() * 0.05
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`
      ctx.fillRect(x, y, 1.4, 1.4)
    }

    // ---------- VIGNETTE (tepi sedikit gelap) ----------
    const vig = ctx.createRadialGradient(W / 2, H * 0.42, 120, W / 2, H * 0.5, W * 0.85)
    vig.addColorStop(0, 'rgba(0,0,0,0)')
    vig.addColorStop(1, 'rgba(40,34,28,0.22)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

    // ---------- SOROT LAMPU dari atas ----------
    const spot = ctx.createRadialGradient(W / 2, 40, 20, W / 2, 260, 480)
    spot.addColorStop(0, 'rgba(255,250,238,0.35)')
    spot.addColorStop(1, 'rgba(255,250,238,0)')
    ctx.fillStyle = spot
    ctx.fillRect(0, 0, W, H)

    // ============ MESIN PHOTBOOTH ============
    const MX = 120, MY = 48, MW = 560, MH = 176

    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.4)'
    ctx.shadowBlur = 26
    ctx.shadowOffsetY = 12
    const body = ctx.createLinearGradient(0, MY, 0, MY + MH)
    body.addColorStop(0, '#31353d')
    body.addColorStop(1, '#15171b')
    ctx.fillStyle = body
    roundRectPath(ctx, MX, MY, MW, MH, 26)
    ctx.fill()
    ctx.restore()

    // garis tepi dalam (kilau atas bodi)
    ctx.strokeStyle = 'rgba(255,255,255,0.09)'
    ctx.lineWidth = 1.5
    roundRectPath(ctx, MX + 4, MY + 4, MW - 8, MH - 8, 22)
    ctx.stroke()

    // sekrup di empat sudut
    const baut = [
      [MX + 24, MY + 24], [MX + MW - 24, MY + 24],
      [MX + 24, MY + MH - 24], [MX + MW - 24, MY + MH - 24]
    ]
    baut.forEach(([bx, by]) => {
      ctx.fillStyle = '#4a4f57'
      ctx.beginPath()
      ctx.arc(bx, by, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.45)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(bx - 3, by - 2)
      ctx.lineTo(bx + 3, by + 2)
      ctx.stroke()
    })

    // brand di bodi mesin
    ctx.textAlign = 'center'
    ctx.fillStyle = '#e8e3d9'
    ctx.font = '700 22px "Playfair Display", Georgia, serif'
    setSpacing('4px')
    ctx.fillText('RUANG MOMEN', W / 2, MY + 74)
    setSpacing('0px')

    ctx.fillStyle = '#8d94a0'
    ctx.font = '600 11px "Playfair Display", Georgia, serif'
    setSpacing('6px')
    ctx.fillText('P H O T O   B O O T H', W / 2, MY + 100)
    setSpacing('0px')

    // LED hijau menyala
    ctx.save()
    ctx.shadowColor = '#4ade80'
    ctx.shadowBlur = 12
    ctx.fillStyle = '#22c55e'
    ctx.beginPath()
    ctx.arc(W / 2 + 186, MY + 66, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // equalizer kecil kiri-kanan LED
    ctx.fillStyle = '#8d94a0'
    const barKiri = [10, 16, 7]
    barKiri.forEach((bh, i) => {
      ctx.fillRect(W / 2 - 196 + i * 8, MY + 72 - bh, 4, bh)
    })
    const barKanan = [7, 15, 10]
    barKanan.forEach((bh, i) => {
      ctx.fillRect(W / 2 + 150 + i * 8, MY + 72 - bh, 4, bh)
    })

    // ============ SLOT CETAKAN ============
    const SX = 230, SY = MY + MH - 26, SW = 340

    // lubang celah (bagian belakang, gelap)
    ctx.fillStyle = '#0b0d10'
    roundRectPath(ctx, SX, SY, SW, 14, 7)
    ctx.fill()

    // ============ KERTAS CETAKAN (print-an) ============
    const CARD_X = 230, CARD_Y = SY + 2, CARD_W = 340
    const positions = [{ x: 254, y: 252, width: 292, height: 292, radius: 2 }]
    const CARD_H = 252 - CARD_Y + 292 + 68

    // bayangan kertas
    ctx.save()
    ctx.shadowColor = 'rgba(30,25,20,0.35)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 6
    ctx.fillStyle = '#fdfdfb'
    roundRectPath(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 4)
    ctx.fill()
    ctx.restore()

    // tekukan kertas dekat celah (kilau melintang)
    const bend = ctx.createLinearGradient(0, CARD_Y, 0, CARD_Y + 22)
    bend.addColorStop(0, 'rgba(255,255,255,0.9)')
    bend.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = bend
    roundRectPath(ctx, CARD_X, CARD_Y, CARD_W, 22, 4)
    ctx.fill()

    // area foto (placeholder abu hangat)
    const ph = ctx.createLinearGradient(0, 252, 0, 544)
    ph.addColorStop(0, '#ded8d0')
    ph.addColorStop(1, '#cfc8be')
    ctx.fillStyle = ph
    roundRectPath(ctx, positions[0].x, positions[0].y, positions[0].width, positions[0].height, positions[0].radius)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'
    ctx.lineWidth = 1
    roundRectPath(ctx, positions[0].x, positions[0].y, positions[0].width, positions[0].height, positions[0].radius)
    ctx.stroke()

    // bibir slot digambar DI ATAS kertas → kesan kertas menjulur keluar
    ctx.fillStyle = '#101216'
    roundRectPath(ctx, SX - 6, SY - 2, SW + 12, 12, 6)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(SX - 2, SY)
    ctx.lineTo(SX + SW + 2, SY)
    ctx.stroke()

    // ============ CAPTION TULIS TANGAN ============
    ctx.textAlign = 'center'
    ctx.fillStyle = '#3f3a33'
    ctx.font = '34px "Great Vibes", cursive'
    ctx.fillText('sweet memories', W / 2, 584)

    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    ctx.fillStyle = '#9a938a'
    ctx.font = '600 11px "Playfair Display", Georgia, serif'
    setSpacing('3px')
    ctx.fillText(dateStr.toUpperCase(), W / 2, 606)
    setSpacing('0px')

    // ============ KONFETI HATI & KELIP DI SEKITAR CETAKAN ============
    gambarHati(ctx, 178, 300, 12, 'rgba(196,120,92,0.5)', 0.9)
    gambarKelip(ctx, 158, 420, 7, 0.2, 'rgba(176,141,87,0.75)', 0.85, 8)
    gambarHati(ctx, 196, 540, 8, 'rgba(196,120,92,0.42)', 0.8)
    gambarKelip(ctx, 644, 252, 6, -0.2, 'rgba(176,141,87,0.75)', 0.85, 8)
    gambarHati(ctx, 624, 340, 10, 'rgba(196,120,92,0.5)', 0.9)
    gambarKelip(ctx, 640, 520, 5, 0.1, 'rgba(176,141,87,0.7)', 0.8, 6)

    // ============ BARIS TAGLINE BAWAH ============
    ctx.strokeStyle = 'rgba(40,34,28,0.22)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(215, 676)
    ctx.lineTo(280, 676)
    ctx.moveTo(520, 676)
    ctx.lineTo(585, 676)
    ctx.stroke()

    ctx.fillStyle = '#5c554b'
    ctx.font = 'italic 500 16px "Playfair Display", Georgia, serif'
    ctx.fillText('print once · keep forever', W / 2, 682)
    gambarKelip(ctx, 300, 676, 5, 0, 'rgba(176,141,87,0.85)', 0.9, 6)
    gambarKelip(ctx, 500, 676, 5, 0, 'rgba(176,141,87,0.85)', 0.9, 6)

    // ============ FOOTER BRAND ============
    ctx.fillStyle = '#6b6459'
    ctx.font = '700 12px "Playfair Display", Georgia, serif'
    setSpacing('6px')
    ctx.fillText('R U A N G   M O M E N', W / 2, H - 34)
    setSpacing('0px')
    gambarHati(ctx, W / 2 - 98, H - 38, 6, 'rgba(196,120,92,0.55)', 0.85)
    gambarHati(ctx, W / 2 + 98, H - 38, 6, 'rgba(196,120,92,0.55)', 0.85)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  }))
}

export const GalleryClipTemplateConfig = {
  id: 8,
  nama: 'Gallery Clip',
  deskripsi: 'Cetakan instan keluar dari mesin photobooth — print once, keep forever',
  jumlahFoto: 1,
  style: 'gallery',
  isDefault: true,
  generator: generateGalleryClipTemplate
}
