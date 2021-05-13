import {getSession} from 'next-auth/client';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import Head from 'next/head';

import Button from '@/common/components/Button';
import DefaultLayout from '@/layouts/core';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import useTonerCreate from '@/modules/reactQuery/mutations/useCreateToner';

const TonerEditPage = () => {
  const router = useRouter();
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const {mutate: createToner} = useTonerCreate();

  const handleTonerCreate = async data => {
    createToner(data);
    router.push('/printers');
  };

  const handleCancel = () => {
    router.push('/printers');
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Create toner</title>
      </Head>
      <Form label="Create toner" onSubmit={handleSubmit(handleTonerCreate)}>
        <Input
          error={errors?.code?.message}
          label="Code"
          register={register('code', {required: {value: true, message: 'Code is required'}})}
        />
        <SelectNative
          label="Color"
          options={['Black', 'Cyan', 'Magenta', 'Yellow']}
          register={register('color')}
        />
        <div className="flex gap-4">
          <Button fullWidth onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="primary"
            onClick={handleSubmit(handleTonerCreate)}
          >
            Submit
          </Button>
        </div>
      </Form>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/printers',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default TonerEditPage;
