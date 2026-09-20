import './HalamanIntro.css';

function HalamanIntro({ onMulai }) {
  return (
    <div className="halaman-intro">
      <div className="intro-content">
        <div className="intro-icon">📸</div>
        <h1 className="intro-judul">Selamat Datang di Photobooth HSA</h1>
        <p className="intro-deskripsi">
          Abadikan momen spesial Anda dengan photobooth interaktif kami!
        </p>
        <div className="intro-fitur">
          <div className="fitur-item">
            <span className="fitur-icon">✨</span>
            <span>Pilih Template Foto</span>
          </div>
          <div className="fitur-item">
            <span className="fitur-icon">📷</span>
            <span>Ambil Foto dengan Kamera</span>
          </div>
          <div className="fitur-item">
            <span className="fitur-icon">💾</span>
            <span>Download Hasil Foto</span>
          </div>
        </div>
        <button className="btn btn-primary btn-mulai" onClick={onMulai}>
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}

export default HalamanIntro;
