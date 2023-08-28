import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './src/deskStructure'
import {media} from 'sanity-plugin-media'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'

export default defineConfig({
  name: 'default',
  title: 'aeai-portfolio',

  projectId: 'lkqsx233',
  dataset: 'production',

  // plugins: [deskTool(), visionTool()],

  plugins: [deskTool({structure: structure}), media(), visionTool()],
  document: {
    // productionUrl: resolveProductionUrl,
    actions: [resolveProductionUrl],
  },

  schema: {
    types: schemaTypes,
  },
})
