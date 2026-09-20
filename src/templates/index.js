// Template Registry - Central file untuk import semua template
import { HSATemplateConfig } from './HSATemplate'
import { ModernTemplateConfig } from './ModernTemplate'
import { VintageTemplateConfig } from './VintageTemplate'
import { ColorfulTemplateConfig } from './ColorfulTemplate'
import { ElegantTemplateConfig } from './ElegantTemplate'
import { FilmStripTemplateConfig } from './FilmStripTemplate'
import { ArchiveMemoryTemplateConfig } from './ArchiveMemoryTemplate'

// Export array of all templates
export const allTemplates = [
  HSATemplateConfig,
  ModernTemplateConfig,
  VintageTemplateConfig,
  ColorfulTemplateConfig,
  ElegantTemplateConfig,
  FilmStripTemplateConfig,
  ArchiveMemoryTemplateConfig
]

// Export individual templates untuk import langsung jika diperlukan
export { HSATemplateConfig } from './HSATemplate'
export { ModernTemplateConfig } from './ModernTemplate'
export { VintageTemplateConfig } from './VintageTemplate'
export { ColorfulTemplateConfig } from './ColorfulTemplate'
export { ElegantTemplateConfig } from './ElegantTemplate'
export { FilmStripTemplateConfig } from './FilmStripTemplate'
export { ArchiveMemoryTemplateConfig } from './ArchiveMemoryTemplate'
