// import supportedLanguages from "../locale/supportedLanguages";
import {defineField} from 'sanity'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineField({
  title: 'Link Internal',
  name: 'linkInternal',
  type: 'object',
  preview: {
    select: {
      label: `label.${baseLanguage}`,
    },
    prepare(selection) {
      const {label} = selection
      return {
        title: label,
        // subtitle: "test",
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'reference',
      weak: true,
      to: [{type: 'home'}, {type: 'project'}],
    }),
  ],
})
