import * as yup from 'yup';

export const vacancyValidationSchema = yup.object().shape({
  vacancy_name: yup.string().required(),
  profile_search_id: yup.string().nullable().required(),
});
