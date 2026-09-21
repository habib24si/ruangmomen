// Koran Retro Template
// Desain dibuat user (file PNG di src/assets/foto template/) — layout koran retro
// "Fenomena Kicau Mana". Template ini hanya menentukan letak 3 foto:
// 1 kotak besar di kiri kolom berita, 2 kotak kecil menumpuk di kolom kanan.
import koranRetroImg from '../assets/foto template/Template_photobooth_koran_retro-removebg-preview (1).png'

// Posisi slot relatif terhadap gambar desain (rasio 0-1), hasil pemindaian piksel border kotak
const SLOT_RELATIF = [
  { x: 0.048, y: 0.334, width: 0.544, height: 0.440 }, // kotak besar kiri (bawah 'DARI KAMU')
  { x: 0.630, y: 0.334, width: 0.316, height: 0.272 }, // kotak kecil kanan atas (bawah 'UNTUK KAMU')
  { x: 0.630, y: 0.642, width: 0.316, height: 0.302 }  // kotak kecil kanan bawah
]

export const generateKoranRetroTemplate = () => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Naikkan resolusi 2x dari asli (500 -> 1000) agar hasil download tajam
      const W = (canvas.width = 1000)
      const H = (canvas.height = 1000)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, W, H)

      const positions = SLOT_RELATIF.map((s) => ({
        x: Math.round(s.x * W),
        y: Math.round(s.y * H),
        width: Math.round(s.width * W),
        height: Math.round(s.height * H),
        radius: 0,
        rotation: 0
      }))

      resolve({ dataUrl: canvas.toDataURL('image/png'), positions })
    }

    img.onerror = () => reject(new Error('Gagal memuat gambar template koran retro'))
    img.src = koranRetroImg
  })
}

export const KoranRetroTemplateConfig = {
  id: 11,
  nama: 'Koran Retro',
  deskripsi: 'Layout koran retro Fenomena Kicau Mana, 3 foto siap tempel',
  jumlahFoto: 3,
  style: 'newspaper',
  isDefault: false,
  generator: generateKoranRetroTemplate
}
