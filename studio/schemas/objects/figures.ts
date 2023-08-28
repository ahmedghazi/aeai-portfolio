import {GrGallery} from 'react-icons/gr'
import {baseLanguage} from '../locale/supportedLanguages'
import {defineField} from 'sanity'

export default defineField({
  name: 'figures',
  title: 'Figures',
  type: 'object',
  icon: GrGallery,
  preview: {
    select: {
      media: 'images.0.image',
      title: `title.${baseLanguage}`,
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
      name: 'title',
      title: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Big', value: 'lg'},
        ],
      },
      // hidden: ({ document }) => {
      //   console.log(document);
      //   return document._type === "footer";
      // },
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'figure'}],
    }),
  ],
})
