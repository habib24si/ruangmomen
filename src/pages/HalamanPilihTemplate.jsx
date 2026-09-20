import './HalamanPilihTemplate.css';

function HalamanPilihTemplate({ onPilihTemplate }) {
  return (
    <div className="page-container halaman-pilih-template">
      <div className="page-header">
        <h1>Pilih Template Foto</h1>
        <p>Pilih jumlah foto yang ingin Anda ambil</p>
      </div>

      <div className="template-grid">
        {/* Template 3 Foto */}
        <div className="template-card" onClick={() => onPilihTemplate(3)}>
          <div className="template-preview template-3">
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
          </div>
          <h3 className="template-judul">Template 3 Foto</h3>
          <p className="template-deskripsi">Cocok untuk momen sederhana</p>
          <button className="btn btn-primary">Pilih Template</button>
        </div>

        {/* Template 6 Foto */}
        <div className="template-card" onClick={() => onPilihTemplate(6)}>
          <div className="template-preview template-6">
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
            <div className="foto-placeholder"></div>
          </div>
          <h3 className="template-judul">Template 6 Foto</h3>
          <p className="template-deskripsi">Lebih banyak ekspresi!</p>
          <button className="btn btn-primary">Pilih Template</button>
        </div>
      </div>
    </div>
  );
}

export default HalamanPilihTemplate;
