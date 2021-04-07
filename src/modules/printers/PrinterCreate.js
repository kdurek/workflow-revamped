import {useForm} from 'react-hook-form';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import SelectNative from '@/common/components/SelectNative';
import usePrinterActions from '@/modules/printers/hooks/usePrinterActions';

const PrinterCreate = () => {
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();
  const [open, toggle] = useToggle(false);
  const {handlePrinterCreate} = usePrinterActions({toggle});

  return (
    <>
      <Button onClick={toggle}>Create Printer</Button>
      <Modal open={open} setOpen={toggle}>
        <Modal.Title>Create Printer</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handlePrinterCreate)}>
          <Modal.Description>Details</Modal.Description>
          <SelectNative label="Brand" options={['Xerox', 'HP']} register={register('brand')} />
          <Input
            error={errors?.model?.message}
            label={'Model'}
            register={register('model', {required: {value: true, message: 'Model is required'}})}
          />
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
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
