import * as yup from 'yup';

export const candidateValidationSchema = yup.object().shape({
  name: yup.string().required(),
  profile_search_id: yup.string().nullable().required(),
});
