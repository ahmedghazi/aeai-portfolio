import {FiImage} from 'react-icons/fi'
import {baseLanguage} from '../locale/supportedLanguages'
import {defineField} from 'sanity'

export default defineField({
  name: 'section.figure',
  title: 'Figure',
  type: 'object',
  icon: FiImage,
  preview: {
    select: {
      media: 'image',
      title: `caption.${baseLanguage}`,
    },
    prepare(selection) {
      const {media, title} = selection
      return {
        title: title,
        media: media,
        subtitle: 'Figure',
      }
    },
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
})
