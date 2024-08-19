export default {
  name: 'varients',
  type: 'document',
  title: 'Varients of the Ingredients',
  fields: [
    {name: 'name', type: 'string', title: 'Name of the ingredient'},

    {
      name: 'image',
      type: 'image',
      title: 'Image of this ingredient',
    },
    {
      name: 'describe',
      type: 'text',
      title: 'description of the varient',
    },
  ],
}
