// Ruang Momen Template - Archive Memory (Vintage Dark Scrapbook)
import { roundRectPath } from '../utils/imageHelper'

export const generateArchiveMemoryTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = 450
    const H = 1300
    canvas.width = W
    canvas.height = H

    // Palet
    const CREAM = '#ece4d3'
    const RED = '#b5443a'

    // ============ BACKGROUND HITAM ============
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#191512')
    bg.addColorStop(0.5, '#100d0b')
    bg.addColorStop(1, '#0b0908')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Tekstur bintik halus (grain) agar terasa vintage
    for (let i = 0; i < 2000; i++) {
      ctx.globalAlpha = Math.random() * 0.05
      ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000'
      ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1)
    }
    ctx.globalAlpha = 1

    // ============ HEADER: ENTER CODE + BARCODE ============
    ctx.textAlign = 'left'
    ctx.fillStyle = CREAM
    ctx.font = 'bold 13px Georgia, serif'
    ctx.fillText('ENTER CODE:', 40, 40)
    ctx.font = 'bold 19px Georgia, serif'
    ctx.fillText('012345', 40, 64)

    // Barcode kanan atas
    ctx.fillStyle = CREAM
    let bx = 300
    while (bx < 410) {
      const barW = Math.random() > 0.5 ? 3 : 1.5
      ctx.fillRect(bx, 26, barW, 34)
      bx += barW + (Math.random() > 0.5 ? 3 : 2)
    }

    // ============ FOTO POSISI (3 tumpuk, KOTAK) ============
    const radius = 4
    const positions = [
      { x: 45, y: 90, width: 360, height: 360, radius },
      { x: 45, y: 466, width: 360, height: 360, radius },
      { x: 45, y: 842, width: 360, height: 360, radius }
    ]

    positions.forEach((pos) => {
      ctx.fillStyle = '#241f1a'
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.fill()

      ctx.strokeStyle = 'rgba(236, 228, 211, 0.25)'
      ctx.lineWidth = 1
      roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
      ctx.stroke()
    })

    // ============ DEKORASI ABSTRAK (bintang + bunga, tersebar) ============
    const drawFlower = (cx, cy, r, color, alpha) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.fillStyle = color
      const petals = 8
      for (let i = 0; i < petals; i++) {
        ctx.save()
        ctx.rotate((i * Math.PI * 2) / petals)
        ctx.beginPath()
        ctx.ellipse(0, -r * 0.55, r * 0.2, r * 0.55, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawSparkle = (cx, cy, r, rot, color, alpha) => {
      const inner = r * 0.26
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(rot)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -r)
      ctx.lineTo(inner, -inner)
      ctx.lineTo(r, 0)
      ctx.lineTo(inner, inner)
      ctx.lineTo(0, r)
      ctx.lineTo(-inner, inner)
      ctx.lineTo(-r, 0)
      ctx.lineTo(-inner, -inner)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // Penempatan abstrak: variasi jenis, ukuran, rotasi, opacity di margin & sudut
    const decos = [
      { x: 22, y: 120, t: 'f', s: 12, a: 0.9 },
      { x: 430, y: 150, t: 's', s: 10, a: 0.8, r: 0.3 },
      { x: 16, y: 330, t: 's', s: 8, a: 0.65 },
      { x: 428, y: 372, t: 'f', s: 11, a: 0.85 },
      { x: 26, y: 560, t: 'f', s: 13, a: 0.9 },
      { x: 420, y: 606, t: 's', s: 11, a: 0.75, r: 0.5 },
      { x: 18, y: 760, t: 's', s: 9, a: 0.7, r: 0.2 },
      { x: 432, y: 828, t: 'f', s: 12, a: 0.85 },
      { x: 24, y: 1000, t: 'f', s: 10, a: 0.75 },
      { x: 424, y: 1050, t: 's', s: 12, a: 0.85, r: 0.4 },
      { x: 30, y: 1150, t: 's', s: 8, a: 0.6, r: 0.1 },
      { x: 414, y: 1180, t: 'f', s: 9, a: 0.7 }
    ]
    decos.forEach((d) => {
      if (d.t === 'f') drawFlower(d.x, d.y, d.s, CREAM, d.a)
      else drawSparkle(d.x, d.y, d.s, d.r || 0, CREAM, d.a)
    })

    // ============ FOOTER: ARCHIVE MEMORY ============
    ctx.textAlign = 'center'
    ctx.fillStyle = RED
    ctx.font = 'italic bold 46px Georgia, serif'
    ctx.fillText('ARCHIVE', W / 2, 1252)

    ctx.fillStyle = CREAM
    ctx.font = '34px Georgia, serif'
    ctx.fillText('M E M O R Y', W / 2 + 6, 1290)

    // aksen bintang mengapit footer
    drawSparkle(70, 1244, 11, 0.2, CREAM, 0.9)
    drawSparkle(380, 1282, 11, 0.4, CREAM, 0.9)
    drawFlower(225, 1216, 8, CREAM, 0.8)

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Konfigurasi template
export const ArchiveMemoryTemplateConfig = {
  id: 7,
  nama: 'Archive Memory',
  deskripsi: 'Template vintage gelap bergaya arsip dengan foto kotak, barcode, dan dekorasi bintang abstrak',
  jumlahFoto: 3,
  style: 'archivememory',
  isDefault: false,
  generator: generateArchiveMemoryTemplate
}
