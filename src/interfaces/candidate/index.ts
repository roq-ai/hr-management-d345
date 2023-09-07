import { ProfileSearchInterface } from 'interfaces/profile-search';
import { GetQueryInterface } from 'interfaces';

export interface CandidateInterface {
  id?: string;
  name: string;
  profile_search_id: string;
  created_at?: any;
  updated_at?: any;

  profile_search?: ProfileSearchInterface;
  _count?: {};
}

export interface CandidateGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  profile_search_id?: string;
}
