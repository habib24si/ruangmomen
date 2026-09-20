// Utility untuk generate template default jika tidak ada template image

// Template Style 1: Modern Minimalist (3 foto)
export const generateModernTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 800
    canvas.height = 1800
    
    // Background gradient modern
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Inner white box
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 5
    ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80)
    ctx.shadowColor = 'transparent'
    
    // Header dengan dekorasi
    ctx.fillStyle = '#2d3748'
    ctx.font = 'bold 52px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('MEMORIES', canvas.width / 2, 120)
    
    // Subtitle
    ctx.fillStyle = '#718096'
    ctx.font = '20px Arial'
    ctx.fillText('Photo Booth Collection', canvas.width / 2, 155)
    
    // Dekorasi garis
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(150, 180)
    ctx.lineTo(650, 180)
    ctx.stroke()
    
    // Decorative circles
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#667eea' : '#764ba2'
      ctx.beginPath()
      ctx.arc(150 + (i * 250), 180, 6, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const positions = [
      { x: 100, y: 230, width: 600, height: 450 },
      { x: 100, y: 720, width: 600, height: 450 },
      { x: 100, y: 1210, width: 600, height: 450 }
    ]
    
    // Gambar frame foto dengan style modern
    positions.forEach((pos, index) => {
      // Shadow untuk depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(pos.x + 5, pos.y + 5, pos.width, pos.height)
      
      // Border putih
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
      
      // Inner border
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 3
      ctx.strokeRect(pos.x + 10, pos.y + 10, pos.width - 20, pos.height - 20)
      
      // Area foto
      ctx.fillStyle = '#f7fafc'
      ctx.fillRect(pos.x + 13, pos.y + 13, pos.width - 26, pos.height - 26)
      
      // Label foto
      ctx.fillStyle = '#667eea'
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(`Photo ${index + 1}`, pos.x + 25, pos.y + 40)
    })
    
    // Footer
    ctx.fillStyle = '#a0aec0'
    ctx.font = 'italic 16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Capture your moments', canvas.width / 2, canvas.height - 50)
    
    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Template Style 2: Vintage Classic (4 foto)
export const generateVintageTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 1000
    canvas.height = 1400
    
    // Background cream vintage
    ctx.fillStyle = '#f5f1e8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Border vintage dengan pattern
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 20
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
    
    ctx.strokeStyle = '#d4c4b0'
    ctx.lineWidth = 8
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)
    
    // Decorative corners
    const drawCornerDecoration = (x, y, rotation) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      
      ctx.strokeStyle = '#8b7355'
      ctx.lineWidth = 3
      
      // Draw ornament
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(20, -10, 40, 0)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(-10, 20, 0, 40)
      ctx.stroke()
      
      ctx.restore()
    }
    
    drawCornerDecoration(50, 50, 0)
    drawCornerDecoration(canvas.width - 50, 50, Math.PI / 2)
    drawCornerDecoration(canvas.width - 50, canvas.height - 50, Math.PI)
    drawCornerDecoration(50, canvas.height - 50, -Math.PI / 2)
    
    // Header vintage
    ctx.fillStyle = '#8b7355'
    ctx.font = 'bold 56px Georgia'
    ctx.textAlign = 'center'
    ctx.fillText('PHOTO BOOTH', canvas.width / 2, 110)
    
    // Decorative line
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 2
    
    ctx.beginPath()
    ctx.moveTo(200, 135)
    ctx.lineTo(canvas.width - 200, 135)
    ctx.stroke()
    
    // Small decorations
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = '#d4c4b0'
      ctx.beginPath()
      ctx.arc(200 + (i * 150), 135, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const positions = [
      { x: 70, y: 180, width: 425, height: 520 },
      { x: 505, y: 180, width: 425, height: 520 },
      { x: 70, y: 720, width: 425, height: 520 },
      { x: 505, y: 720, width: 425, height: 520 }
    ]
    
    // Gambar frame foto vintage
    positions.forEach((pos, index) => {
      // Outer shadow
      ctx.fillStyle = 'rgba(139, 115, 85, 0.2)'
      ctx.fillRect(pos.x + 6, pos.y + 6, pos.width, pos.height)
      
      // Cream border
      ctx.fillStyle = '#f5f1e8'
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
      
      // Brown frame
      ctx.fillStyle = '#8b7355'
      ctx.fillRect(pos.x + 10, pos.y + 10, pos.width - 20, pos.height - 20)
      
      // Inner cream
      ctx.fillStyle = '#faf8f3'
      ctx.fillRect(pos.x + 20, pos.y + 20, pos.width - 40, pos.height - 40)
      
      // Photo area
      ctx.fillStyle = '#f0ebe0'
      ctx.fillRect(pos.x + 25, pos.y + 25, pos.width - 50, pos.height - 50)
    })
    
    // Footer
    ctx.fillStyle = '#8b7355'
    ctx.font = 'italic 22px Georgia'
    ctx.textAlign = 'center'
    ctx.fillText('Timeless Memories', canvas.width / 2, canvas.height - 45)
    
    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Template Style 3: Colorful Fun (3 foto)
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
    ctx.fillStyle = '#ff6b6b'
    ctx.fillText('PHOTO', canvas.width / 2, 150)
    
    ctx.fillStyle = '#4ecdc4'
    ctx.fillText('BOOTH', canvas.width / 2, 195)
    
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

// Template Style 4: Elegant Minimalist (2 foto)
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
