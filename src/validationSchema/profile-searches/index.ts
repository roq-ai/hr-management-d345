import * as yup from 'yup';

export const profileSearchValidationSchema = yup.object().shape({
  search_name: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  requirements: yup.string().required(),
  person_in_charge: yup.string().required(),
  address: yup.string().required(),
  position_level: yup.string().required(),
  location: yup.string().required(),
  start_date: yup.date().required(),
  available_vacancies: yup.number().integer().required(),
  closing_date: yup.date().required(),
  organization_id: yup.string().nullable().required(),
});
