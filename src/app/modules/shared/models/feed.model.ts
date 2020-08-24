import { Reaction } from './reaction.model';
import { User } from '@/shared/models/user.model';

export interface Feed {
  id?: number;
  creator_user_id: number;
  text: string;
  created_date?: number;
  updated_date?: number;
  image_url?: string;
  parent_feed_id?: number;
  reactions?: Reaction[];
  user?: User;
  comments?: Feed[];
  isEditable?: boolean;
}
