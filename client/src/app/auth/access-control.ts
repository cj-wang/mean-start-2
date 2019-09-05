export const accessControl = {
  guest: {
    view: 'index',
  },
  user: {
    parent: 'guest',
    view: ['heroes', 'user'],
    create: 'heroes',
    edit: ['heroes', 'user'],
    remove: 'heroes',
  },
  admin: {
    parent: 'user',
    view: 'users',
    create: 'users',
    edit: 'users',
    remove: 'users',
  },
};
