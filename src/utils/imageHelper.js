// Helper function untuk crop dan center image

// Buat path rounded rectangle (kompatibel di semua browser)
const buildRoundRectPath = (ctx, x, y, width, height, radius) => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2))
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

// Ekspos helper path agar bisa dipakai template untuk menggambar frame
export const roundRectPath = (ctx, x, y, width, height, radius) => {
  buildRoundRectPath(ctx, x, y, width, height, radius)
}

export const drawImageCoverMode = (ctx, img, x, y, width, height, radius = 0, rotation = 0) => {
  // Hitung aspect ratio
  const imgAspect = img.width / img.height
  const frameAspect = width / height
  
  let sourceX = 0
  let sourceY = 0
  let sourceWidth = img.width
  let sourceHeight = img.height
  
  // Crop image agar sesuai dengan frame (cover mode)
  if (imgAspect > frameAspect) {
    // Image lebih lebar, crop sisi kiri-kanan
    sourceWidth = img.height * frameAspect
    sourceX = (img.width - sourceWidth) / 2
  } else {
    // Image lebih tinggi, crop atas-bawah
    sourceHeight = img.width / frameAspect
    sourceY = (img.height - sourceHeight) / 2
  }
  
  // Simpan state, beri opsi clip rounded corner agar foto tidak kaku
  ctx.save()
  // Rotasi mengelilingi titik tengah area (untuk polaroid miring)
  if (rotation) {
    const cx = x + width / 2
    const cy = y + height / 2
    ctx.translate(cx, cy)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-cx, -cy)
  }
  if (radius > 0) {
    buildRoundRectPath(ctx, x, y, width, height, radius)
    ctx.clip()
  }
  
  // Draw image dengan crop
  ctx.drawImage(
    img,
    sourceX, sourceY, sourceWidth, sourceHeight, // Source (crop)
    x, y, width, height // Destination
  )
  
  ctx.restore()
}
