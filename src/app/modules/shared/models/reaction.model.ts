import { User } from '@/shared/models/user.model';

export interface Reaction {
  reaction_type: string;
  user: User;
}
