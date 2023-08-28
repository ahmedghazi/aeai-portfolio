import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'

export default defineField({
  name: 'moduleImage',
  title: 'Image',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        // {name: 'title', title: 'Title', type: 'string'},
        {name: 'alt', title: 'Alt Description', type: 'string'},
        // {name: 'attribution', title: 'Attribution', type: 'string'}
      ],
    }),
    // defineField({
    //   type: 'number',
    //   name: 'width',
    //   title: 'width',
    //   description: 'Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com',
    //   initialValue: 12,
    //   validation: (Rule) => Rule.required().min(1).max(12).warning('from 1 to 12'),
    // }),
    // defineField({
    //   type: 'number',
    //   name: 'offset',
    //   title: 'Offset',
    //   description: 'Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com',
    //   initialValue: 0,
    //   validation: (Rule) => Rule.required().min(0).max(12).warning('from 1 to 12'),
    // }),
    // defineField({
    //   name: 'caption',
    //   type: 'localeBlockContent',
    //   title: 'Image caption',
    // }),
  ],

  preview: {
    select: {
      image: 'image',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Image',
        media: image,
      }
    },
  },
})
