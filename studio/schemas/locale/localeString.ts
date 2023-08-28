import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeString',
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
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
