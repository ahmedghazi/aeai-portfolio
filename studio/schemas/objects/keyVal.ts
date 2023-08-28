// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'

export default defineField({
  name: 'keyVal',
  title: 'Clef Valeur',
  type: 'object',
  fields: [
    defineField({
      name: 'accr',
      type: 'string',
      title: 'Accr',
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
    }),
    defineField({
      name: 'url',
      type: 'string',
      title: 'Url',
    }),
  ],
})
