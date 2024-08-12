export default {
  name: 'ingredients',
  type: 'document',
  title: 'Ingredients',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of ingrdients',
      description:
        "the default unit will be grams, if it's counted by other units ,Please specify!!!",
    },
    {
      name: 'varients',
      type: 'array',
      title: 'different types of this ingredient',
      of: [{type: 'reference', to: {type: 'varients'}}],
    },
    {
      name: 'normprice',
      type: 'object',
      title: 'Normal price of this ingredient',
      fields: [
        {name: 'size', type: 'number', title: 'weight of the ingredient'},
        {name: 'price', type: 'number', title: 'price of the amount'},
      ],
    },
    {name: 'descr', type: 'text', title: 'Information of this ingredient'},
  ],
}
