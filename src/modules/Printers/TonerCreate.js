import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import useTonerCreate from '@/common/hooks/useTonerCreate';

const TonerCreate = () => {
  const {control, errors, handleSubmit} = useForm();
  const createTonerMutation = useTonerCreate();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleTonerCreate = async data => {
    createTonerMutation.mutate(data);
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleModalOpen}>Create Toner</Button>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <Modal.Title>Create Toner</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handleTonerCreate)}>
          <Modal.Description>Details</Modal.Description>
          <Controller
            name="code"
            control={control}
            defaultValue={''}
            rules={{required: {value: true, message: 'Code is required'}}}
            render={({onChange, value}) => (
              <Input
                error={errors?.code?.message}
                label={'Code'}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            defaultValue={'Black'}
            render={({onChange, value}) => (
              <Select
                label={'Color'}
                onChange={onChange}
                value={value}
                options={['Black', 'Cyan', 'Magenta', 'Yellow']}
              />
            )}
          />
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={handleModalClose}>
            Cancel
          </Button>
          <Button fullWidth variant="primary" onClick={handleSubmit(handleTonerCreate)}>
            Submit
          </Button>
        </Modal.Buttons>
      </Modal>
    </>
  );
};

export default TonerCreate;
