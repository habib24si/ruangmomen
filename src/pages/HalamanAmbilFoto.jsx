import { useState, useRef, useEffect } from 'react';
import './HalamanAmbilFoto.css';
import KameraView from '../components/KameraView';
import PreviewFoto from '../components/PreviewFoto';

function HalamanAmbilFoto({ jumlahFoto, onSelesai, onKembali }) {
  // State untuk menyimpan foto-foto yang sudah diambil
  const [daftarFoto, setDaftarFoto] = useState([]);
  
  // State untuk tracking foto ke berapa sekarang
  const fotoKeberapa = daftarFoto.length + 1;
  
  // State untuk menampilkan countdown sebelum foto diambil
  const [countdown, setCountdown] = useState(null);
  
  // State untuk menampilkan preview setelah foto diambil
  const [fotoBaru, setFotoBaru] = useState(null);

  // Fungsi untuk memulai countdown
  const mulaiAmbilFoto = () => {
    setCountdown(3);
  };

  // Effect untuk countdown
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown selesai, ambil foto
      ambilFoto();
    }
  }, [countdown]);

  // Fungsi untuk mengambil foto dari kamera
  const ambilFoto = () => {
    // Akan dihandle oleh KameraView component
    setCountdown(null);
  };

  // Callback ketika foto berhasil diambil dari kamera
  const handleFotoDiambil = (fotoDataUrl) => {
    setFotoBaru(fotoDataUrl);
  };

  // Fungsi untuk menyimpan foto dan lanjut ke foto berikutnya
  const simpanFoto = () => {
    const daftarBaruFoto = [...daftarFoto, fotoBaru];
    setDaftarFoto(daftarBaruFoto);
    setFotoBaru(null);

    // Cek apakah sudah semua foto diambil
    if (daftarBaruFoto.length >= jumlahFoto) {
      onSelesai(daftarBaruFoto);
    }
  };

  // Fungsi untuk mengambil ulang foto
  const ulangiAmbilFoto = () => {
    setFotoBaru(null);
  };

  const sudahSelesai = daftarFoto.length >= jumlahFoto;

  return (
    <div className="page-container halaman-ambil-foto">
      <div className="page-header">
        <h1>Ambil Foto {fotoKeberapa} dari {jumlahFoto}</h1>
        <p>Bersiaplah untuk berfoto! 📸</p>
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(daftarFoto.length / jumlahFoto) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">{daftarFoto.length} / {jumlahFoto} foto</p>
      </div>

      {/* Tampilan kamera atau preview foto */}
      <div className="kamera-container">
        {fotoBaru ? (
          // Tampilkan preview foto yang baru diambil
          <PreviewFoto 
            fotoUrl={fotoBaru}
            onSimpan={simpanFoto}
            onUlangi={ulangiAmbilFoto}
          />
        ) : (
          // Tampilkan kamera untuk ambil foto
          <KameraView 
            onFotoDiambil={handleFotoDiambil}
            countdown={countdown}
          />
        )}
      </div>

      {/* Tombol kontrol */}
      <div className="kontrol-container">
        {!fotoBaru && !countdown && (
          <>
            <button className="btn btn-secondary" onClick={onKembali}>
              Kembali
            </button>
            <button 
              className="btn btn-success btn-besar" 
              onClick={mulaiAmbilFoto}
            >
              📸 Ambil Foto
            </button>
          </>
        )}
      </div>

      {/* Thumbnail foto-foto yang sudah diambil */}
      {daftarFoto.length > 0 && (
        <div className="thumbnail-container">
          <h3>Foto yang sudah diambil:</h3>
          <div className="thumbnail-grid">
            {daftarFoto.map((foto, index) => (
              <div key={index} className="thumbnail-item">
                <img src={foto} alt={`Foto ${index + 1}`} />
                <span className="thumbnail-label">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HalamanAmbilFoto;
