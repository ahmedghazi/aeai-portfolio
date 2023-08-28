import project from './documents/project'
import tag from './documents/tag'
import home from './singletons/home'
import settings from './singletons/settings'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
// import linkIcon from './objects/linkIcon'
import seo from './objects/seo'
import keyVal from './objects/keyVal'

export const schemaTypes = [
  home,
  settings,
  project,
  tag,

  blockContent,
  linkExternal,
  linkInternal,

  seo,
  keyVal,
]
export default schemaTypes
