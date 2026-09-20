// Generate template HSA Photobooth dengan style elegan
import { drawImageCoverMode } from './imageHelper'

export const generateHSATemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 450
    canvas.height = 1350
    
    // Background gradient biru tua dengan efek bokeh
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#1a237e')
    gradient.addColorStop(0.5, '#283593')
    gradient.addColorStop(1, '#1a237e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Efek bokeh/particles
    ctx.globalAlpha = 0.4
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 4 + 1
      
      const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2)
      particleGradient.addColorStop(0, '#64ffda')
      particleGradient.addColorStop(0.5, '#448aff')
      particleGradient.addColorStop(1, 'transparent')
      
      ctx.fillStyle = particleGradient
      ctx.beginPath()
      ctx.arc(x, y, size * 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    
    // Header section
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 32px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('RuangMomen', canvas.width / 2, 60)
    
    ctx.font = 'italic 42px Brush Script MT, cursive'
    ctx.fillText('', canvas.width / 2, 105)
    
    // Decorative line
    ctx.strokeStyle = '#64ffda'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(80, 125)
    ctx.lineTo(370, 125)
    ctx.stroke()
    
    // Posisi untuk 3 foto
    const positions = [
      { x: 50, y: 160, width: 350, height: 280 },
      { x: 50, y: 480, width: 350, height: 280 },
      { x: 50, y: 800, width: 350, height: 280 }
    ]
    
    // Gambar frame untuk setiap foto
    positions.forEach((pos) => {
      // Outer glow
      ctx.shadowColor = 'rgba(100, 255, 218, 0.5)'
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      // White frame border
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(pos.x - 8, pos.y - 8, pos.width + 16, pos.height + 16)
      
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      
      // Inner dark border
      ctx.fillStyle = '#37474f'
      ctx.fillRect(pos.x - 4, pos.y - 4, pos.width + 8, pos.height + 8)
      
      // Photo placeholder area
      ctx.fillStyle = '#eceff1'
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
    })
    
    // Footer section
    ctx.fillStyle = '#ffffff'
    ctx.font = 'italic 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Capture Your Moments', canvas.width / 2, 1120)
    
    // Date
    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    
    ctx.font = '20px Arial'
    ctx.fillStyle = '#64ffda'
    ctx.fillText(dateStr, canvas.width / 2, 1160)
    
    // Small decorative elements at bottom
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#64ffda' : '#448aff'
      ctx.beginPath()
      ctx.arc(canvas.width / 2 - 40 + (i * 40), 1200, 5, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // HSA Logo at bottom
    ctx.font = 'bold 18px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('RuangMomen', canvas.width / 2, 1280)
    
    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
}

// Generate preview template (lebih kecil untuk ditampilkan saat foto)
export const generateHSAPreview = (photos) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Scale down untuk preview - lebih kecil agar muat semua
      const scale = 0.25
      canvas.width = 450 * scale
      canvas.height = 1350 * scale
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#1a237e')
      gradient.addColorStop(0.5, '#283593')
      gradient.addColorStop(1, '#1a237e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Particles (less for preview)
      ctx.globalAlpha = 0.3
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2 + 0.5
        
        ctx.fillStyle = '#64ffda'
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      
      // Header
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold ${32 * scale}px Arial`
      ctx.textAlign = 'center'
      ctx.fillText('RuangMomen', canvas.width / 2, 60 * scale)
      
      ctx.font = `italic ${42 * scale}px Arial`
      ctx.fillText('', canvas.width / 2, 105 * scale)
      
      // Decorative line
      ctx.strokeStyle = '#64ffda'
      ctx.lineWidth = 2 * scale
      ctx.beginPath()
      ctx.moveTo(80 * scale, 125 * scale)
      ctx.lineTo(370 * scale, 125 * scale)
      ctx.stroke()
      
      // Positions scaled - buat array berdasarkan jumlah foto
      let positions = []
      
      if (photos.length <= 3) {
        // Layout 3 foto vertikal
        positions = [
          { x: 50 * scale, y: 160 * scale, width: 350 * scale, height: 280 * scale },
          { x: 50 * scale, y: 480 * scale, width: 350 * scale, height: 280 * scale },
          { x: 50 * scale, y: 800 * scale, width: 350 * scale, height: 280 * scale }
        ]
      } else {
        // Jika lebih dari 3, tampilkan 3 foto terakhir saja
        positions = [
          { x: 50 * scale, y: 160 * scale, width: 350 * scale, height: 280 * scale },
          { x: 50 * scale, y: 480 * scale, width: 350 * scale, height: 280 * scale },
          { x: 50 * scale, y: 800 * scale, width: 350 * scale, height: 280 * scale }
        ]
      }
      
      // Counter untuk tracking foto yang sudah di-load
      let loadedCount = 0
      const totalPhotos = photos.length
      
      const checkAllLoaded = () => {
        loadedCount++
        console.log(`Loaded ${loadedCount}/${totalPhotos} photos`)
        if (loadedCount === totalPhotos) {
          // Semua foto sudah di-load, render footer dan resolve
          renderFooter()
          const dataUrl = canvas.toDataURL('image/png')
          console.log('Preview canvas ready')
          resolve(dataUrl)
        }
      }
      
      const renderFooter = () => {
        // Footer
        ctx.fillStyle = '#ffffff'
        ctx.font = `italic ${24 * scale}px Arial`
        ctx.textAlign = 'center'
        ctx.fillText('Capture Your Moments', canvas.width / 2, 1120 * scale)
        
        // Date
        const today = new Date()
        const dateStr = today.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
        
        ctx.font = `${20 * scale}px Arial`
        ctx.fillStyle = '#64ffda'
        ctx.fillText(dateStr, canvas.width / 2, 1160 * scale)
        
        // Decorative dots
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = i % 2 === 0 ? '#64ffda' : '#448aff'
          ctx.beginPath()
          ctx.arc((canvas.width / 2 - 40 * scale) + (i * 40 * scale), 1200 * scale, 5 * scale, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // HSA Logo
        ctx.font = `bold ${18 * scale}px Arial`
        ctx.fillStyle = '#ffffff'
        ctx.fillText('RuangMomen', canvas.width / 2, 1280 * scale)
      }
      
      // Draw frames and photos
      positions.forEach((pos, index) => {
        // Outer glow
        ctx.shadowColor = 'rgba(100, 255, 218, 0.3)'
        ctx.shadowBlur = 8 * scale
        
        // White frame
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(pos.x - 8 * scale, pos.y - 8 * scale, pos.width + 16 * scale, pos.height + 16 * scale)
        
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        
        // Dark border
        ctx.fillStyle = '#37474f'
        ctx.fillRect(pos.x - 4 * scale, pos.y - 4 * scale, pos.width + 8 * scale, pos.height + 8 * scale)
        
        // Placeholder dulu untuk semua slot
        ctx.fillStyle = '#eceff1'
        ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
        
        // Number placeholder untuk slot kosong
        if (!photos[index]) {
          ctx.fillStyle = '#90a4ae'
          ctx.font = `bold ${40 * scale}px Arial`
          ctx.textAlign = 'center'
          ctx.fillText(index + 1, pos.x + pos.width / 2, pos.y + pos.height / 2 + 10 * scale)
        }
      })
      
      // Load dan draw foto yang sudah ada
      if (totalPhotos > 0) {
        photos.forEach((photoSrc, index) => {
          const pos = positions[index]
          if (pos) {
            const img = new Image()
            img.onload = () => {
              console.log(`Drawing photo ${index + 1}`)
              // Gunakan cover mode agar tidak terdistorsi
              drawImageCoverMode(ctx, img, pos.x, pos.y, pos.width, pos.height)
              checkAllLoaded()
            }
            img.onerror = (error) => {
              console.error(`Error loading photo ${index + 1}:`, error)
              checkAllLoaded()
            }
            img.src = photoSrc
          }
        })
      } else {
        // Tidak ada foto, langsung resolve
        console.log('No photos yet, rendering empty template')
        renderFooter()
        const dataUrl = canvas.toDataURL('image/png')
        resolve(dataUrl)
      }
      
      // Timeout sebagai fallback
      setTimeout(() => {
        if (loadedCount < totalPhotos) {
          console.warn('Timeout waiting for images, generating preview anyway')
          renderFooter()
          const dataUrl = canvas.toDataURL('image/png')
          resolve(dataUrl)
        }
      }, 3000)
      
    } catch (error) {
      console.error('Error in generateHSAPreview:', error)
      reject(error)
    }
  })
}
