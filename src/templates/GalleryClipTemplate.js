// Gallery Clip Template
// Foto tunggal berbingkai putih (mat) yang "digantung" pada rel kuningan
// di dinding bertekstur hangat. Estetika galeri/museum: minimalis & instagramable.
import { roundRectPath } from '../utils/imageHelper'

export const generateGalleryClipTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 800)
    const H = (canvas.height = 1000)

    const setSpacing = (v) => {
      try {
        ctx.letterSpacing = v + 'px'
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
    vig.addColorStop(1, 'rgba(0,0,0,0.22)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

    // ---------- GEOMETRI ----------
    const CARD_X = 190
    const CARD_Y = 150
    const CARD_W = 420
    const CARD_H = 730
    const positions = [{ x: 216, y: 224, width: 368, height: 630, radius: 2 }]

    // ---------- KARTU / MAT PUTIH + BAYANGAN ----------
    ctx.save()
    ctx.shadowColor = 'rgba(40,34,28,0.32)'
    ctx.shadowBlur = 30
    ctx.shadowOffsetY = 18
    roundRectPath(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 4)
    ctx.fillStyle = '#f7f5f2'
    ctx.fill()
    ctx.restore()

    // garis dalam halus pada mat
    ctx.strokeStyle = 'rgba(0,0,0,0.06)'
    ctx.lineWidth = 1
    roundRectPath(ctx, positions[0].x - 3, positions[0].y - 3, positions[0].width + 6, positions[0].height + 6, 3)
    ctx.stroke()

    // ---------- PLACEHOLDER FOTO (akan tertutup foto) ----------
    roundRectPath(ctx, positions[0].x, positions[0].y, positions[0].width, positions[0].height, 2)
    ctx.fillStyle = '#dedad4'
    ctx.fill()

    // ---------- REL KUNINGAN (meng-clip bagian atas kartu) ----------
    const RAIL_X = 150
    const RAIL_Y = 150
    const RAIL_W = 500
    const RAIL_H = 44
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.4)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 10
    const brass = ctx.createLinearGradient(0, RAIL_Y, 0, RAIL_Y + RAIL_H)
    brass.addColorStop(0, '#f0dcae')
    brass.addColorStop(0.35, '#cda35c')
    brass.addColorStop(0.55, '#a97f3c')
    brass.addColorStop(1, '#6e4f22')
    roundRectPath(ctx, RAIL_X, RAIL_Y, RAIL_W, RAIL_H, 10)
    ctx.fillStyle = brass
    ctx.fill()
    ctx.restore()

    // garis kilap pada rel
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(RAIL_X + 16, RAIL_Y + 10)
    ctx.lineTo(RAIL_X + RAIL_W - 16, RAIL_Y + 10)
    ctx.stroke()

    // penyangga (end caps) di kedua ujung rel
    ctx.fillStyle = '#5c421d'
    roundRectPath(ctx, RAIL_X - 8, RAIL_Y + 5, 18, RAIL_H - 10, 5)
    ctx.fill()
    roundRectPath(ctx, RAIL_X + RAIL_W - 10, RAIL_Y + 5, 18, RAIL_H - 10, 5)
    ctx.fill()

    // ---------- BRAND HALUS DI BAWAH ----------
    ctx.fillStyle = 'rgba(80,72,64,0.55)'
    ctx.font = '14px Georgia, "Times New Roman", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    setSpacing(5)
    ctx.fillText('R U A N G   M O M E N', W / 2, 946)
    setSpacing(0)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const GalleryClipTemplateConfig = {
  id: 8,
  nama: 'Gallery Clip',
  deskripsi: 'Foto digantung pada rel kuningan di dinding bertekstur, ala galeri elegan',
  jumlahFoto: 1,
  style: 'gallery',
  isDefault: true,
  generator: generateGalleryClipTemplate
}
