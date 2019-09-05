import { Injectable } from '@nestjs/common';
import { User } from '../../../../shared/user';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: '0',
        name: 'Admin',
        username: 'admin@email.com',
        password: 'password',
        roles: ['admin'],
      },
      {
        userId: '1',
        name: 'John',
        username: 'john@email.com',
        password: 'changeme',
        roles: ['user'],
      },
      {
        userId: '2',
        name: 'Chris',
        username: 'chris@email.com',
        password: 'secret',
        roles: ['user'],
      },
      {
        userId: '3',
        name: 'Maria',
        username: 'maria@email.com',
        password: 'guess',
        roles: ['user'],
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
