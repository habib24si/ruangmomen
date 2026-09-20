import { useRef, useState, useEffect } from 'react'
import { generateTemplatePreview } from '../utils/generatePreview'
import { drawImageCoverMode } from '../utils/imageHelper'
import './HasilFoto.css'

function HasilFoto({ daftarFoto, template, onKembali, onUlangi }) {
  const canvasRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(true)

  // Generate preview saat komponen dimuat
  useEffect(() => {
    generatePreview()
  }, [])

  const generatePreview = async () => {
    try {
      setIsGenerating(true)
      console.log('Generating final preview...')
      
      // Generate preview dengan scale lebih besar untuk tampilan (50%)
      const preview = await generateFinalPreview(daftarFoto, template, 0.5)
      setPreviewImage(preview)
      setIsGenerating(false)
      console.log('Final preview generated')
    } catch (error) {
      console.error('Error generating preview:', error)
      setIsGenerating(false)
    }
  }

  const generateFinalPreview = (photos, template, scale = 0.5) => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const templateImg = new Image()
        
        templateImg.onload = () => {
          canvas.width = templateImg.width * scale
          canvas.height = templateImg.height * scale
          
          // Gambar template
          ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height)
          
          let loadedCount = 0
          
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
            if (loadedCount === photos.length) {
              drawOverlayAndResolve()
            }
          }
          
          // Load dan gambar foto dengan cover mode (tidak distorsi)
          photos.forEach((photoSrc, index) => {
            if (index < template.fotoPositions.length) {
              const pos = template.fotoPositions[index]
              const img = new Image()
              
              img.onload = () => {
                // Gunakan cover mode untuk crop dan center
                drawImageCoverMode(
                  ctx,
                  img,
                  pos.x * scale,
                  pos.y * scale,
                  pos.width * scale,
                  pos.height * scale,
                  (pos.radius || 0) * scale
                )
                checkAllLoaded()
              }
              
              img.onerror = () => checkAllLoaded()
              img.src = photoSrc
            }
          })
        }
        
        templateImg.onerror = () => reject(new Error('Failed to load template'))
        templateImg.src = template.image
      } catch (error) {
        reject(error)
      }
    })
  }

  const downloadFoto = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Load template image
    const templateImg = new Image()
    
    templateImg.onload = async () => {
      // Set canvas size sesuai template (full resolution)
      canvas.width = templateImg.width
      canvas.height = templateImg.height
      
      // Gambar template sebagai background
      ctx.drawImage(templateImg, 0, 0)
      
      // Load dan gambar semua foto sesuai posisi di template dengan cover mode
      const promises = daftarFoto.map((fotoSrc, index) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            const pos = template.fotoPositions[index]
            if (pos) {
              // Gunakan cover mode agar foto tidak terdistorsi
              drawImageCoverMode(ctx, img, pos.x, pos.y, pos.width, pos.height, pos.radius || 0)
            }
            resolve()
          }
          img.onerror = () => resolve()
          img.src = fotoSrc
        })
      })
      
      await Promise.all(promises)
      
      // Gambar overlay di DEPAN foto (jika ada)
      if (template.overlay) {
        await new Promise((res) => {
          const ov = new Image()
          ov.onload = () => {
            ctx.drawImage(ov, 0, 0, canvas.width, canvas.height)
            res()
          }
          ov.onerror = () => res()
          ov.src = template.overlay
        })
      }
      
      // Download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const timestamp = new Date().getTime()
        link.download = `photobooth-${template.nama.replace(/\s+/g, '-').toLowerCase()}-${timestamp}.jpg`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }, 'image/jpeg', 0.95)
    }
    
    templateImg.src = template.image
  }

  return (
    <div className="hasil-foto">
      <div className="konten-hasil">
        <h1>Hasil Foto</h1>
        <p>Preview dengan template <strong>{template.nama}</strong></p>
        
        {isGenerating ? (
          <div className="loading-preview">
            <div className="spinner"></div>
            <p>Memproses preview...</p>
          </div>
        ) : (
          <div className="preview-final-container">
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Preview Final" 
                className="preview-final-image"
              />
            )}
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="tombol-group">
          <button className="tombol tombol-utama" onClick={downloadFoto}>
            Download Foto
          </button>
          <button className="tombol tombol-sekunder" onClick={onUlangi}>
            Ambil Lagi
          </button>
          <button className="tombol tombol-sekunder" onClick={onKembali}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}

export default HasilFoto
