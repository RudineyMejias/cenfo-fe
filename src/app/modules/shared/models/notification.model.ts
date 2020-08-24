import { User } from '@/shared/models/user.model';

export interface Notification {
  user: User;
  message: string;
  created_date: number;
}
