import {defineField, defineArrayMember, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'
// import modulesList from '../objects/modules/modulesList'
// import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  type: 'document',
  name: 'project',
  title: 'Project',
  icon: FolderIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL basée sur le titre (sans espace ni caractère autre que a-z-0-9',
      options: {
        source: `title`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'year',
      type: 'string',
      title: 'year',
      group: 'editorial',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'url',
      group: 'editorial',
    }),

    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'tag'}],
        },
      ],
      group: 'editorial',
    }),

    defineField({
      name: 'imageCover',
      type: 'image',
      title: 'Image clef',
      description: 'Visible on liste pages, project cards',
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      title: `title`,
      slug: 'slug',
      image: 'imageCover',
    },
    prepare(selection) {
      const {title, slug, image} = selection
      // console.log(images)
      return {
        title: title,
        subtitle: `/project/${slug.current}`,
        // media: image,
      }
    },
  },
})
