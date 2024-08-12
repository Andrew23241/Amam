export default {
  name: 'eventcategory',
  type: 'document',
  title: 'Project Category',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },

    {
      name: 'urlname',
      type: 'string',
      title: 'Url Name for this category',
      description: ' This should be english and no spaces and special charecters',
    },
  ],
}
