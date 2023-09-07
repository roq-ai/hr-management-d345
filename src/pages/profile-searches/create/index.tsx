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

import { createProfileSearch } from 'apiSdk/profile-searches';
import { profileSearchValidationSchema } from 'validationSchema/profile-searches';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { ProfileSearchInterface } from 'interfaces/profile-search';

function ProfileSearchCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProfileSearchInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProfileSearch(values);
      resetForm();
      router.push('/profile-searches');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProfileSearchInterface>({
    initialValues: {
      search_name: '',
      category: '',
      description: '',
      requirements: '',
      person_in_charge: '',
      address: '',
      position_level: '',
      location: '',
      start_date: new Date(new Date().toDateString()),
      available_vacancies: 0,
      closing_date: new Date(new Date().toDateString()),
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: profileSearchValidationSchema,
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
              label: 'Profile Searches',
              link: '/profile-searches',
            },
            {
              label: 'Create Profile Search',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Profile Search
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.search_name}
            label={'Search Name'}
            props={{
              name: 'search_name',
              placeholder: 'Search Name',
              value: formik.values?.search_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.category}
            label={'Category'}
            props={{
              name: 'category',
              placeholder: 'Category',
              value: formik.values?.category,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.requirements}
            label={'Requirements'}
            props={{
              name: 'requirements',
              placeholder: 'Requirements',
              value: formik.values?.requirements,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.person_in_charge}
            label={'Person In Charge'}
            props={{
              name: 'person_in_charge',
              placeholder: 'Person In Charge',
              value: formik.values?.person_in_charge,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.address}
            label={'Address'}
            props={{
              name: 'address',
              placeholder: 'Address',
              value: formik.values?.address,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.position_level}
            label={'Position Level'}
            props={{
              name: 'position_level',
              placeholder: 'Position Level',
              value: formik.values?.position_level,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_date ? new Date(formik.values?.start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('start_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Available Vacancies"
            formControlProps={{
              id: 'available_vacancies',
              isInvalid: !!formik.errors?.available_vacancies,
            }}
            name="available_vacancies"
            error={formik.errors?.available_vacancies}
            value={formik.values?.available_vacancies}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('available_vacancies', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="closing_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Closing Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.closing_date ? new Date(formik.values?.closing_date) : null}
              onChange={(value: Date) => formik.setFieldValue('closing_date', value)}
            />
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
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
              onClick={() => router.push('/profile-searches')}
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
    entity: 'profile_search',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProfileSearchCreatePage);
