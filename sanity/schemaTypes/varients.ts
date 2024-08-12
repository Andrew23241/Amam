export default {
  name: 'varients',
  type: 'document',
  title: 'Varients of the Ingredients',
  fields: [
    {name: 'name', type: 'string', title: 'Name of the ingredient'},
    {
      name: 'price',
      type: 'object',
      title: 'Price of the ingredient',
      fields: [
        {
          name: 'minunit',
          type: 'number',
          title: 'Minimum amount to purchase',
          description: 'e.g. one egg is 50g , flour one bag is 500g minimum',
        },
        {name: 'unitprice', type: 'number', title: 'The price of the unit of ingredient'},
      ],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of this ingredient',
    },
    {
      name: 'describe',
      type: 'string',
      title: 'description of the varient',
    },
  ],
}
