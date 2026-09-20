// Colorful Fun Template
export const generateColorfulTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 850
    canvas.height = 1850
    
    // Background white dengan pattern
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Colorful dots pattern
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94']
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.globalAlpha = 0.15
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 30 + 10
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    
    // Colorful header
    ctx.fillStyle = '#2d3748'
    ctx.font = 'bold 64px Arial Black'
    ctx.textAlign = 'center'
    ctx.fillText('FUN', canvas.width / 2, 100)
    
    ctx.font = 'bold 48px Arial'
    // "PHOTOBOOTH" dalam SATU baris, tetap dua warna
    ctx.textAlign = 'left'
    const photoText = 'PHOTO'
    const boothText = 'BOOTH'
    const wPhoto = ctx.measureText(photoText).width
    const wBooth = ctx.measureText(boothText).width
    const startX = canvas.width / 2 - (wPhoto + wBooth) / 2
    ctx.fillStyle = '#ff6b6b'
    ctx.fillText(photoText, startX, 160)
    ctx.fillStyle = '#4ecdc4'
    ctx.fillText(boothText, startX + wPhoto, 160)
    ctx.textAlign = 'center'
    
    const positions = [
      { x: 125, y: 270, width: 600, height: 450 },
      { x: 125, y: 780, width: 600, height: 450 },
      { x: 125, y: 1290, width: 600, height: 450 }
    ]
    
    // Gambar frame foto colorful dengan rotation effect
    positions.forEach((pos, index) => {
      const frameColors = ['#ff6b6b', '#4ecdc4', '#ffe66d']
      
      ctx.save()
      ctx.translate(pos.x + pos.width / 2, pos.y + pos.height / 2)
      ctx.rotate((Math.random() - 0.5) * 0.05) // Slight rotation
      
      // Colorful shadow
      ctx.fillStyle = frameColors[index] + '40'
      ctx.fillRect(-pos.width / 2 + 8, -pos.height / 2 + 8, pos.width, pos.height)
      
      // White background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(-pos.width / 2, -pos.height / 2, pos.width, pos.height)
      
      // Colorful border
      ctx.strokeStyle = frameColors[index]
      ctx.lineWidth = 8
      ctx.strokeRect(-pos.width / 2 + 15, -pos.height / 2 + 15, pos.width - 30, pos.height - 30)
      
      // Inner area
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(-pos.width / 2 + 23, -pos.height / 2 + 23, pos.width - 46, pos.height - 46)
      
      ctx.restore()
      
      // Fun stickers/badges
      ctx.fillStyle = frameColors[index]
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(['😊', '✨', '🎉'][index], pos.x - 30, pos.y + 40)
    })
    
    // Footer colorful
    ctx.font = 'bold 28px Arial'
    const footerText = 'Smile & Enjoy!'
    const textWidth = ctx.measureText(footerText).width
    
    for (let i = 0; i < footerText.length; i++) {
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillText(footerText[i], canvas.width / 2 - textWidth / 2 + (i * 18), canvas.height - 50)
    }
    
    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

export const ColorfulTemplateConfig = {
  id: 4,
  nama: 'Colorful Fun',
  deskripsi: 'Desain ceria dengan warna-warni dan emoji lucu',
  jumlahFoto: 3,
  style: 'colorful',
  isDefault: true,
  generator: generateColorfulTemplate
}
