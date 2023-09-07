import { CandidateInterface } from 'interfaces/candidate';
import { VacancyInterface } from 'interfaces/vacancy';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProfileSearchInterface {
  id?: string;
  search_name: string;
  category: string;
  description: string;
  requirements: string;
  person_in_charge: string;
  address: string;
  position_level: string;
  location: string;
  start_date: any;
  available_vacancies: number;
  closing_date: any;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  candidate?: CandidateInterface[];
  vacancy?: VacancyInterface[];
  organization?: OrganizationInterface;
  _count?: {
    candidate?: number;
    vacancy?: number;
  };
}

export interface ProfileSearchGetQueryInterface extends GetQueryInterface {
  id?: string;
  search_name?: string;
  category?: string;
  description?: string;
  requirements?: string;
  person_in_charge?: string;
  address?: string;
  position_level?: string;
  location?: string;
  organization_id?: string;
}
