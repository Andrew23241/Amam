import {title} from 'process'

export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  groups: [
    {name: 'head', tittle: 'Basic information'},
    {name: 'ingred', title: 'Ingredients'},
    {name: 'step', title: 'Steps'},
    {name: 'pre', title: 'uploads'},
  ],
  fields: [
    {name: 'name', type: 'string', title: 'Name of the Recipe', group: 'head'},
    {
      name: 'difficulty',
      type: 'number',
      title: 'Difficulty',
      group: 'head',
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
      group: 'head',
    },

    {
      name: 'key',
      type: 'string',
      title: 'The key point(s) of this recipe to work',
      description: 'the part that is most easy to fuck up',
      group: 'head',
    },
    {
      name: 'preheat',
      type: 'object',
      title: 'Tempeture settings and time required',
      fields: [
        {name: 'upperheat', type: 'number', title: 'upperheat-temp'},
        {name: 'downheat', type: 'number', title: 'downheat-temp'},
        {name: 'heattime', type: 'number', title: 'heat time(min)'},
      ],
      description: 'if require freeze instead of heat use negative time with hours',
      group: 'head',
    },
    {
      name: 'size',
      type: 'string',
      title: 'The portion of the final outcome',
      group: 'head',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Image of the finall product',
      of: [{type: 'image'}],
      group: 'pre',
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
      group: 'head',
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
            {name: 'stepImg', type: 'image', title: 'image of this step(optional)'},
          ],
        },
      ],
    },

    {title: 'pdf version of recipe(optional)', name: 'pdf', type: 'file', group: 'pre'},
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
