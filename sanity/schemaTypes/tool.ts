export default {
  name: 'tools',
  type: 'document',
  title: 'Tools 工具',
  fields: [
    {name: 'name', type: 'string', title: 'Name of the tool'},
    {name: 'image', type: 'image', title: 'One image of this tool'},
    {name: 'desc', type: 'text', title: 'description of this tool'},
  ],
}
