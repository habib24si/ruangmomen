// Universal preview generator untuk semua template
import { drawImageCoverMode } from './imageHelper'

export const generateTemplatePreview = (photos, template) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Ambil ukuran dari template positions
      const positions = template.fotoPositions
      if (!positions || positions.length === 0) {
        reject(new Error('Template positions not found'))
        return
      }
      
      // Hitung ukuran canvas dari template image asli
      // Untuk preview, kita scale down ke 25%
      const scale = 0.25
      
      // Load template image untuk mendapatkan ukuran
      const templateImg = new Image()
      
      templateImg.onload = () => {
        canvas.width = templateImg.width * scale
        canvas.height = templateImg.height * scale
        
        console.log(`Canvas size: ${canvas.width}x${canvas.height}`)
        
        // Gambar template sebagai background
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height)
        
        // Counter untuk tracking foto yang sudah di-load
        let loadedCount = 0
        const totalPhotos = photos.length
        
        const drawOverlayAndResolve = () => {
          const finish = () => resolve(canvas.toDataURL('image/png'))
          if (template.overlay) {
            const ov = new Image()
            ov.onload = () => {
              ctx.drawImage(ov, 0, 0, canvas.width, canvas.height)
              finish()
            }
            ov.onerror = finish
            ov.src = template.overlay
          } else {
            finish()
          }
        }

        const checkAllLoaded = () => {
          loadedCount++
          console.log(`Preview: Loaded ${loadedCount}/${totalPhotos} photos`)
          if (loadedCount === totalPhotos) {
            console.log('Preview generated successfully')
            drawOverlayAndResolve()
          }
        }
        
        // Jika tidak ada foto, langsung resolve dengan template kosong
        if (totalPhotos === 0) {
          console.log('No photos yet, showing empty template')
          drawOverlayAndResolve()
          return
        }
        
        // Load dan gambar setiap foto sesuai posisinya dengan cover mode
        photos.forEach((photoSrc, index) => {
          if (index < positions.length) {
            const pos = positions[index]
            const img = new Image()
            
            img.onload = () => {
              console.log(`Drawing photo ${index + 1} at position`, pos)
              // Gunakan cover mode agar tidak terdistorsi
              drawImageCoverMode(
                ctx,
                img,
                pos.x * scale,
                pos.y * scale,
                pos.width * scale,
                pos.height * scale,
                (pos.radius || 0) * scale,
                pos.rotation || 0
              )
              checkAllLoaded()
            }
            
            img.onerror = (error) => {
              console.error(`Error loading photo ${index + 1}:`, error)
              checkAllLoaded()
            }
            
            img.src = photoSrc
          } else {
            checkAllLoaded()
          }
        })
        
        // Timeout sebagai fallback
        setTimeout(() => {
          if (loadedCount < totalPhotos) {
            console.warn('Timeout waiting for images, generating preview anyway')
            drawOverlayAndResolve()
          }
        }, 3000)
      }
      
      templateImg.onerror = (error) => {
        console.error('Error loading template image:', error)
        reject(error)
      }
      
      // Load template image
      if (template.image) {
        templateImg.src = template.image
      } else {
        reject(new Error('Template image not found'))
      }
      
    } catch (error) {
      console.error('Error in generateTemplatePreview:', error)
      reject(error)
    }
  })
}
