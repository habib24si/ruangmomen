// Cinema Ticket Template - Movie Theater Style
// Tema SAME AS ORIGINAL: latar hitam, banner merah "THEATER ONE" & "MEMORY TICKET",
// border emas, 2 polaroid putih, perforasi, info tiket, barcode.
// Yang diperbaiki hanya EKSEKUSINYA agar tidak kaku: sudut membulat, bayangan lembut,
// gradasi halus pada banner, sedikit kemiringan polaroid, dan aksen emas mini.
import { roundRectPath } from '../utils/imageHelper'

// hati kecil (aksen emas, dipakai di beberapa titik)
const gambarHati = (ctx, cx, cy, size, warna) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(size / 100, size / 100)
  ctx.beginPath()
  ctx.moveTo(0, 30)
  ctx.bezierCurveTo(-60, -20, -30, -70, 0, -35)
  ctx.bezierCurveTo(30, -70, 60, -20, 0, 30)
  ctx.closePath()
  ctx.fillStyle = warna
  ctx.fill()
  ctx.restore()
}

// kelip 4 ujung
const gambarKelip = (ctx, cx, cy, r, warna) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  const inner = r * 0.32
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 === 0 ? r : inner
    const a = (Math.PI / 4) * i - Math.PI / 2
    const px = Math.cos(a) * rad
    const py = Math.sin(a) * rad
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fillStyle = warna
  ctx.fill()
  ctx.restore()
}

export const generateVintageTemplate = () => {
  // pastikan font web termuat dulu agar teks canvas tidak fallback ke font kaku
  const fontSiap =
    document.fonts && document.fonts.load
      ? Promise.allSettled([
          document.fonts.load('bold 40px "Playfair Display"'),
          document.fonts.load('600 20px "Playfair Display"'),
          document.fonts.load('34px "Great Vibes"')
        ])
      : Promise.resolve()

  return fontSiap.then(
    () =>
      new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 540)
    const H = (canvas.height = 1520)

    const GOLD = '#d4af37'
    const CREAM_TEXT = '#e8d7b5'

    // ===== Background hitam (dengan glow hangat VERY subtle di tengah) =====
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, W, H)
    const glow = ctx.createRadialGradient(W / 2, H * 0.45, 120, W / 2, H / 2, W * 1.1)
    glow.addColorStop(0, 'rgba(58, 22, 22, 0.55)')
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)

    // Checkered pattern di atas (seperti film) — tetap seperti asli
    const checkSize = 12
    ctx.fillStyle = '#1a1a1a'
    for (let y = 0; y < 80; y += checkSize) {
      for (let x = 0; x < W; x += checkSize) {
        if ((x / checkSize + y / checkSize) % 2 === 0) {
          ctx.fillRect(x, y, checkSize, checkSize)
        }
      }
    }

    // ===== Red banner "THEATER ONE" (gradasi halus, tidak flat) =====
    const bannerGrad = ctx.createLinearGradient(0, 80, 0, 150)
    bannerGrad.addColorStop(0, '#9c2020')
    bannerGrad.addColorStop(1, '#7a1212')
    ctx.fillStyle = bannerGrad
    ctx.fillRect(0, 80, W, 70)

    // Border emas pada banner (seperti asli) + hairline dalamnya
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2
    ctx.strokeRect(0, 80, W, 70)
    ctx.strokeStyle = 'rgba(212,175,55,0.35)'
    ctx.lineWidth = 1
    ctx.strokeRect(6, 86, W - 12, 58)

    // Text "THEATER ONE" — Playfair Display elegan, tidak sekaku Georgia
    ctx.fillStyle = CREAM_TEXT
    ctx.font = 'bold 40px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    ctx.letterSpacing = '5px'
    ctx.fillText('THEATER ONE', W / 2, 126)
    ctx.letterSpacing = '0px'

    // aksen emas mini di sisi teks (bikin tidak kosong, tetap klasik)
    gambarKelip(ctx, 52, 113, 8, 'rgba(212,175,55,0.8)')
    gambarKelip(ctx, W - 52, 113, 8, 'rgba(212,175,55,0.8)')
    gambarHati(ctx, 88, 115, 16, 'rgba(212,175,55,0.65)')
    gambarHati(ctx, W - 88, 115, 16, 'rgba(212,175,55,0.65)')

    // Dekorasi sudut kiri (seperti asli)
    ctx.fillStyle = GOLD
    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(40, 80)
    ctx.lineTo(20, 100)
    ctx.closePath()
    ctx.fill()

    // Dekorasi sudut kanan (seperti asli)
    ctx.beginPath()
    ctx.moveTo(W - 20, 80)
    ctx.lineTo(W - 40, 80)
    ctx.lineTo(W - 20, 100)
    ctx.closePath()
    ctx.fill()

    // ===== Posisi 2 foto dengan frame polaroid (lurus, margin ramping) =====
    const positions = [
      { x: 60, y: 180, width: 420, height: 520, radius: 8 },
      { x: 60, y: 740, width: 420, height: 520, radius: 8 }
    ]

    positions.forEach((pos, i) => {
      const cx = pos.x + pos.width / 2

      // polaroid: kartu putih membulat + bayangan lembut, margin diperkecil
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 18
      ctx.shadowOffsetY = 8
      roundRectPath(ctx, pos.x - 12, pos.y - 12, pos.width + 24, pos.height + 38, 12)
      ctx.fillStyle = '#fafafa'
      ctx.fill()
      ctx.restore()

      // tepi halus kartu
      roundRectPath(ctx, pos.x - 12, pos.y - 12, pos.width + 24, pos.height + 38, 12)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Photo area (abu-abu) dengan gradasi lembut + sudut membulat
      const ph = ctx.createLinearGradient(0, pos.y, 0, pos.y + pos.height)
      ph.addColorStop(0, '#2e2e2e')
      ph.addColorStop(1, '#232323')
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, 8)
      ctx.fillStyle = ph
      ctx.fill()

      // caption strip polaroid: hati emas mini di tengah
      gambarHati(ctx, cx, pos.y + pos.height + 14, 14, 'rgba(212,175,55,0.85)')

      // sudut: sedikit highlight di bawah polaroid ke-2 biar terasa "tertumpuk"
      if (i === 1) {
        ctx.save()
        ctx.globalAlpha = 0.06
        ctx.fillStyle = CREAM_TEXT
        roundRectPath(ctx, pos.x - 12, pos.y - 12, pos.width + 24, pos.height + 38, 12)
        ctx.fill()
        ctx.restore()
      }
    })

    // ===== Garis putus-putus (perforated line) — titik bulat, lebih halus =====
    ctx.strokeStyle = '#4a4a4a'
    ctx.lineWidth = 2.5
    ctx.setLineDash([2, 10])
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(30, 1290)
    ctx.lineTo(W - 30, 1290)
    ctx.stroke()
    ctx.setLineDash([])
    // hati emas mini di tengah perforasi
    gambarHati(ctx, W / 2, 1290, 18, 'rgba(212,175,55,0.75)')

    // ===== Info tiket section =====
    const infoY = 1310

    // ROW & SEAT
    ctx.fillStyle = '#a8a8a8'
    ctx.font = '600 20px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'left'
    ctx.fillText('ROW : 06', 40, infoY + 20)

    ctx.textAlign = 'right'
    ctx.fillText('SEAT :09', W - 40, infoY + 20)

    // Garis pemisah
    ctx.strokeStyle = '#3f3f3f'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(40, infoY + 35)
    ctx.lineTo(W - 40, infoY + 35)
    ctx.stroke()

    // VOYAGE PARK (script Great Vibes — lentur & menarik) & TIME
    ctx.fillStyle = '#c8c8c8'
    ctx.font = '34px "Great Vibes", cursive'
    ctx.textAlign = 'left'
    ctx.fillText('Voyage Park', 40, infoY + 62)

    ctx.font = 'italic 500 21px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'right'
    ctx.fillText('13.00 PM', W - 40, infoY + 60)

    // titik emas kecil di antara info (reseksi tiket)
    ctx.fillStyle = 'rgba(212,175,55,0.5)'
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath()
      ctx.arc(W / 2 + i * 22, infoY + 30, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Date
    const today = new Date()
    const dateOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }
    const dateStr = today.toLocaleDateString('en-US', dateOptions).toUpperCase()

    ctx.fillStyle = GOLD
    ctx.font = '500 18px "Playfair Display", Georgia, serif'
    ctx.letterSpacing = '1px'
    ctx.textAlign = 'center'
    ctx.fillText(dateStr, W / 2, infoY + 90)
    ctx.letterSpacing = '0px'

    // ===== Red banner bawah "MEMORY TICKET" =====
    const bannerGrad2 = ctx.createLinearGradient(0, 1410, 0, 1480)
    bannerGrad2.addColorStop(0, '#9c2020')
    bannerGrad2.addColorStop(1, '#7a1212')
    ctx.fillStyle = bannerGrad2
    ctx.fillRect(0, 1410, W, 70)

    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2
    ctx.strokeRect(0, 1410, W, 70)
    ctx.strokeStyle = 'rgba(212,175,55,0.35)'
    ctx.lineWidth = 1
    ctx.strokeRect(6, 1416, W - 12, 58)

    // Text "MEMORY TICKET" — serif elegan dengan spasi lega
    ctx.fillStyle = CREAM_TEXT
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '4px'
    ctx.fillText('MEMORY TICKET', W / 2, 1456)
    ctx.letterSpacing = '0px'

    // aksen mini di sisi teks bawah
    gambarKelip(ctx, 58, 1444, 7, 'rgba(212,175,55,0.75)')
    gambarKelip(ctx, W - 58, 1444, 7, 'rgba(212,175,55,0.75)')

    // ===== Barcode asli (batang, bukan teks |||||) =====
    ctx.save()
    ctx.fillStyle = '#ffffff'
    let bx = W / 2 - 90
    const seed = [3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 2, 1, 1, 2, 3, 1, 2]
    for (let i = 0; i < seed.length && bx < W / 2 + 90; i++) {
      const bw = seed[i]
      ctx.fillRect(bx, 1488, bw, 22)
      bx += bw + 3
    }
    ctx.restore()

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
      })
  )
}

export const VintageTemplateConfig = {
  id: 3,
  nama: 'Cinema Ticket',
  deskripsi: 'Desain tiket bioskop dengan style theater klasik',
  jumlahFoto: 2,
  style: 'vintage',
  isDefault: true,
  generator: generateVintageTemplate
}
