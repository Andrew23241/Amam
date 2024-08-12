import {title} from 'process'

export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  fields: [
    {name: 'name', type: 'string', title: 'Name of the Recipe'},
    {
      name: 'difficulty',
      type: 'number',
      title: 'Difficulty',
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Recipe Category',
      to: [
        {
          type: 'category',
        },
      ],
    },
    {
      name: 'makingtime',
      type: 'number',
      title: 'Estimation of Time to make',
      description:
        'Time use to mix, weight or other operation require focus.i.e, wiithout baking or frozen time.',
    },
    {
      name: 'key',
      type: 'string',
      title: 'The key point(s) of this recipe to work',
      description: 'the part that is most easy to fuck up',
    },
    {
      name: 'preheat',
      type: 'object',
      title: 'Tempeture settings and time required',
      fields: [
        {name: 'upperheat', type: 'number', title: 'upperheat-temp'},
        {name: 'downheat', type: 'number', title: 'downheat-temp'},
        {name: 'heattime', type: 'number', title: 'heat time'},
      ],
    },
    {
      name: 'size',
      type: 'string',
      title: 'The portion of the final outcome',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Image of the finall product',
      of: [{type: 'image'}],
    },
    {
      name: 'ingredient',
      type: 'array',
      title: 'Ingredients Require',
      of: [
        {
          name: 'amount',
          title: 'The aomunt required',
          type: 'object',
          fields: [
            {name: 'ingrname', title: 'Name of ingrdient', type: 'string'},
            {
              name: 'ingr',
              title: 'link to ingredient',
              type: 'reference',

              to: [{type: 'ingredients'}],
            },
            {name: 'weight', type: 'number', title: 'weight'},
          ],
          preview: {
            select: {title: 'ingrname', subtitle: 'weight'},
          },
        },
      ],
    },
    {
      name: 'background',
      type: 'string',
      title: 'Background of the dessert',
    },
    {
      name: 'steps',
      type: 'array',
      title: 'Steps',
      of: [{type: 'string'}],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'slug',
      options: {
        source: 'name',
      },
    },
  ],
}
