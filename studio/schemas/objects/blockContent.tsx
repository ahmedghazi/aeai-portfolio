import {defineType, defineArrayMember} from 'sanity'
// import { FiExternalLink, LinkIcon } from 'react-icons/fi'
import {LinkIcon} from '@sanity/icons'
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
const TextL = (props: any): JSX.Element => (
  <p style={{fontSize: '2rem', marginTop: 0}}> {props.children} </p>
)
// const TextXL = (props: any): JSX.Element => (
//   <p style={{fontSize: '3rem', marginTop: 0}}> {props.children} </p>
// )

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Titre H2', value: 'h2'},
        {title: 'Titre H3', value: 'h3'},
        // {title: 'H4', value: 'h4'},
        // {title: 'Quote', value: 'blockquote'},
        {
          title: 'Texte L',
          value: 'text-lg',
          component: TextL,
        },
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Internal link',
            name: 'linkInternal',
            type: 'object',
            icon: LinkIcon,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                weak: true,
                title: 'Reference',
                to: [{type: 'project'}, {type: 'home'}],
              },
            ],
          },
          {
            title: 'External link',
            name: 'linkExternal',
            type: 'object',
            icon: LinkIcon,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'string',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
