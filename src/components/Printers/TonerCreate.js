import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import useTonerCreate from '@/hooks/useTonerCreate';
import Button from '@/components/Button';

const TonerCreate = () => {
  const {control, errors, handleSubmit} = useForm();
  const createTonerMutation = useTonerCreate();

  const [modalOpen, setModalOpen] = useState(false);

  const handleTonerCreate = async data => {
    createTonerMutation.mutate(data);
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Create Toner</Button>
      <Modal open={modalOpen} setOpen={setModalOpen} onSubmit={handleSubmit(handleTonerCreate)}>
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
        </form>
      </Modal>
    </>
  );
};

export default TonerCreate;
