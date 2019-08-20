import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 0,
        name: 'Admin',
        username: 'admin@email.com',
        password: 'password',
      },
      {
        userId: 1,
        name: 'John',
        username: 'john@email.com',
        password: 'changeme',
      },
      {
        userId: 2,
        name: 'Chris',
        username: 'chris@email.com',
        password: 'secret',
      },
      {
        userId: 3,
        name: 'Maria',
        username: 'maria@email.com',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
