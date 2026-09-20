// Instagram Grid Template (3x3 photo dump)
// 9 foto kotak mengisi penuh kanvas, dipisah garis putih tipis ala grid Instagram.

export const generateInstagramGridTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const W = (canvas.width = 1080)
    const H = (canvas.height = 1080)

    // ---------- LATAR PUTIH (jadi garis pemisah) ----------
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)

    // ---------- GRID 3x3 ----------
    const gap = 9
    const cols = 3
    const rows = 3
    const cell = (W - gap * (cols - 1)) / cols // 354

    const positions = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          x: c * (cell + gap),
          y: r * (cell + gap),
          width: cell,
          height: cell,
          radius: 0
        })
      }
    }

    // ---------- PLACEHOLDER (akan tertutup foto) ----------
    positions.forEach((pos) => {
      ctx.fillStyle = '#ececec'
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
    })

    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const InstagramGridTemplateConfig = {
  id: 10,
  nama: 'Instagram Grid',
  deskripsi: 'Sembilan foto kotak 3x3 penuh kanvas dengan garis putih tipis',
  jumlahFoto: 9,
  style: 'grid',
  isDefault: false,
  generator: generateInstagramGridTemplate
}
