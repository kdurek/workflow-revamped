import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import useCreatePrinter from '@/modules/reactQuery/mutations/usePrinterCreate';

const PrinterCreate = () => {
  const {control, errors, handleSubmit} = useForm();

  const createPrinterMutation = useCreatePrinter();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handlePrinterCreate = async data => {
    createPrinterMutation.mutate(data);
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleModalOpen}>Create Printer</Button>

      <Modal open={modalOpen} setOpen={setModalOpen}>
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
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={handleModalClose}>
            Cancel
          </Button>
          <Button fullWidth variant="primary" onClick={handleSubmit(handlePrinterCreate)}>
            Submit
          </Button>
        </Modal.Buttons>
      </Modal>
    </>
  );
};

export default PrinterCreate;
