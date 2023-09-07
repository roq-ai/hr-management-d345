import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createVacancy } from 'apiSdk/vacancies';
import { vacancyValidationSchema } from 'validationSchema/vacancies';
import { ProfileSearchInterface } from 'interfaces/profile-search';
import { getProfileSearches } from 'apiSdk/profile-searches';
import { VacancyInterface } from 'interfaces/vacancy';

function VacancyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VacancyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVacancy(values);
      resetForm();
      router.push('/vacancies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VacancyInterface>({
    initialValues: {
      vacancy_name: '',
      profile_search_id: (router.query.profile_search_id as string) ?? null,
    },
    validationSchema: vacancyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Vacancies',
              link: '/vacancies',
            },
            {
              label: 'Create Vacancy',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Vacancy
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.vacancy_name}
            label={'Vacancy Name'}
            props={{
              name: 'vacancy_name',
              placeholder: 'Vacancy Name',
              value: formik.values?.vacancy_name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ProfileSearchInterface>
            formik={formik}
            name={'profile_search_id'}
            label={'Select Profile Search'}
            placeholder={'Select Profile Search'}
            fetcher={getProfileSearches}
            labelField={'search_name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/vacancies')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'vacancy',
    operation: AccessOperationEnum.CREATE,
  }),
)(VacancyCreatePage);
