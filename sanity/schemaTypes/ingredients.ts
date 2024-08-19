export default {
  name: 'ingredients',
  type: 'document',
  title: 'Ingredients',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of ingrdients',
    },
    {
      name: 'varients',
      type: 'array',
      title: 'different types of this ingredient',
      of: [{type: 'reference', to: {type: 'varients'}}],
    },

    {name: 'descr', type: 'text', title: 'Information of this ingredient'},
  ],
}
