import { useState, useRef, useEffect } from 'react'
import { generateTemplatePreview } from '../utils/generatePreview'
import './KameraView.css'

function KameraView({ template, onSelesai }) {
  const [daftarFoto, setDaftarFoto] = useState([])
  const [sedangAmbilFoto, setSedangAmbilFoto] = useState(false)
  const [hitunganMundur, setHitunganMundur] = useState(null)
  const [kameraAktif, setKameraAktif] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [previewTemplate, setPreviewTemplate] = useState(null)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const jumlahFoto = template.jumlahFoto

  // Update preview saat foto berubah
  useEffect(() => {
    if (daftarFoto.length > 0) {
      console.log('Updating preview with', daftarFoto.length, 'photos')
      console.log('Template:', template.nama, 'Style:', template.style)
      updatePreview()
    }
  }, [daftarFoto])

  const updatePreview = async () => {
    try {
      console.log('Generating preview for template:', template.nama)
      const previewUrl = await generateTemplatePreview(daftarFoto, template)
      console.log('Preview generated successfully')
      setPreviewTemplate(previewUrl)
    } catch (error) {
      console.error('Error generating preview:', error)
    }
  }

  // Aktifkan kamera saat komponen dimuat
  useEffect(() => {
    aktifkanKamera()
    
    // Matikan kamera saat komponen di-unmount
    return () => {
      matikanKamera()
    }
  }, [])

  const aktifkanKamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setKameraAktif(true)
        setErrorMessage('')
      }
    } catch (error) {
      console.error('Error mengakses kamera:', error)
      setErrorMessage('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.')
    }
  }

  const matikanKamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setKameraAktif(false)
  }

  const ambilFoto = () => {
    if (sedangAmbilFoto || daftarFoto.length >= jumlahFoto) return
    
    setSedangAmbilFoto(true)
    setHitunganMundur(3)
    
    // Hitung mundur 3, 2, 1
    let hitung = 3
    const interval = setInterval(() => {
      hitung--
      if (hitung > 0) {
        setHitunganMundur(hitung)
      } else {
        clearInterval(interval)
        setHitunganMundur(null)
        tangkapFoto()
      }
    }, 1000)
  }

  const tangkapFoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    
    if (video && canvas) {
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Gambar video ke canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Konversi canvas ke data URL
      const dataURL = canvas.toDataURL('image/jpeg', 0.95)
      
      // Tambahkan foto ke daftar
      const fotoTerbaru = [...daftarFoto, dataURL]
      setDaftarFoto(fotoTerbaru)
      
      // Flash effect
      const flash = document.querySelector('.flash-effect')
      if (flash) {
        flash.style.opacity = '1'
        setTimeout(() => {
          flash.style.opacity = '0'
        }, 200)
      }
      
      setSedangAmbilFoto(false)
      
      // Jika sudah selesai semua foto
      if (fotoTerbaru.length >= jumlahFoto) {
        setTimeout(() => {
          matikanKamera()
          onSelesai(fotoTerbaru)
        }, 500)
      }
    }
  }

  const hapusFotoTerakhir = () => {
    if (daftarFoto.length > 0) {
      const fotoUpdate = [...daftarFoto]
      fotoUpdate.pop()
      setDaftarFoto(fotoUpdate)
    }
  }

  return (
    <div className="kamera-view">
      <div className="konten-kamera">
        <h2>
          Foto {daftarFoto.length + 1} dari {jumlahFoto}
        </h2>
        
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
            <button className="tombol tombol-sekunder" onClick={aktifkanKamera}>
              Coba Lagi
            </button>
          </div>
        )}

        <div className="layout-container">
          {/* Bagian Kamera - Kiri */}
          <div className="kamera-section">
            <div className="area-kamera">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className={kameraAktif ? 'video-aktif' : 'video-nonaktif'}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <div className="flash-effect"></div>
              
              {hitunganMundur && (
                <div className="hitung-mundur">
                  {hitunganMundur}
                </div>
              )}
              
              {daftarFoto.length > 0 && (
                <div className="preview-foto-kecil">
                  {daftarFoto.map((foto, index) => (
                    <img 
                      key={index} 
                      src={foto} 
                      alt={`Foto ${index + 1}`}
                      className="thumbnail"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="kontrol-kamera">
              {daftarFoto.length < jumlahFoto && kameraAktif && (
                <>
                  <button 
                    className="tombol tombol-utama tombol-foto"
                    onClick={ambilFoto}
                    disabled={sedangAmbilFoto}
                  >
                    {sedangAmbilFoto ? 'Bersiap...' : 'Ambil Foto'}
                  </button>
                  
                  {daftarFoto.length > 0 && (
                    <button 
                      className="tombol tombol-sekunder"
                      onClick={hapusFotoTerakhir}
                    >
                      Hapus Terakhir
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(daftarFoto.length / jumlahFoto) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Bagian Preview Template - Kanan */}
          <div className="preview-section">
            <div className="preview-header">
              <h3>Preview Hasil</h3>
              <p>Lihat bagaimana foto Anda di template</p>
            </div>
            
            <div className="preview-template-container">
              {previewTemplate ? (
                <img 
                  src={previewTemplate} 
                  alt="Preview Template" 
                  className="preview-template-image"
                  onError={(e) => {
                    console.error('Error loading preview image')
                    e.target.style.display = 'none'
                  }}
                />
              ) : (
                <div className="preview-placeholder">
                  <div className="preview-placeholder-icon">📸</div>
                  <p>
                    {daftarFoto.length === 0 
                      ? 'Preview akan muncul\nsetelah foto pertama diambil' 
                      : 'Memproses preview...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KameraView
