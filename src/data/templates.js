// Import semua template dari folder templates
import { allTemplates } from '../templates/index'

// Cache untuk menyimpan data template yang sudah di-generate
const templateCache = new Map()

// Generate template jika belum ada di cache
const getGeneratedTemplate = async (templateConfig) => {
  const cacheKey = templateConfig.id
  
  if (!templateCache.has(cacheKey)) {
    const generatedData = await templateConfig.generator()
    templateCache.set(cacheKey, generatedData)
  }
  
  return templateCache.get(cacheKey)
}

// Inisialisasi semua template
const initAllTemplates = async () => {
  const promises = allTemplates.map(config => getGeneratedTemplate(config))
  await Promise.all(promises)
}

// Call initialization
initAllTemplates()

// Export templates dengan struktur yang sama seperti sebelumnya
export const templates = allTemplates.map(config => ({
  id: config.id,
  nama: config.nama,
  deskripsi: config.deskripsi,
  jumlahFoto: config.jumlahFoto,
  image: null,
  thumbnail: null,
  isDefault: config.isDefault,
  style: config.style,
  generator: config.generator
}))

// Get template with generated images
export const getTemplatesWithImages = async () => {
  await initAllTemplates()
  
  return Promise.all(
    allTemplates.map(async (templateConfig) => {
      const generatedData = await getGeneratedTemplate(templateConfig)
      
      return {
        id: templateConfig.id,
        nama: templateConfig.nama,
        deskripsi: templateConfig.deskripsi,
        jumlahFoto: templateConfig.jumlahFoto,
        image: generatedData.dataUrl,
        thumbnail: generatedData.dataUrl,
        isDefault: templateConfig.isDefault,
        style: templateConfig.style,
        fotoPositions: generatedData.positions,
        overlay: generatedData.overlay || null
      }
    })
  )
}

// Fungsi helper untuk mendapatkan template berdasarkan ID
export const getTemplateById = (id) => {
  return templates.find(template => template.id === id)
}
