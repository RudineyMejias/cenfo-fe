import { User } from '@/shared/models/user.model';

export interface Authorization {
  user: User;
  token: string;
}
