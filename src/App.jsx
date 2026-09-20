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

  // Fungsi untuk pindah halaman
  const mulaiAplikasi = () => {
    setHalaman('pilihTemplate')
  }

  const pilihTemplate = (template) => {
    setTemplateTerpilih(template)
    setDaftarFoto([])
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
  }

  const ulangiPengambilan = () => {
    setHalaman('pilihTemplate')
    setTemplateTerpilih(null)
    setDaftarFoto([])
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
        />
      )}

      {halaman === 'hasil' && (
        <HasilFoto 
          daftarFoto={daftarFoto}
          template={templateTerpilih}
          onKembali={kembaliKeAwal}
          onUlangi={ulangiPengambilan}
        />
      )}
    </div>
  )
}

export default App
