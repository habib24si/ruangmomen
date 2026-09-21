import { useRef, useState, useEffect } from 'react'
import { generateTemplatePreview } from '../utils/generatePreview'
import { drawImageCoverMode } from '../utils/imageHelper'
import './HasilFoto.css'

function HasilFoto({ daftarFoto, template, onKembali, onUlangi, onUlangiSatuFoto }) {
  const canvasRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('original')
  const [filteredPhotos, setFilteredPhotos] = useState(daftarFoto)
  const [showPhotoSelector, setShowPhotoSelector] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  // Daftar filter yang tersedia
  const filters = [
    { id: 'original', name: 'Original', filter: 'none' },
    { id: 'grayscale', name: 'Black & White', filter: 'grayscale(100%)' },
    { id: 'sepia', name: 'Sepia', filter: 'sepia(100%)' },
    { id: 'vintage', name: 'Vintage', filter: 'sepia(50%) contrast(1.1) brightness(0.95)' },
    { id: 'warm', name: 'Warm', filter: 'saturate(1.3) hue-rotate(-10deg) brightness(1.05)' },
    { id: 'cool', name: 'Cool', filter: 'saturate(1.2) hue-rotate(10deg) brightness(0.95)' },
    { id: 'bright', name: 'Bright', filter: 'brightness(1.15) contrast(1.05)' },
    { id: 'contrast', name: 'High Contrast', filter: 'contrast(1.3) saturate(1.1)' },
    { id: 'fade', name: 'Faded', filter: 'contrast(0.85) brightness(1.1) saturate(0.9)' }
  ]

  // Generate preview saat komponen dimuat atau filter berubah
  useEffect(() => {
    generatePreview()
  }, [filteredPhotos])

  // Apply filter ke foto
  const applyFilter = async (filterId) => {
    setSelectedFilter(filterId)
    const filter = filters.find(f => f.id === filterId)
    
    if (filterId === 'original') {
      setFilteredPhotos(daftarFoto)
      return
    }

    setIsGenerating(true)
    
    // Apply CSS filter ke setiap foto
    const newFilteredPhotos = await Promise.all(
      daftarFoto.map(photoSrc => applyFilterToImage(photoSrc, filter.filter))
    )
    
    setFilteredPhotos(newFilteredPhotos)
  }

  const applyFilterToImage = (imageSrc, filterCSS) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        canvas.width = img.width
        canvas.height = img.height
        
        // Apply CSS filter
        ctx.filter = filterCSS
        ctx.drawImage(img, 0, 0)
        ctx.filter = 'none'
        
        resolve(canvas.toDataURL('image/jpeg', 0.95))
      }
      img.src = imageSrc
    })
  }

  const generatePreview = async () => {
    try {
      setIsGenerating(true)
      console.log('Generating final preview...')
      
      // Generate preview dengan scale lebih besar untuk tampilan (50%)
      const preview = await generateFinalPreview(filteredPhotos, template, 0.5)
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
                  (pos.radius || 0) * scale,
                  pos.rotation || 0
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
      const promises = filteredPhotos.map((fotoSrc, index) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            const pos = template.fotoPositions[index]
            if (pos) {
              // Gunakan cover mode agar foto tidak terdistorsi
              drawImageCoverMode(ctx, img, pos.x, pos.y, pos.width, pos.height, pos.radius || 0, pos.rotation || 0)
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

        {/* Photo Selector untuk Ulangi Foto Tertentu */}
        {showPhotoSelector && (
          <div className="photo-selector-panel">
            <h3>Pilih Foto yang Ingin Diulang</h3>
            <p>Klik foto yang ingin Anda ambil ulang</p>
            <div className="photo-selector-grid">
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className={`photo-selector-item ${selectedPhotoIndex === index ? 'selected' : ''}`}
                  onClick={() => setSelectedPhotoIndex(index)}
                >
                  <img src={photo} alt={`Foto ${index + 1}`} />
                  <div className="photo-selector-overlay">
                    <span className="photo-number">Foto {index + 1}</span>
                    {selectedPhotoIndex === index && <span className="check-mark">✓</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="photo-selector-actions">
              <button 
                className="tombol tombol-utama" 
                onClick={() => onUlangiSatuFoto(selectedPhotoIndex)}
                disabled={selectedPhotoIndex === null}
              >
                Ulang Foto Ini
              </button>
              <button 
                className="tombol tombol-sekunder" 
                onClick={() => setShowPhotoSelector(false)}
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Filter Panel */}
        <div className="filter-section">
          <button 
            className="tombol tombol-filter" 
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            {showFilterPanel ? '✕ Tutup Filter' : '🎨 Edit & Filter'}
          </button>

          {showFilterPanel && (
            <div className="filter-panel">
              <h3>Pilih Filter</h3>
              <div className="filter-grid">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    className={`filter-option ${selectedFilter === filter.id ? 'active' : ''}`}
                    onClick={() => applyFilter(filter.id)}
                  >
                    <div 
                      className="filter-preview" 
                      style={{ filter: filter.filter }}
                    >
                      <div className="filter-demo-box"></div>
                    </div>
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="tombol-group">
          <button className="tombol tombol-utama" onClick={downloadFoto}>
            📥 Download Foto
          </button>
          <button 
            className="tombol tombol-info" 
            onClick={() => setShowPhotoSelector(!showPhotoSelector)}
          >
            🔄 Ulang Foto Tertentu
          </button>
          <button className="tombol tombol-sekunder" onClick={onUlangi}>
            📷 Ambil Lagi Semua
          </button>
          <button className="tombol tombol-sekunder" onClick={onKembali}>
            🏠 Kembali
          </button>
        </div>
      </div>
    </div>
  )
}

export default HasilFoto
