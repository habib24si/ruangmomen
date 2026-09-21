// Booth Print (eks Gallery Clip) Template
// Tema SEBENARNYA: foto instan keluar dari slot mesin photobooth —
// cetakan putih bergaris besar di bawah, menjuntai dari celah mesin gelap,
// di studiowall hangat bertekstur. Bukan galeri digantung rel.
import { roundRectPath } from '../utils/imageHelper'

const gambarHati = (c, cx, cy, size, warna) => {
  c.save()
  c.translate(cx, cy)
  c.scale(size / 100, size / 100)
  c.beginPath()
  c.moveTo(0, 30)
  c.bezierCurveTo(-60, -20, -30, -70, 0, -35)
  c.bezierCurveTo(30, -70, 60, -20, 0, 30)
  c.closePath()
  c.fillStyle = warna
  c.fill()
  c.restore()
}

const gambarKelip = (c, cx, cy, r, warna) => {
  c.save()
  c.translate(cx, cy)
  c.beginPath()
  const inner = r * 0.32
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 === 0 ? r : inner
    const a = (Math.PI / 4) * i - Math.PI / 2
    if (i === 0) c.moveTo(Math.cos(a) * rad, Math.sin(a) * rad)
    else c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad)
  }
  c.closePath()
  c.fillStyle = warna
  c.fill()
  c.restore()
}

export const generateGalleryClipTemplate = () => {
  // tunggu font web agar teks canvas tidak fallback
  const fontSiap =
    document.fonts && document.fonts.load
      ? Promise.allSettled([
          document.fonts.load('34px "Great Vibes"'),
          document.fonts.load('700 22px "Playfair Display"')
        ])
      : Promise.resolve()

  return fontSiap.then(
    () =>
      new Promise((resolve) => {
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

        // ---------- DINDING STUDIO (gradien taupe hangat) ----------
        const wall = ctx.createLinearGradient(0, 0, W, H)
        wall.addColorStop(0, '#dcd6ce')
        wall.addColorStop(0.55, '#c9c3ba')
        wall.addColorStop(1, '#b1aaa1')
        ctx.fillStyle = wall
        ctx.fillRect(0, 0, W, H)

        //tekstur halus
        for (let i = 0; i < 2200; i++) {
          const a = Math.random() * 0.05
          ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`
          ctx.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4)
        }

        //vignette
        const vig = ctx.createRadialGradient(W / 2, H * 0.42, 120, W / 2, H * 0.5, W * 0.85)
        vig.addColorStop(0, 'rgba(0,0,0,0)')
        vig.addColorStop(1, 'rgba(0,0,0,0.2)'
        )
        ctx.fillStyle = vig
        ctx.fillRect(0, 0, W, H)

        // spotlight lembut dari atas (sorotan mesin)
        const spot = ctx.createRadialGradient(W / 2, 60, 60, W / 2, 60, 560)
        spot.addColorStop(0, 'rgba(255,248,235,0.35)')
        spot.addColorStop(1, 'rgba(255,248,235,0)')
        ctx.fillStyle = spot
        ctx.fillRect(0, 0, W, H)

        // ---------- MESIN PHOTOBOTH (badan gelap) ----------
        const MX = 120
        const MY = 48
        const MW = 560
        const MH = 176
        ctx.save()
        ctx.shadowColor = 'rgba(30, 24, 18, 0.45)'
        ctx.shadowBlur = 30
        ctx.shadowOffsetY = 16
        roundRectPath(ctx, MX, MY, MW, MH, 26)
        const body = ctx.createLinearGradient(0, MY, 0, MY + MH)
        body.addColorStop(0, '#31353d')
        body.addColorStop(0.5, '#23262c')
        body.addColorStop(1, '#15171b')
        ctx.fillStyle = body
        ctx.fill()
        ctx.restore()

        //kilau tepi atas mesin
        ctx.strokeStyle = 'rgba(255,255,255,0.14)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(MX + 24, MY + 3)
        ctx.lineTo(MX + MW - 24, MY + 3)
        ctx.stroke()

        // baut sudut mesin
        ctx.fillStyle = 'rgba(255,255,255,0.10)'
        ;[
          [MX + 18, MY + 18],
          [MX + MW - 18, MY + 18],
          [MX + 18, MY + MH - 18],
          [MX + MW - 18, MY + MH - 18]
        ].forEach(([x, y]) => {
          ctx.beginPath()
          ctx.arc(x, y, 4.5, 0, Math.PI * 2)
          ctx.fill()
        })

        //merek pada mesin
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = '#ece4d3'
        ctx.font = '700 22px "Playfair Display", Georgia, serif'
        setSpacing('7px')
        ctx.fillText('RUANG MOMEN', W / 2 + 3, MY + 58)
        setSpacing('2px')
        ctx.fillStyle = 'rgba(236,228,211,0.55)'
        ctx.font = '700 11px "Playfair Display", Georgia, serif'
        setSpacing('6px')
        ctx.fillText('P H O T O   B O O T H', W / 2, MY + 82)
        setSpacing('0px')

        // LED status hijau menyala
        ctx.save()
        ctx.shadowColor = 'rgba(120, 230, 150, 0.9)'
        ctx.shadowBlur = 12
        ctx.fillStyle = '#7de89a'
        ctx.beginPath()
        ctx.arc(MX + MW - 40, MY + 40, 7, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // garis "equalizer" kecil di kiri mesin (sedang mencetak)
        ctx.fillStyle = 'rgba(236,228,211,0.4)'
        ;[10, 18, 8, 15, 6].forEach((hh, i) => {
          ctx.fillRect(MX + 34 + i * 8, MY + 44 - hh, 4, hh)
        })

        // ---------- SLOT CETAK ----------
        const SX = 230
        const SY = MY + MH - 26 // celah di tepi bawah mesin
        const SW = 340
        const SH = 20
        ctx.fillStyle = '#0a0b0d'
        roundRectPath(ctx, SX - 10, SY - 4, SW + 20, SH + 8, 10)
        ctx.fill()
        // bibir logam slot
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(SX - 6, SY)
        ctx.lineTo(SX + SW + 6, SY)
        ctx.stroke()

        // ---------- CETAKAN FOTO (menjuntai keluar dari slot) ----------
        const CARD_X = 230
        const CARD_Y = SY + 2 // ujung atas "masuk" ke slot
        const CARD_W = 340
        const positions = [{ x: CARD_X + 24, y: 252, width: 292, height: 292, radius: 2 }]
        const CARD_H = 252 - CARD_Y + 292 + 68 // border bawah tebal ala instant print

        //bayangan kertas
        ctx.save()
        ctx.shadowColor = 'rgba(40, 34, 28, 0.4)'
        ctx.shadowBlur = 26
        ctx.shadowOffsetY = 14
        roundRectPath(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 5)
        ctx.fillStyle = '#faf8f5'
        ctx.fill()
        ctx.restore()

        // gradasi lekukan kertas di dekat slot (efek menjuntai)
        const bend = ctx.createLinearGradient(0, CARD_Y, 0, CARD_Y + 46)
        bend.addColorStop(0, 'rgba(60, 50, 40, 0.28)')
        bend.addColorStop(1, 'rgba(60, 50, 40, 0)')
        roundRectPath(ctx, CARD_X, CARD_Y, CARD_W, 46, 5)
        ctx.fillStyle = bend
        ctx.fill()

        // area foto (placeholder, akan tertutup foto)
        roundRectPath(ctx, positions[0].x, positions[0].y, positions[0].width, positions[0].height, 2)
        ctx.fillStyle = '#dedad4'
        ctx.fill()
        ctx.strokeStyle = 'rgba(0,0,0,0.08)'
        ctx.lineWidth = 1
        roundRectPath(ctx, positions[0].x - 2, positions[0].y - 2, positions[0].width + 4, positions[0].height + 4, 3)
        ctx.stroke()

        // garis bayangan slot di ATAS kertas -> kertas terlihat keluar dari dalam
        ctx.fillStyle = '#0a0b0d'
        roundRectPath(ctx, SX - 10, SY - 6, SW + 20, 10, 5)
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.beginPath()
        ctx.moveTo(SX - 6, SY - 6)
        ctx.lineTo(SX + SW + 6, SY - 6)
        ctx.stroke()

        //caption tangan di border bawah kertas
        const capY = CARD_Y + CARD_H - 34
        ctx.fillStyle = '#5a5148'
        ctx.font = '30px "Great Vibes", cursive'
        ctx.textAlign = 'center'
        ctx.fillText('sweet memories', W / 2, capY)

        const today = new Date()
        const dateStr = today
          .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          .toUpperCase()
        ctx.fillStyle = 'rgba(90, 81, 72, 0.6)'
        ctx.font = '500 11px "Playfair Display", Georgia, serif'
        setSpacing('2px')
        ctx.fillText(dateStr, W / 2, capY + 22)
        setSpacing('0px')

        // ---------- SERPIHAN MANIS di sekitar kertas ----------
        gambarHati(ctx, 180, 345, 20, 'rgba(181, 68, 58, 0.55)')
        gambarHati(ctx, 622, 430, 16, 'rgba(181, 68, 58, 0.4)')
        gambarKelip(ctx, 160, 540, 9, 'rgba(120, 100, 78, 0.5)')
        gambarKelip(ctx, 642, 310, 11, 'rgba(120, 100, 78, 0.55)')
        gambarKelip(ctx, 600, 585, 7, 'rgba(120, 100, 78, 0.4)')

        // ---------- BARIS ELEGAN DI BAWAH CETAKAN ----------
        ctx.strokeStyle = 'rgba(90, 81, 72, 0.35)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(215, 672)
        ctx.lineTo(280, 672)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(520, 672)
        ctx.lineTo(585, 672)
        ctx.stroke()
        ctx.fillStyle = 'rgba(90, 81, 72, 0.75)'
        ctx.font = 'italic 500 16px "Playfair Display", Georgia, serif'
        ctx.textAlign = 'center'
        setSpacing('2px')
        ctx.fillText('print once · keep forever', W / 2, 678)
        setSpacing('0px')
        gambarKelip(ctx, 300, 672, 6, 'rgba(181, 68, 58, 0.55)')
        gambarKelip(ctx, 500, 672, 6, 'rgba(181, 68, 58, 0.55)')

        // ---------- BRAND HALUS DI BAWAH ----------
        ctx.fillStyle = 'rgba(80, 72, 64, 0.55)'
        ctx.font = '500 14px "Playfair Display", Georgia, serif'
        ctx.textAlign = 'center'
        setSpacing('5px')
        ctx.fillText('R U A N G   M O M E N', W / 2, H - 34)
        setSpacing('0px')

        const dataUrl = canvas.toDataURL('image/png')
        resolve({ dataUrl, positions })
      })
  )
}

export const GalleryClipTemplateConfig = {
  id: 8,
  nama: 'Gallery Clip',
  deskripsi: 'Cetakan foto instan keluar dari slot mesin photobooth, caption tulisan tangan',
  jumlahFoto: 1,
  style: 'gallery',
  isDefault: true,
  generator: generateGalleryClipTemplate
}
