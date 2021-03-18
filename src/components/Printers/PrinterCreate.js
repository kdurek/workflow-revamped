import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';

import {createPrinter} from '@/services/printerService';
import Modal from '@/components/Modal';
import Select from '@/components/Select';

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
    <Modal buttonLabel={'Add Printer'} submit={handleSubmit(handlePrinterCreate)}>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <legend className="text-4xl">Create Printer</legend>
        <Controller
          name="brand"
          control={control}
          defaultValue={'Xerox'}
          render={({onChange, value}) => (
            <Select label={'Brand'} setValue={onChange} value={value} options={['Xerox', 'HP']} />
          )}
        />
        <label htmlFor="model">
          Model
          <input
            autoComplete="off"
            className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200"
            name="model"
            ref={register({required: true})}
          />
          {errors.model && <span className="block text-red-600">You must provide model</span>}
        </label>
      </form>
    </Modal>
  );
};

export default PrinterCreate;
