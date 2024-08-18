export default {
  name: 'home',
  type: 'document',
  title: 'content of Intro page',
  fields: [
    {name: 'name', type: 'string', title: 'Name'},
    {
      name: 'intro',
      type: 'text',
      title: 'Brief Intro of this website',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Image to Play in the intro page',
      of: [{type: 'image'}],
    },
  ],
}
