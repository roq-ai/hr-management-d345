import { ProfileSearchInterface } from 'interfaces/profile-search';
import { GetQueryInterface } from 'interfaces';

export interface VacancyInterface {
  id?: string;
  vacancy_name: string;
  profile_search_id: string;
  created_at?: any;
  updated_at?: any;

  profile_search?: ProfileSearchInterface;
  _count?: {};
}

export interface VacancyGetQueryInterface extends GetQueryInterface {
  id?: string;
  vacancy_name?: string;
  profile_search_id?: string;
}
