import { User } from './user.model';

export interface CreateUserRequest extends User {
  password: string;
}
