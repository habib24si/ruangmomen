import { useState, useRef, useEffect } from 'react'
import { generateTemplatePreview } from '../utils/generatePreview'
import './KameraView.css'

function KameraView({ template, onSelesai, fotoAwal = [], ulangIndex = null }) {
  // Mode ulang: hanya mengambil ulang 1 foto (indeks `ulangIndex`), foto lain tetap
  const modeUlang = ulangIndex !== null && ulangIndex !== undefined

  const [daftarFoto, setDaftarFoto] = useState(modeUlang ? fotoAwal : [])
  const [sedangAmbilFoto, setSedangAmbilFoto] = useState(false)
  const [hitunganMundur, setHitunganMundur] = useState(null)
  const [kameraAktif, setKameraAktif] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [facingMode, setFacingMode] = useState('user')
  const [sudahAmbilUlang, setSudahAmbilUlang] = useState(false)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const jumlahFoto = template.jumlahFoto

  // Rasio area kamera mengikuti rasio slot foto YANG SEDANG DiAMBIL (bukan hanya slot 1),
  // agar tiap foto sudah pas bentuknya sejak dari kamera & tidak ter-zoom saat dipasang ke slot
  const posisiSlot = template.fotoPositions || []
  const indexSaatIni = modeUlang
    ? ulangIndex
    : Math.min(daftarFoto.length, jumlahFoto - 1)
  const slotAktif = posisiSlot[indexSaatIni] || posisiSlot[0]
  const rasioSlot = slotAktif && slotAktif.height > 0
    ? slotAktif.width / slotAktif.height
    : 4 / 3

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

  const aktifkanKamera = async (mode) => {
    const fm = mode === 'environment' || mode === 'user' ? mode : facingMode
    try {
      // Hentikan stream lama jika masih ada
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: fm
        }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setFacingMode(fm)
        setKameraAktif(true)
        setErrorMessage('')
      }
    } catch (error) {
      console.error('Error mengakses kamera:', error)
      setErrorMessage('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.')
    }
  }

  const balikKamera = () => {
    const next = facingMode === 'user' ? 'environment' : 'user'
    aktifkanKamera(next)
  }

  const matikanKamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setKameraAktif(false)
  }

  const ambilFoto = () => {
    if (sedangAmbilFoto) return
    if (modeUlang ? sudahAmbilUlang : daftarFoto.length >= jumlahFoto) return
    
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
      const vw = video.videoWidth
      const vh = video.videoHeight

      // Potong tengah frame video sesuai rasio slot template
      let sw = vw
      let sh = vh
      if (vw / vh > rasioSlot) {
        sw = Math.round(vh * rasioSlot)
      } else {
        sh = Math.round(vw / rasioSlot)
      }
      const sx = Math.round((vw - sw) / 2)
      const sy = Math.round((vh - sh) / 2)

      canvas.width = sw
      canvas.height = sh

      // Foto selfie dicerminkan agar sesuai tampilan di layar
      if (facingMode === 'user') {
        context.translate(canvas.width, 0)
        context.scale(-1, 1)
      }

      // Gambar video ke canvas (sudah terpotong sesuai rasio)
      context.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh)
      context.setTransform(1, 0, 0, 1, 0, 0)
      
      // Konversi canvas ke data URL
      const dataURL = canvas.toDataURL('image/jpeg', 0.95)
      
      // Tambahkan/ganti foto sesuai mode
      const fotoTerbaru = modeUlang
        ? daftarFoto.map((foto, i) => (i === ulangIndex ? dataURL : foto))
        : [...daftarFoto, dataURL]
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
      
      // Mode ulang: langsung selesai setelah 1 foto pengganti diambil
      if (modeUlang) {
        setSudahAmbilUlang(true)
        setTimeout(() => {
          matikanKamera()
          onSelesai(fotoTerbaru)
        }, 800)
        return
      }
      
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
        <p className="kamera-eyebrow">Langkah 02 · Studio Foto</p>
        <h2>
          {modeUlang
            ? `Mengulang Foto ${ulangIndex + 1} dari ${jumlahFoto}`
            : `Foto ${daftarFoto.length + 1} dari ${jumlahFoto}`}
        </h2>
        {modeUlang && (
          <p className="petunjuk-ulang">
            Ambil satu foto baru untuk mengganti Foto {ulangIndex + 1}. Foto lainnya tetap.
          </p>
        )}
        
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
            <div className="area-kamera" style={{ '--rasio-slot': rasioSlot }}>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className={kameraAktif ? 'video-aktif' : 'video-nonaktif'}
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
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
              {kameraAktif && (
                <button
                  className="tombol tombol-sekunder tombol-balik"
                  onClick={balikKamera}
                  disabled={sedangAmbilFoto}
                  title={facingMode === 'user' ? 'Ganti ke kamera belakang' : 'Ganti ke kamera depan'}
                  aria-label="Balik kamera"
                >
                  🔄
                </button>
              )}
              {(modeUlang ? !sudahAmbilUlang : daftarFoto.length < jumlahFoto) && kameraAktif && (
                <>
                  <button 
                    className="tombol tombol-utama tombol-foto"
                    onClick={ambilFoto}
                    disabled={sedangAmbilFoto}
                  >
                    {sedangAmbilFoto ? 'Bersiap...' : modeUlang ? 'Ambil Foto Pengganti' : 'Ambil Foto'}
                  </button>
                  
                  {!modeUlang && daftarFoto.length > 0 && (
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
                style={{ width: `${(modeUlang ? (sudahAmbilUlang ? 1 : 0) : daftarFoto.length) / jumlahFoto * 100}%` }}
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
