export const accessControl = {
  guest: {
    view: 'index',
  },
  user: {
    parent: 'guest',
    view: 'user',
    manage: 'heroes',
  },
  admin: {
    parent: 'user',
    manage: 'users',
  },
};
