import {createClient} from '@sanity/client'
// import {apiVersion, dataset, projectId, useCdn} from './sanity.api'

export const sanityConfig = {
  projectId: 'lkqsx233',
  dataset: 'production',
}

export const client = createClient({
  projectId: 'lkqsx233',
  dataset: 'production',
})
