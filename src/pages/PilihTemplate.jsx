import { useState, useEffect } from 'react'
import { getTemplatesWithImages } from '../data/templates'
import './PilihTemplate.css'

function PilihTemplate({ onPilih }) {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadTemplates = async () => {
      const templatesWithImages = await getTemplatesWithImages()
      setTemplates(templatesWithImages)
      setLoading(false)
    }
    loadTemplates()
  }, [])
  
  if (loading) {
    return (
      <div className="pilih-template">
        <div className="konten-template">
          <h1>Memuat Template...</h1>
        </div>
      </div>
    )
  }
  
  return (
    <div className="pilih-template">
      <div className="konten-template">
        <h1>Pilih Template Foto</h1>
        <p>Pilih desain frame yang Anda suka</p>
        
        <div className="template-grid">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="kartu-template" 
              onClick={() => onPilih(template)}
            >
              <div className="katalog-preview">
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
    </div>
  )
}

export default PilihTemplate
