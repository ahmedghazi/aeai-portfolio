import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeBlockContent',
  type: 'object',
  fieldsets: [
    {
      title: 'Traduction',
      name: 'translations',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'blockContent',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
