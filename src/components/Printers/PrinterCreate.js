import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import useCreatePrinter from '@/hooks/usePrinterCreate';

const PrinterCreate = () => {
  const {control, errors, handleSubmit} = useForm();

  const createPrinterMutation = useCreatePrinter();

  const [modalOpen, setModalOpen] = useState(false);

  const handlePrinterCreate = async data => {
    createPrinterMutation.mutate(data);
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Create Printer</Button>

      <Modal open={modalOpen} setOpen={setModalOpen} onSubmit={handleSubmit(handlePrinterCreate)}>
        <Modal.Title>Create Printer</Modal.Title>

        <form className="space-y-4" onSubmit={handleSubmit(handlePrinterCreate)}>
          <Modal.Description>Details</Modal.Description>
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
    </>
  );
};

export default PrinterCreate;
