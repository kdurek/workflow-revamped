import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import axios from 'axios';
import Head from 'next/head';

import Button from '@/common/components/Button';
import DefaultLayout from '@/layouts/core';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import useToner from '@/modules/reactQuery/queries/useToner';
import useTonerDelete from '@/modules/reactQuery/mutations/useDeleteToner';
import useTonerUpdate from '@/modules/reactQuery/mutations/useUpdateToner';

const TonerEditPage = () => {
  const router = useRouter();
  const {data: toner} = useToner();
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const {mutate: updateToner} = useTonerUpdate();
  const {mutate: deleteToner} = useTonerDelete();

  const handleTonerEdit = async data => {
    updateToner({_id: toner._id, ...data});
    router.push('/toners');
  };

  const handleTonerDelete = async () => {
    deleteToner(toner._id);
    router.push('/toners');
  };

  const handleCancel = () => {
    router.push('/toners');
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Edit toner</title>
      </Head>
      <Form onSubmit={handleSubmit(handleTonerEdit)}>
        <h1 className="text-xl font-medium">Edit toner</h1>
        <Input
          error={errors?.code?.message}
          label="Code"
          defaultValue={toner.code}
          register={register('code', {
            required: {value: true, message: 'Code is required'},
          })}
        />
        <SelectNative
          label="Color"
          defaultValue={toner.color}
          options={['Black', 'Cyan', 'Magenta', 'Yellow']}
          register={register('color')}
        />
        <Input
          error={errors?.amount?.message}
          label="Amount"
          defaultValue={toner.amount}
          register={register('amount', {
            required: {value: true, message: 'Amount is required'},
          })}
        />
        <div className="flex gap-4">
          <Button fullWidth onClick={handleCancel}>
            Cancel
          </Button>
          <Button fullWidth variant="danger" onClick={handleTonerDelete}>
            Delete
          </Button>
          <Button type="submit" fullWidth variant="primary" onClick={handleSubmit(handleTonerEdit)}>
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

  const getToner = async () => {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/${context.params.tonerId}`,
      {
        headers: {
          Authorization: `bearer ${session.accessToken}`,
        },
      }
    );
    return data.toner;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['toners', context.params.tonerId], getToner);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default TonerEditPage;
