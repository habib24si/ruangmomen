import { useState } from 'react'
import './App.css'
import HalamanAwal from './pages/HalamanAwal'
import PilihTemplate from './pages/PilihTemplate'
import KameraView from './pages/KameraView'
import HasilFoto from './pages/HasilFoto'

function App() {
  const [halaman, setHalaman] = useState('awal') // awal, pilihTemplate, kamera, hasil
  const [templateTerpilih, setTemplateTerpilih] = useState(null) // Menyimpan object template
  const [daftarFoto, setDaftarFoto] = useState([])
  const [indeksUlang, setIndeksUlang] = useState(null) // Index foto yang diulang (null = ambil semua baru)

  // Fungsi untuk pindah halaman
  const mulaiAplikasi = () => {
    setHalaman('pilihTemplate')
  }

  const pilihTemplate = (template) => {
    setTemplateTerpilih(template)
    setDaftarFoto([])
    setIndeksUlang(null)
    setHalaman('kamera')
  }

  const selesaiFoto = (foto) => {
    setDaftarFoto(foto)
    setHalaman('hasil')
  }

  const kembaliKeAwal = () => {
    setHalaman('awal')
    setTemplateTerpilih(null)
    setDaftarFoto([])
    setIndeksUlang(null)
  }

  const ulangiPengambilan = () => {
    setHalaman('pilihTemplate')
    setTemplateTerpilih(null)
    setDaftarFoto([])
    setIndeksUlang(null)
  }

  const ulangiSatuFoto = (index) => {
    // Kembali ke kamera khusus untuk mengulang foto ke-`index` saja
    setIndeksUlang(index)
    setHalaman('kamera')
  }

  return (
    <div className="app">
      {halaman === 'awal' && (
        <HalamanAwal onMulai={mulaiAplikasi} />
      )}

      {halaman === 'pilihTemplate' && (
        <PilihTemplate onPilih={pilihTemplate} />
      )}

      {halaman === 'kamera' && (
        <KameraView 
          template={templateTerpilih}
          onSelesai={selesaiFoto}
          fotoAwal={daftarFoto}
          ulangIndex={indeksUlang}
        />
      )}

      {halaman === 'hasil' && (
        <HasilFoto 
          daftarFoto={daftarFoto}
          template={templateTerpilih}
          onKembali={kembaliKeAwal}
          onUlangi={ulangiPengambilan}
          onUlangiSatuFoto={ulangiSatuFoto}
        />
      )}
    </div>
  )
}

export default App
