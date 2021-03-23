import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';

import {createPrinter} from '@/services/printerService';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Input from '../Input';

const PrinterCreate = () => {
  const {control, errors, handleSubmit, register} = useForm();

  const queryClient = useQueryClient();

  const createPrinterMutation = useMutation(createPrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
    },
  });
  const handlePrinterCreate = async data => {
    createPrinterMutation.mutate(data);
  };

  return (
    <Modal buttonLabel={'Create Printer'} submit={handleSubmit(handlePrinterCreate)}>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <legend className="text-4xl">Create Printer</legend>
        <Controller
          name="brand"
          control={control}
          defaultValue={'Xerox'}
          render={({onChange, value}) => (
            <Select label={'Brand'} onChange={onChange} value={value} options={['Xerox', 'HP']} />
          )}
        />
        <Controller
          name="model"
          control={control}
          defaultValue={''}
          rules={{required: true}}
          render={({onChange, value}) => (
            <Input label={'Model'} onChange={onChange} value={value} />
          )}
        />
      </form>
    </Modal>
  );
};

export default PrinterCreate;
