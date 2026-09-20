// Cinema Ticket Template - Movie Theater Style
export const generateVintageTemplate = () => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 540
    canvas.height = 1520
    
    // Background hitam
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Checkered pattern di atas (seperti film)
    const checkSize = 12
    ctx.fillStyle = '#1a1a1a'
    for (let y = 0; y < 80; y += checkSize) {
      for (let x = 0; x < canvas.width; x += checkSize) {
        if ((x / checkSize + y / checkSize) % 2 === 0) {
          ctx.fillRect(x, y, checkSize, checkSize)
        }
      }
    }
    
    // Red banner "THEATER ONE"
    ctx.fillStyle = '#8b1a1a'
    ctx.fillRect(0, 80, canvas.width, 70)
    
    // Border emas pada banner
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 80, canvas.width, 70)
    
    // Text "THEATER ONE"
    ctx.fillStyle = '#e8d7b5'
    ctx.font = 'bold 38px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '4px'
    ctx.fillText('THEATER ONE', canvas.width / 2, 125)
    
    // Dekorasi sudut kiri
    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(40, 80)
    ctx.lineTo(20, 100)
    ctx.closePath()
    ctx.fill()
    
    // Dekorasi sudut kanan  
    ctx.beginPath()
    ctx.moveTo(canvas.width - 20, 80)
    ctx.lineTo(canvas.width - 40, 80)
    ctx.lineTo(canvas.width - 20, 100)
    ctx.closePath()
    ctx.fill()
    
    // Posisi untuk 2 foto dengan frame polaroid
    const positions = [
      { x: 60, y: 180, width: 420, height: 520 },
      { x: 60, y: 740, width: 420, height: 520 }
    ]
    
    // Gambar frame foto seperti polaroid
    positions.forEach((pos) => {
      // White polaroid frame
      ctx.fillStyle = '#f5f5f5'
      ctx.fillRect(pos.x - 20, pos.y - 20, pos.width + 40, pos.height + 60)
      
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(pos.x - 18, pos.y - 18, pos.width + 36, pos.height + 56)
      
      // White frame inner
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(pos.x - 16, pos.y - 16, pos.width + 32, pos.height + 52)
      
      // Photo area (abu-abu)
      ctx.fillStyle = '#2a2a2a'
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height)
    })
    
    // Garis putus-putus (perforated line)
    ctx.strokeStyle = '#444444'
    ctx.lineWidth = 2
    ctx.setLineDash([8, 8])
    ctx.beginPath()
    ctx.moveTo(30, 1290)
    ctx.lineTo(canvas.width - 30, 1290)
    ctx.stroke()
    ctx.setLineDash([])
    
    // Info tiket section
    const infoY = 1310
    
    // ROW & SEAT
    ctx.fillStyle = '#a0a0a0'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'left'
    ctx.fillText('ROW : 06', 40, infoY + 20)
    
    ctx.textAlign = 'right'
    ctx.fillText('SEAT :09', canvas.width - 40, infoY + 20)
    
    // Garis pemisah
    ctx.strokeStyle = '#444444'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(40, infoY + 35)
    ctx.lineTo(canvas.width - 40, infoY + 35)
    ctx.stroke()
    
    // VOYAGE PARK & TIME
    ctx.fillStyle = '#c0c0c0'
    ctx.font = 'bold 22px Georgia'
    ctx.textAlign = 'left'
    ctx.fillText('VOYAGE PARK', 40, infoY + 60)
    
    ctx.textAlign = 'right'
    ctx.fillText('13.00 PM', canvas.width - 40, infoY + 60)
    
    // Date
    const today = new Date()
    const dateOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }
    const dateStr = today.toLocaleDateString('en-US', dateOptions).toUpperCase()
    
    ctx.fillStyle = '#d4af37'
    ctx.font = '18px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(dateStr, canvas.width / 2, infoY + 90)
    
    // Red banner bawah "MEMORY TICKET"
    ctx.fillStyle = '#8b1a1a'
    ctx.fillRect(0, 1410, canvas.width, 70)
    
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 1410, canvas.width, 70)
    
    // Text "MEMORY TICKET"
    ctx.fillStyle = '#e8d7b5'
    ctx.font = 'bold 34px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '3px'
    ctx.fillText('MEMORY TICKET', canvas.width / 2, 1455)
    
    // Barcode simulation di bawah
    ctx.fillStyle = '#ffffff'
    ctx.font = '10px Courier'
    ctx.fillText('||||| ||||| ||||| |||||', canvas.width / 2, 1500)
    
    const dataUrl = canvas.toDataURL('image/png')
    resolve({ dataUrl, positions })
  })
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
