import {defineField} from 'sanity'
import {BiImages} from 'react-icons/bi'

export default defineField({
  name: 'moduleImages',
  title: 'Images mosaic',
  type: 'object',
  icon: BiImages,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'moduleImage',
        },
      ],
    }),
  ],

  preview: {
    select: {
      image: 'images.0',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Images',
        media: image,
      }
    },
  },
})
