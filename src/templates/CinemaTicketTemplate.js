// Ruang Momen Template - Cinema / Bioskop "Memory Ticket" (Instagramable)
// Tema tiket bioskop klasik tapi lebih premium & lentur:
// banner maroon membulat beraksen emas, foto membulat berbayang (tanpa border putih),
// sprocket film halus, garis perforasi "robekan" tiket, dan tipografi serif ber-tracking.
import { roundRectPath } from '../utils/imageHelper'

export const generateCinemaTicketTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = 800
    const H = 1840
    canvas.width = W
    canvas.height = H

    // ---------- Palet ----------
    const BG_CENTER = '#241d1f'
    const BG_EDGE = '#0d0a0b'
    const MAROON = '#8a1a28'
    const MAROON_DARK = '#5a0f18'
    const GOLD = '#d9b877'
    const IVORY = '#f3ece0'

    const setSpacing = (v) => {
      try {
        ctx.letterSpacing = v + 'px'
      } catch (e) {
        /* noop */
      }
    }
    const circle = (cx, cy, r) => {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()
    }
    const sparkle = (cx, cy, r, color) => {
      const inner = r * 0.3
      ctx.save()
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(cx, cy - r)
      ctx.lineTo(cx + inner, cy - inner)
      ctx.lineTo(cx + r, cy)
      ctx.lineTo(cx + inner, cy + inner)
      ctx.lineTo(cx, cy + r)
      ctx.lineTo(cx - inner, cy + inner)
      ctx.lineTo(cx - r, cy)
      ctx.lineTo(cx - inner, cy - inner)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // ============ BACKGROUND WARM-DARK (radial) ============
    const bgGrad = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.16, W / 2, H * 0.5, H * 0.72)
    bgGrad.addColorStop(0, BG_CENTER)
    bgGrad.addColorStop(1, BG_EDGE)
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, W, H)

    // ============ TEPI FILM: GARIS PANDUAN + SPROCKET HALUS ============
    ctx.save()
    ctx.strokeStyle = 'rgba(217,184,119,0.12)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 12])
    ctx.beginPath()
    ctx.moveTo(50, 18)
    ctx.lineTo(50, H - 18)
    ctx.moveTo(W - 50, 18)
    ctx.lineTo(W - 50, H - 18)
    ctx.stroke()
    ctx.restore()

    const holeW = 24
    const holeH = 15
    const holeR = 6
    const leftCX = 26
    const rightCX = W - 26
    ctx.fillStyle = 'rgba(243,236,224,0.72)'
    for (let y = 30; y <= H - 34; y += 44) {
      roundRectPath(ctx, leftCX - holeW / 2, y, holeW, holeH, holeR)
      ctx.fill()
      roundRectPath(ctx, rightCX - holeW / 2, y, holeW, holeH, holeR)
      ctx.fill()
    }

    // ============ BANNER ATAS: THEATER ONE (kartu membulat) ============
    const topBanner = { x: 60, y: 44, w: 680, h: 96, r: 18 }
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.45)'
    ctx.shadowBlur = 22
    ctx.shadowOffsetY = 10
    const tg = ctx.createLinearGradient(0, topBanner.y, 0, topBanner.y + topBanner.h)
    tg.addColorStop(0, MAROON)
    tg.addColorStop(1, MAROON_DARK)
    roundRectPath(ctx, topBanner.x, topBanner.y, topBanner.w, topBanner.h, topBanner.r)
    ctx.fillStyle = tg
    ctx.fill()
    ctx.restore()
    // hairline emas
    ctx.strokeStyle = 'rgba(217,184,119,0.7)'
    ctx.lineWidth = 1.5
    roundRectPath(ctx, topBanner.x + 4, topBanner.y + 4, topBanner.w - 8, topBanner.h - 8, topBanner.r - 4)
    ctx.stroke()
    // aksen berlian kecil di sisi teks
    sparkle(topBanner.x + 40, topBanner.y + topBanner.h / 2, 7, 'rgba(217,184,119,0.85)')
    sparkle(topBanner.x + topBanner.w - 40, topBanner.y + topBanner.h / 2, 7, 'rgba(217,184,119,0.85)')

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = IVORY
    ctx.font = 'bold 34px Georgia, "Times New Roman", serif'
    setSpacing(8)
    ctx.fillText('THEATER ONE', W / 2, topBanner.y + topBanner.h / 2 + 1)
    setSpacing(0)

    // ============ FOTO (potret, membulat, berbayang, TANPA border putih) ============
    const radius = 20
    const positions = [
      { x: 150, y: 168, width: 500, height: 600, radius },
      { x: 150, y: 792, width: 500, height: 600, radius }
    ]
    positions.forEach((pos) => {
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.55)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 16
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.fillStyle = '#241f1c'
      ctx.fill()
      ctx.restore()
    })

    // ============ STUB TIKET (panel halus) + PERFORASI ============
    const stub = { x: 60, y: 1420, w: 680, h: 320, r: 22 }
    ctx.fillStyle = 'rgba(255,255,255,0.035)'
    roundRectPath(ctx, stub.x, stub.y, stub.w, stub.h, stub.r)
    ctx.fill()

    // garis robekan putus-putus + notch (lubang) di kedua sisi
    ctx.save()
    ctx.strokeStyle = 'rgba(217,184,119,0.5)'
    ctx.lineWidth = 2
    ctx.setLineDash([9, 9])
    ctx.beginPath()
    ctx.moveTo(stub.x + 24, stub.y)
    ctx.lineTo(stub.x + stub.w - 24, stub.y)
    ctx.stroke()
    ctx.restore()
    ctx.fillStyle = BG_EDGE
    circle(stub.x, stub.y, 16)
    circle(stub.x + stub.w, stub.y, 16)

    // ============ BLOK INFO TIKET ============
    const inL = 150
    const inR = 650
    ctx.fillStyle = IVORY
    ctx.font = 'bold 26px Georgia, "Times New Roman", serif'
    ctx.textBaseline = 'middle'

    ctx.textAlign = 'left'
    ctx.fillText('Row : 06', inL, 1466)
    ctx.textAlign = 'right'
    ctx.fillText('Seat : 09', inR, 1466)

    // divider emas tipis
    ctx.strokeStyle = 'rgba(217,184,119,0.35)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(inL, 1498)
    ctx.lineTo(inR, 1498)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.fillText('arengka Park', inL, 1532)
    ctx.textAlign = 'right'
    ctx.fillText('13.00 PM', inR, 1532)

    ctx.beginPath()
    ctx.moveTo(inL, 1564)
    ctx.lineTo(inR, 1564)
    ctx.stroke()

    ctx.textAlign = 'center'
    ctx.font = 'bold 24px Georgia, "Times New Roman", serif'
    setSpacing(2)
    ctx.fillText('SUN, 09 AUGUST 2026', W / 2, 1600)
    setSpacing(0)

    // ============ BANNER BAWAH: MEMORY TICKET (kartu membulat) ============
    const botBanner = { x: 60, y: 1636, w: 680, h: 104, r: 18 }
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.45)'
    ctx.shadowBlur = 22
    ctx.shadowOffsetY = 10
    const bg2 = ctx.createLinearGradient(0, botBanner.y, 0, botBanner.y + botBanner.h)
    bg2.addColorStop(0, MAROON)
    bg2.addColorStop(1, MAROON_DARK)
    roundRectPath(ctx, botBanner.x, botBanner.y, botBanner.w, botBanner.h, botBanner.r)
    ctx.fillStyle = bg2
    ctx.fill()
    ctx.restore()
    ctx.strokeStyle = 'rgba(217,184,119,0.7)'
    ctx.lineWidth = 1.5
    roundRectPath(ctx, botBanner.x + 4, botBanner.y + 4, botBanner.w - 8, botBanner.h - 8, botBanner.r - 4)
    ctx.stroke()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = IVORY
    ctx.font = 'bold 44px Georgia, "Times New Roman", serif'
    setSpacing(6)
    ctx.fillText('MEMORY TICKET', W / 2, botBanner.y + botBanner.h / 2 + 1)
    setSpacing(0)

    // ============ FOOTER KECIL ============
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = 'rgba(217,184,119,0.7)'
    ctx.font = '13px Arial'
    setSpacing(4)
    ctx.fillText('★  R U A N G   M O M E N  ★', W / 2, 1792)
    setSpacing(0)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Konfigurasi template
export const CinemaTicketTemplateConfig = {
  id: 8,
  nama: 'Cinema Ticket',
  deskripsi: 'Tema tiket bioskop premium: banner maroon membulat, aksen emas, dan perforasi tiket',
  jumlahFoto: 2,
  style: 'cinema',
  isDefault: false,
  generator: generateCinemaTicketTemplate
}
