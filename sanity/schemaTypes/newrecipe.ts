import {group} from 'console'

export default {
  name: 'newrecipe',
  type: 'document',
  title: 'Recipe-with multiple component or steps',
  groups: [
    {name: 'basic', title: 'Basic information'},
    {name: 'ingredient', title: 'Ingredients'},
    {name: 'step', title: 'Steps'},
    {name: 'file', title: 'upload'},
  ],
  fields: [
    {name: 'name', type: 'string', title: 'Name of the Recipe', group: 'basic'},
    {
      name: 'slug',
      type: 'slug',
      group: 'basic',
      title: 'slug',
      options: {
        source: 'name',
        slugify: (input) => decodeURI(input),
      },
      description: 'Please remember to press the generate button or the page might crash',
    },
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
      description: 'if require freeze instead of heat use negative time with hours',
      group: 'basic',
    },
    {name: 'up', type: 'number', title: 'upper heat', group: 'basic'},
    {name: 'down', type: 'number', title: 'lowwer heat', group: 'basic'},
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
      group: 'file',
    },
    {
      name: 'ingredients',
      group: 'ingredient',
      title: 'ingredients',
      type: 'array',
      of: [
        {
          name: 'comp',
          title: 'title/name of component',
          type: 'object',
          fields: [
            {name: 'compname', title: 'name of component', type: 'string'},
            {
              name: 'ingr',
              title: 'ingredients',
              type: 'array',
              of: [
                {
                  name: 'amount',
                  title: 'The aomunt required',
                  type: 'object',
                  fields: [
                    {name: 'ingrname', title: 'Name of ingrdient', type: 'string'},
                    //{
                    //name: 'ingr',
                    ///title: 'link to ingredient',
                    //type: 'reference',

                    //to: [{type: 'ingredients'}, {type: 'varients'}],
                    //},
                    {name: 'weight', type: 'number', title: 'weight'},
                  ],
                  preview: {
                    select: {title: 'ingrname', subtitle: 'weight'},
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'steps',
      group: 'step',
      title: 'Steps',
      type: 'array',
      of: [
        {
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            {name: 'sectionname', title: 'name or title of section', type: 'string'},
            {
              name: 'step',
              title: 'Steps of this section',
              type: 'array',
              of: [
                {
                  name: 'step1',
                  title: 'step',
                  type: 'object',
                  fields: [
                    {name: 'stepDesc', type: 'string', title: 'text describtion of this step'},
                    {name: 'stepImg', type: 'image', title: 'image of this step'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {title: 'pdf version of recipe', name: 'pdf', type: 'file', group: 'file'},
  ],
}
