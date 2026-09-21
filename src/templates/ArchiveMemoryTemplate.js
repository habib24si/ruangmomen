// Ruang Momen Template - Archive Memory (Vintage Dark Scrapbook)
// Tema tetap: arsip gelap, 3 foto kotak, ENTER CODE + barcode, footer ARCHIVE MEMORY.
// Yang diubah: bintang & bunga kini ada di OVERLAY (menimpa di DEPAN foto),
// plus detail elegan — hairline border, sudut mount album, divider, Playfair Display.
import { roundRectPath } from '../utils/imageHelper'

// ---- helper dekorasi (terima context agar bisa dipakai template & overlay) ----
const drawFlower = (c, cx, cy, r, color, alpha) => {
  c.save()
  c.globalAlpha = alpha
  c.translate(cx, cy)
  c.fillStyle = color
  const petals = 8
  for (let i = 0; i < petals; i++) {
    c.save()
    c.rotate((i * Math.PI * 2) / petals)
    c.beginPath()
    c.ellipse(0, -r * 0.55, r * 0.2, r * 0.55, 0, 0, Math.PI * 2)
    c.fill()
    c.restore()
  }
  c.beginPath()
  c.arc(0, 0, r * 0.2, 0, Math.PI * 2)
  c.fill()
  c.restore()
}

const drawSparkle = (c, cx, cy, r, rot, color, alpha, glow) => {
  const inner = r * 0.26
  c.save()
  c.globalAlpha = alpha
  if (glow) {
    c.shadowColor = 'rgba(255, 240, 205, 0.75)'
    c.shadowBlur = glow
  }
  c.translate(cx, cy)
  c.rotate(rot || 0)
  c.fillStyle = color
  c.beginPath()
  c.moveTo(0, -r)
  c.lineTo(inner, -inner)
  c.lineTo(r, 0)
  c.lineTo(inner, inner)
  c.lineTo(0, r)
  c.lineTo(-inner, inner)
  c.lineTo(-r, 0)
  c.lineTo(-inner, -inner)
  c.closePath()
  c.fill()
  c.restore()
}

export const generateArchiveMemoryTemplate = () => {
  // tunggu font web agar teks canvas tidak fallback ke font kaku
  const fontSiap =
    document.fonts && document.fonts.load
      ? Promise.allSettled([
          document.fonts.load('italic 800 46px "Playfair Display"'),
          document.fonts.load('700 20px "Playfair Display"')
        ])
      : Promise.resolve()

  return fontSiap.then(
    () =>
      new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const W = 450
        const H = 1300
        canvas.width = W
        canvas.height = H

        // Palet
        const CREAM = '#ece4d3'
        const RED = '#b5443a'
        const setSpacing = (v) => {
          try {
            ctx.letterSpacing = v
          } catch (e) {
            /* tidak didukung browser */
          }
        }

        // ============ BACKGROUND HITAM HALUS ============
        const bg = ctx.createLinearGradient(0, 0, W, H)
        bg.addColorStop(0, '#191512')
        bg.addColorStop(0.5, '#100d0b')
        bg.addColorStop(1, '#0b0908')
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, W, H)

        // grain vintage
        for (let i = 0; i < 1500; i++) {
          ctx.globalAlpha = Math.random() * 0.05
          ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000'
          ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1)
        }
        ctx.globalAlpha = 1

        // hairline border elegan + kelip kecil di 4 sudut
        ctx.strokeStyle = 'rgba(236, 228, 211, 0.14)'
        ctx.lineWidth = 1
        ctx.strokeRect(10, 10, W - 20, H - 20)
        drawSparkle(ctx, 10, 10, 5, 0, CREAM, 0.5)
        drawSparkle(ctx, W - 10, 10, 5, 0, CREAM, 0.5)
        drawSparkle(ctx, 10, H - 10, 5, 0, CREAM, 0.5)
        drawSparkle(ctx, W - 10, H - 10, 5, 0, CREAM, 0.5)

        // ============ HEADER: ENTER CODE + BARCODE ============
        ctx.textAlign = 'left'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = 'rgba(236, 228, 211, 0.75)'
        ctx.font = '700 11px "Playfair Display", Georgia, serif'
        setSpacing('3px')
        ctx.fillText('ENTER CODE', 40, 42)
        setSpacing('0px')
        ctx.fillStyle = CREAM
        ctx.font = '700 20px "Playfair Display", Georgia, serif'
        ctx.fillText('012345', 40, 66)

        // barcode kanan atas
        ctx.fillStyle = 'rgba(236, 228, 211, 0.9)'
        let bx = 300
        while (bx < 410) {
          const barW = Math.random() > 0.5 ? 3 : 1.5
          ctx.fillRect(bx, 28, barW, 32)
          bx += barW + (Math.random() > 0.5 ? 3 : 2)
        }

        // ============ FOTO POSISI (3 tumpuk, KOTAK — tetap seperti asli) ============
        const radius = 4
        const positions = [
          { x: 45, y: 90, width: 360, height: 360, radius },
          { x: 45, y: 466, width: 360, height: 360, radius },
          { x: 45, y: 842, width: 360, height: 360, radius }
        ]

        positions.forEach((pos) => {
          // bayangan lembut — foto terasa "mengambang" elegan
          ctx.save()
          ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'
          ctx.shadowBlur = 16
          ctx.shadowOffsetY = 7
          ctx.fillStyle = '#241f1a'
          roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
          ctx.fill()
          ctx.restore()

          // hairline tepi foto
          ctx.strokeStyle = 'rgba(236, 228, 211, 0.28)'
          ctx.lineWidth = 1
          roundRectPath(ctx, pos.x, pos.y, pos.width, pos.height, radius)
          ctx.stroke()

          // sudut mount album (klip emas) — ciri arsip foto klasik
          ctx.strokeStyle = 'rgba(212, 185, 130, 0.8)'
          ctx.lineWidth = 2
          ctx.lineCap = 'round'
          const m = 15 // panjang lengan klip
          const corners = [
            [pos.x, pos.y, 1, 1],
            [pos.x + pos.width, pos.y, -1, 1],
            [pos.x, pos.y + pos.height, 1, -1],
            [pos.x + pos.width, pos.y + pos.height, -1, -1]
          ]
          corners.forEach(([x, y, dx, dy]) => {
            ctx.beginPath()
            ctx.moveTo(x + dx * m, y + dy * 3)
            ctx.lineTo(x + dx * 3, y + dy * 3)
            ctx.lineTo(x + dx * 3, y + dy * m)
            ctx.stroke()
          })
        })

        // divider mini di sela foto (─ ✦ ─)
        const divider = (y) => {
          ctx.strokeStyle = 'rgba(236, 228, 211, 0.3)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(150, y)
          ctx.lineTo(205, y)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(245, y)
          ctx.lineTo(300, y)
          ctx.stroke()
          drawSparkle(ctx, 225, y, 6, 0, 'rgba(212,185,130,0.95)', 0.9)
        }
        divider(458)
        divider(834)

        // ============ DEKORASI LATAR (di margin saja, bukan di foto) ============
        const decos = [
          { x: 22, y: 190, t: 'f', s: 10, a: 0.55 },
          { x: 430, y: 260, t: 's', s: 7, a: 0.5, r: 0.3 },
          { x: 18, y: 640, t: 's', s: 8, a: 0.5, r: 0.2 },
          { x: 432, y: 700, t: 'f', s: 9, a: 0.55 },
          { x: 20, y: 1060, t: 'f', s: 9, a: 0.5 },
          { x: 430, y: 1120, t: 's', s: 8, a: 0.5, r: 0.4 }
        ]
        decos.forEach((d) => {
          if (d.t === 'f') drawFlower(ctx, d.x, d.y, d.s, CREAM, d.a)
          else drawSparkle(ctx, d.x, d.y, d.s, d.r || 0, CREAM, d.a)
        })

        // ============ FOOTER: ARCHIVE MEMORY ============
        // baris kecil elegan di atas judul
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(236, 228, 211, 0.55)'
        ctx.font = '700 9px "Playfair Display", Georgia, serif'
        setSpacing('4px')
        ctx.fillText('PERSONAL COLLECTION · VOL. 01', W / 2, 1216)
        setSpacing('0px')

        ctx.fillStyle = RED
        ctx.font = 'italic 800 46px "Playfair Display", Georgia, serif'
        ctx.fillText('ARCHIVE', W / 2, 1256)

        ctx.fillStyle = CREAM
        ctx.font = '700 22px "Playfair Display", Georgia, serif'
        setSpacing('8px')
        ctx.fillText('MEMORY', W / 2 + 4, 1290)
        setSpacing('0px')

        // aksen bintang mengapit footer
        drawSparkle(ctx, 66, 1248, 10, 0.2, CREAM, 0.85, 8)
        drawSparkle(ctx, 384, 1284, 10, 0.4, CREAM, 0.85, 8)

        // ============ OVERLAY: BINTANG MENIMPA DEPAN FOTO ============
        const overlayCanvas = document.createElement('canvas')
        overlayCanvas.width = W
        overlayCanvas.height = H
        const octx = overlayCanvas.getContext('2d')

        // bintang/bunga yang sengaja "naik" ke atas foto: di tepi & sudut frame foto
        const decosDepan = [
          { x: 402, y: 96, t: 's', s: 17, a: 0.95, r: 0.3 },    // sudut kanan-atas foto 1
          { x: 46, y: 452, t: 's', s: 13, a: 0.9, r: 0.15 },    // sudut kiri-bawah foto 1
          { x: 224, y: 466, t: 'f', s: 10, a: 0.9 },            // tengah gap foto 1-2
          { x: 408, y: 820, t: 'f', s: 11, a: 0.9 },            // sudut kanan-bawah foto 2
          { x: 44, y: 842, t: 's', s: 14, a: 0.92, r: 0.4 },    // sudut kiri-atas foto 3
          { x: 404, y: 1196, t: 's', s: 15, a: 0.95, r: 0.2 },  // sudut kanan-bawah foto 3
          { x: 226, y: 254, t: 's', s: 7, a: 0.55, r: 0.1 },    // kecil di tengah foto 1
          { x: 236, y: 650, t: 's', s: 6, a: 0.5 },             // kecil di tengah foto 2
          { x: 214, y: 1024, t: 'f', s: 7, a: 0.55 }            // kecil di tengah foto 3
        ]
        decosDepan.forEach((d) => {
          if (d.t === 'f') {
            octx.save()
            octx.shadowColor = 'rgba(255, 240, 205, 0.6)'
            octx.shadowBlur = 10
            drawFlower(octx, d.x, d.y, d.s, CREAM, d.a)
            octx.restore()
          } else {
            drawSparkle(octx, d.x, d.y, d.s, d.r || 0, CREAM, d.a, 12)
          }
        })

        const dataUrl = canvas.toDataURL('image/png')
        const overlayUrl = overlayCanvas.toDataURL('image/png')
        resolve({ dataUrl, positions, overlay: overlayUrl })
      })
  )
}

// Konfigurasi template
export const ArchiveMemoryTemplateConfig = {
  id: 7,
  nama: 'Archive Memory',
  deskripsi: 'Arsip gelap elegan — foto kotak berklip emas, bintang menimpa foto, barcode & footer Playfair',
  jumlahFoto: 3,
  style: 'archivememory',
  isDefault: false,
  generator: generateArchiveMemoryTemplate
}
