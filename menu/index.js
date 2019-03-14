export default [
  {
    name    : 'tools',
    title   : 'Tools',
    url     : '/tools',
    icon    : '',
    access  : '*',
    children: [
      {
        name  : 'base64-encode',
        title : 'Base64 Encode',
        url   : '/tools/base64/encode',
        icon  : '',
        access: '*',
      },
      {
        name  : 'base64-decode',
        title : 'Base64 Decode',
        url   : '/tools/base64/decode',
        icon  : '',
        access: '*',
      },
    ],
  },
]
