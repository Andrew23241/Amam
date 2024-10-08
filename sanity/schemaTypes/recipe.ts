import {title} from 'process'

export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  groups: [
    {name: 'ingred', title: 'Ingredients'},
    {name: 'step', title: 'Steps'},
    {name: 'pre', title: 'edit your self'},
  ],
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
      group: 'ingred',
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

              to: [{type: 'ingredients'}, {type: 'varients'}],
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
      type: 'text',
      title: 'Background of the dessert',
    },
    {
      name: 'steps',
      type: 'array',
      title: 'Steps',
      group: 'step',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'stepDesc', type: 'string', title: 'text describtion of this step'},
            {name: 'stepImg', type: 'image', title: 'image of this step'},
          ],
        },
      ],
    },

    {title: 'pdf version of recipe', name: 'pdf', type: 'file', group: 'pre'},
    {
      name: 'slug',
      type: 'slug',
      title: 'slug',
      options: {
        source: 'name',
      },
      description: 'Recommand to type by your self if your recipe is not english',
    },
  ],
}
