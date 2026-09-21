import { useState, useEffect } from 'react'
import { getTemplatesWithImages } from '../data/templates'
import './PilihTemplate.css'

function PilihTemplate({ onPilih }) {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [templateDipilih, setTemplateDipilih] = useState(null)
  
  useEffect(() => {
    const loadTemplates = async () => {
      const templatesWithImages = await getTemplatesWithImages()
      setTemplates(templatesWithImages)
      setLoading(false)
    }
    loadTemplates()
  }, [])

  //>Mainkan animasi kilat dulu, lalu baru masuk kamera
  useEffect(() => {
    if (!templateDipilih) return
    const t = setTimeout(() => onPilih(templateDipilih), 1500)
    return () => clearTimeout(t)
  }, [templateDipilih, onPilih])

  const klikTemplate = (template) => {
    if (!templateDipilih) setTemplateDipilih(template)
  }
  
  if (loading) {
    return (
      <div className="pilih-template">
        <div className="konten-template">
          <p className="katalog-eyebrow">Ruang Momen Studio</p>
          <h1>Memuat Template...</h1>
          <div className="katalog-spinner"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="pilih-template">
      <div className="konten-template">
        <p className="katalog-eyebrow">Langkah 01 · Katalog Frame</p>
        <h1>Pilih Template Foto</h1>
        <p>Pilih desain frame yang Anda suka</p>
        
        <div className="template-grid">
          {templates.map((template, index) => (
            <div 
              key={template.id} 
              className="kartu-template" 
              onClick={() => klikTemplate(template)}
            >
              <div className="katalog-preview">
                <span className="nomor-template">{String(index + 1).padStart(2, '0')}</span>
                <img 
                  src={template.thumbnail} 
                  alt={template.nama}
                />
              </div>
              <div className="info-template">
                <h3>{template.nama}</h3>
                <p>{template.deskripsi}</p>
                <span className="badge-foto">{template.jumlahFoto} Foto</span>
              </div>
              <button className="tombol tombol-utama">Pilih Template</button>
            </div>
          ))}
        </div>
      </div>

      {/* Animasi "kilat studio" saat template dipilih */}
      {templateDipilih && (
        <div className="kilat-overlay">
          <div className="kilat-flash" />
          <div className="kilat-ring" />
          <div className="kilat-ring ring-2" />
          <div className="kilat-ring ring-3" />
          <div className="kilat-partikel">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                style={{
                  '--sudut': `${i * 18}deg`,
                  '--tunda': `${(i % 5) * 0.09}s`
                }}
              >
                {['✦', '♥', '✧', '★'][i % 4]}
              </span>
            ))}
          </div>
          <div className="kilat-kartu">
            <img src={templateDipilih.thumbnail} alt={templateDipilih.nama} />
          </div>
          <p className="kilat-nama">{templateDipilih.nama}</p>
          <p className="kilat-sub">getting ready ...</p>
        </div>
      )}
    </div>
  )
}

export default PilihTemplate
