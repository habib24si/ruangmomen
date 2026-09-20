// Elegant Minimal Template
export const generateElegantTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 1200
    canvas.height = 900
    
    // Pure white background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Elegant thin borders
    ctx.strokeStyle = '#2d3748'
    ctx.lineWidth = 1
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)
    ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70)
    
    // Minimalist header
    ctx.fillStyle = '#2d3748'
    ctx.font = '300 42px Arial'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '8px'
    ctx.fillText('P H O T O   B O O T H', canvas.width / 2, 90)
    
    // Thin decorative line
    ctx.strokeStyle = '#cbd5e0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 150, 110)
    ctx.lineTo(canvas.width / 2 + 150, 110)
    ctx.stroke()
    
    const positions = [
      { x: 80, y: 160, width: 520, height: 650 },
      { x: 620, y: 160, width: 520, height: 650 }
    ]
    
    // Elegant photo frames
    positions.forEach((pos, index) => {
      // Subtle shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(pos.x + 3, pos.y + 3, pos.width, pos.height)
      
      // White frame
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
      
      // Elegant thin border
      ctx.strokeStyle = '#cbd5e0'
      ctx.lineWidth = 2
      ctx.strokeRect(pos.x + 20, pos.y + 20, pos.width - 40, pos.height - 40)
      
      // Photo area
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(pos.x + 23, pos.y + 23, pos.width - 46, pos.height - 46)
      
      // Minimal number
      ctx.fillStyle = '#cbd5e0'
      ctx.font = '18px Arial'
      ctx.textAlign = 'right'
      ctx.fillText(`0${index + 1}`, pos.x + pos.width - 35, pos.y + 50)
    })
    
    // Date placeholder at bottom
    ctx.fillStyle = '#a0aec0'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }), canvas.width / 2, canvas.height - 45)
    
    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const ElegantTemplateConfig = {
  id: 5,
  nama: 'Elegant Minimal',
  deskripsi: 'Minimalis dan elegan dengan garis tipis yang anggun',
  jumlahFoto: 2,
  style: 'elegant',
  isDefault: true,
  generator: generateElegantTemplate
}
