import {group} from 'console'

export default {
  name: 'newrecipe',
  type: 'document',
  title: 'New Recipe',
  groups: [
    {name: 'basic', title: 'Basic information'},
    {name: 'ingredient', title: 'Ingredients'},
    {name: 'step', title: 'Steps'},
    {name: 'pre', title: 'Pre-type'},
  ],
  fields: [
    {name: 'name', type: 'string', title: 'Name of the Recipe', group: 'basic'},
    {
      name: 'difficulty',
      type: 'number',
      title: 'Difficulty',
      group: 'basic',
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
      group: 'basic',
    },
    {
      name: 'time',
      type: 'number',
      title: 'baking or freezing time',
      description: 'detail of baking or freezing',
      group: 'basic',
    },
    {
      name: 'key',
      type: 'string',
      title: 'The key point(s) of this recipe to work',
      description: 'the part that is most easy to fuck up',
      group: 'basic',
    },

    {
      name: 'size',
      type: 'string',
      title: 'The portion of the final outcome',
      group: 'basic',
    },
    {
      name: 'background',
      type: 'text',
      title: 'Background of the dessert',
      group: 'basic',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Image of the finall product',
      of: [{type: 'image'}],
      group: 'basic',
    },
    {
      name: 'ingredient1',
      type: 'array',
      title: 'Ingredients Require for Part 1',

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
      group: 'ingredient',
    },
    {
      name: 'ingredient2',
      type: 'array',
      title: 'Ingredients Require for Part 2',

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
      group: 'ingredient',
    },
    {
      name: 'ingredient3',
      type: 'array',
      title: 'Ingredients Require for Part 3',

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
      group: 'ingredient',
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
