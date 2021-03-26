import {Controller, useForm} from 'react-hook-form';

import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import useCreatePrinter from '@/hooks/usePrinterCreate';

const PrinterCreate = () => {
  const {control, errors, handleSubmit} = useForm();
  const createPrinterMutation = useCreatePrinter();

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
          rules={{required: {value: true, message: 'Model is required'}}}
          render={({onChange, value}) => (
            <Input
              error={errors?.model?.message}
              label={'Model'}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </form>
    </Modal>
  );
};

export default PrinterCreate;
