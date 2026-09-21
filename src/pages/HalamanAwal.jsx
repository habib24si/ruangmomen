import { useEffect, useState } from 'react'
import { getTemplatesWithImages } from '../data/templates'
import './HalamanAwal.css'
import logoRuangMomen from '../assets/logo/Logo Ruang Momen (1).png'

function HalamanAwal({ onMulai }) {
  const [previews, setPreviews] = useState([])
  const [animasiMulai, setAnimasiMulai] = useState(false)

  // Mainkan animasi diafragma kamera, lalu pindah halaman saat layar tertutup
  useEffect(() => {
    if (!animasiMulai) return
    const t = setTimeout(() => onMulai(), 1030)
    return () => clearTimeout(t)
  }, [animasiMulai, onMulai])

  const klikMulai = () => {
    if (!animasiMulai) setAnimasiMulai(true)
  }

  useEffect(() => {
    let aktif = true
    getTemplatesWithImages().then((list) => {
      if (aktif) {
        setPreviews(list.map((t) => t.thumbnail).filter(Boolean))
      }
    })
    return () => {
      aktif = false
    }
  }, [])

  // Duplikasi daftar agar animasi marquee mulus tanpa jeda
  const pitaAtas = [...previews, ...previews, ...previews, ...previews]
  const pitaBawah = [...previews.slice().reverse(), ...previews.slice().reverse(), ...previews.slice().reverse(), ...previews.slice().reverse()]

  return (
    <div className="halaman-awal">
      {/* Pita foto template bergerak - atas */}
      <div className="pita-foto pita-atas">
        <div className="pita-track track-kiri">
          {pitaAtas.map((src, i) => (
            <img key={`atas-${i}`} src={src} alt="" className="foto-pita" />
          ))}
        </div>
      </div>

      {/* Konten tengah */}
      <div className="pusat-awal">
        <div className="hero-awal">
          <div className="judul-aksen">
            <span className="judul-besar">RUANG</span>
            <span className="judul-besar judul-outline">MOMEN</span>
          </div>
          <button className="tombol-mulai-bulat" onClick={klikMulai}>
            MULAI
          </button>
        </div>
        <p className="tagline-awal">
          <span className="garis-tagline"></span>
          Satu klik · banyak momen
          <span className="garis-tagline"></span>
        </p>
      </div>

      {/* Pita foto template bergerak - bawah */}
      <div className="pita-foto pita-bawah">
        <div className="pita-track track-kanan">
          {pitaBawah.map((src, i) => (
            <img key={`bawah-${i}`} src={src} alt="" className="foto-pita" />
          ))}
        </div>
      </div>

      <div className="pojok-logo">
        <img src={logoRuangMomen} alt="Ruang Momen Logo" className="logo-sudut" />
        <span className="hak-cipta">©2026</span>
      </div>

      {/* Animasi diafragma kamera saat MULAI diklik */}
      {animasiMulai && (
        <div className="pintu-kamera">
          <div className="bilah-diafragma"></div>
          <div className="cincin-iris cincin-a"></div>
          <div className="cincin-iris cincin-b"></div>
          <div className="kilat-layar"></div>
          <p className="teks-pintu">
            <span>cahaya</span>
            <em>·</em>
            <span>lensa</span>
            <em>·</em>
            <span>momen</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default HalamanAwal
