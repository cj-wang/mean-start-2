export interface User {
  userId: string;
  name: string;
  username: string;
  password?: string;
  picture?: string;
  roles?: string[];
}
