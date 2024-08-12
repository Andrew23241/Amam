export default {
  name: 'person',
  type: 'document',
  title: 'Members of this project',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Images',
    },
    {
      name: 'intro',
      type: 'string',
      title: 'Intrduction',
    },
  ],
}
