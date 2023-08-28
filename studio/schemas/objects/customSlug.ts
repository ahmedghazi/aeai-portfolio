import {defineField} from 'sanity'
import CustomSlugComponent from '../../src/components/CustomSlugComponent'
// import { BsInfoSquare } from 'react-icons/bs'

export default defineField({
  name: 'customSlug',
  title: 'Custom Slug ',
  type: 'object',
  // icon: BsInfoSquare,

  fields: [
    defineField({
      name: 'current',
      type: 'string',
      components: {
        input: CustomSlugComponent,
      },
    }),
  ],
})
