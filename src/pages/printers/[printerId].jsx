import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';

import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import usePrinter from '@/modules/reactQuery/queries/usePrinter';
import usePrinterDelete from '@/modules/reactQuery/mutations/useDeletePrinter';
import usePrinterUpdate from '@/modules/reactQuery/mutations/useUpdatePrinter';
import useTonersUncategorized from '@/modules/reactQuery/queries/useTonersUncategorized';

const PrinterEditPage = () => {
  const router = useRouter();
  const {data: printer} = usePrinter();
  const {data: uncategorizedToners} = useTonersUncategorized();
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const [editToners, setEditToners] = useState(uncategorizedToners[0].code);

  const {mutate: updatePrinter} = usePrinterUpdate();
  const {mutate: deletePrinter} = usePrinterDelete();

  const handlePrinterEdit = data => {
    updatePrinter({_id: printer._id, data});
    router.push('/printers');
  };

  const handlePrinterDelete = () => {
    deletePrinter(printer._id);
    router.push('/printers');
  };

  const handlePushToner = tonerId => {
    const updatedToners = [...printer.toners.map(toner => toner._id), tonerId];
    updatePrinter({_id: printer._id, data: {toners: updatedToners}});
  };

  const handlePullToner = tonerId => {
    const updatedToners = printer.toners.filter(toner => toner._id !== tonerId);
    updatePrinter({_id: printer._id, data: {toners: updatedToners}});
  };

  const handleCancel = () => {
    router.push('/printers');
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Edit printer</title>
      </Head>
      <Form onSubmit={handleSubmit(handlePrinterEdit)}>
        <h1 className="text-xl font-medium">Edit printer</h1>
        <SelectNative
          label="Brand"
          defaultValue={printer.brand}
          options={['Xerox', 'HP']}
          register={register('brand')}
        />
        <Input
          error={errors?.model?.message}
          label="Model"
          defaultValue={printer.model}
          register={register('model', {required: {value: true, message: 'Model is required'}})}
        />
        <div className="flex gap-4">
          <Button fullWidth onClick={handleCancel}>
            Cancel
          </Button>
          <Button fullWidth variant="danger" onClick={handlePrinterDelete}>
            Delete
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="primary"
            onClick={handleSubmit(handlePrinterEdit)}
          >
            Submit
          </Button>
        </div>
      </Form>
      <Card className="p-4 mt-4 space-y-4">
        {!!uncategorizedToners?.length && (
          <div className="flex gap-4">
            <SelectNative
              label="Add toner"
              onChange={e => setEditToners(e.target.value)}
              options={[...new Set(uncategorizedToners?.map(toner => toner.code))]}
            />
            <div className="self-end">
              <Button
                onClick={() => {
                  if (editToners !== '') {
                    const toner = uncategorizedToners.find(
                      uncategorizedToner => uncategorizedToner.code === editToners
                    );
                    handlePushToner(toner._id);
                    setEditToners('');
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        )}
        <div className="divide-y divide-gray-300 divide-solid">
          {printer.toners.map(toner => (
            <div key={toner._id} className="flex items-center gap-2">
              <button type="button" onClick={() => handlePullToner(toner._id)}>
                <span className="flex items-center justify-center w-10 h-10 rounded-md material-icons hover:bg-gray-200">
                  close
                </span>
              </button>
              <span className="font-medium">{toner.code}</span>
            </div>
          ))}
        </div>
      </Card>
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

  const getPrinter = async () => {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/printers/${context.params.printerId}`,
      {
        headers: {
          Authorization: `bearer ${session.accessToken}`,
        },
      }
    );
    return data.printer;
  };

  const getTonersUncategorized = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners/uncategorized`, {
      headers: {
        Authorization: `bearer ${session.accessToken}`,
      },
    });
    return data.toners;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['printers', context.params.printerId], getPrinter);
  await queryClient.prefetchQuery('toners-uncategorized', getTonersUncategorized);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default PrinterEditPage;
