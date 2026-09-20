import './HalamanAwal.css'

function HalamanAwal({ onMulai }) {
  return (
    <div className="halaman-awal">
      <div className="konten-awal">
        <div className="icon-kamera">
          📷
        </div>
        <h1>
          Selamat Datang di <span className="brand-nama">RuangMomen</span>
        </h1>
        <p>Ambil foto dengan mudah dan cepat!</p>
        <p className="deskripsi">
          Pilih template yang Anda suka, ambil foto, dan download hasilnya langsung ke perangkat Anda.
        </p>
        <button className="tombol tombol-utama" onClick={onMulai}>
          Mulai Sekarang
        </button>
      </div>
    </div>
  )
}

export default HalamanAwal
