export default {
  name: 'event',
  type: 'document',
  title: 'Events',
  fields: [
    {name: 'name', type: 'string', title: 'Name of the event'},
    {
      name: 'date',
      type: 'date',
      title: 'Event date',
    },
    {
      name: 'eventcategory',
      type: 'reference',
      title: 'Event Category',
      to: [
        {
          type: 'eventcategory',
        },
      ],
    },
    {
      name: 'members',
      type: 'array',
      title: 'Memebers participate',
      of: [
        {
          name: 'person',
          type: 'reference',
          title: 'Members of this project',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },

    {
      name: 'images',
      type: 'array',
      title: 'Image of the event',
      of: [{type: 'image'}],
    },

    {
      name: 'review',
      type: 'array',
      title: 'Description of the event',
      of: [
        {
          name: 'paragraph',
          type: 'object',
          title: 'paragraph',
          description: 'one component is a section, you can plugin one image per section',
          fields: [
            {name: 'context', title: 'context', type: 'text'},
            {name: 'pic', title: 'image', type: 'image'},
          ],
          preview: {
            select: {title: 'context', subtitle: 'weight'},
          },
        },
      ],
    },

    {
      name: 'recipeUsed',
      type: 'array',
      title: 'Recipe used in this event',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'recipe',
            },
            {type: 'newrecipe'},
          ],
        },
      ],
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link to the event(optional)',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'slug',
      options: {
        source: 'name',
        slugify: (input) => decodeURI(input),
      },
    },
  ],
}
