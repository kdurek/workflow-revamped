import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';

import {createPrinter} from '@/services/printerService';
import Modal from '@/components/Modal';

const PrinterCreate = () => {
  const {register, handleSubmit, errors} = useForm();

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
        <label htmlFor="brand">
          Brand
          <select
            className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200 focus:outline-none"
            name="brand"
            ref={register}
          >
            <option value="Xerox">Xerox</option>
            <option value="HP">HP</option>
          </select>
        </label>
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
