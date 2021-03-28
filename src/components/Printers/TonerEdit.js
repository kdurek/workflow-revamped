import {Controller, useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import useTonerDelete from '@/hooks/useTonerDelete';
import useToners from '@/hooks/useToners';
import useTonerUpdate from '@/hooks/useTonerUpdate';

const TonerEdit = () => {
  const {control, errors, handleSubmit, setValue, watch} = useForm();
  const selectedToner = watch('toner');

  const {data: tonersList} = useToners();
  const deleteTonerMutation = useTonerDelete();
  const updateTonerMutation = useTonerUpdate();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setValue('code', selectedToner?.code);
    setValue('color', selectedToner?.color);
    setValue('amount', selectedToner?.amount);
  }, [selectedToner]);

  const handleTonerEdit = async data => {
    if (selectedToner) {
      updateTonerMutation.mutate({id: selectedToner._id, updatedToner: data});
    }
    setModalOpen(false);
  };

  const handleTonerDelete = async () => {
    if (selectedToner) {
      deleteTonerMutation.mutate(selectedToner._id);
    }
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Edit Toner</Button>
      <Modal open={modalOpen} setOpen={setModalOpen} onSubmit={handleSubmit(handleTonerEdit)}>
        <form className="space-y-4" onSubmit={handleSubmit(handleTonerEdit)}>
          <Modal.Title>Edit Toner</Modal.Title>
          <Controller
            name="toner"
            control={control}
            defaultValue={''}
            render={({onChange, value}) => (
              <Select
                label={'Selected toner'}
                optionLabel={'code'}
                options={tonersList}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {selectedToner && (
            <>
              <div className="flex justify-between">
                <Modal.Description>Details</Modal.Description>
                <Button variant="danger" onClick={handleTonerDelete}>
                  Delete
                </Button>
              </div>
              <Controller
                name="code"
                control={control}
                defaultValue={selectedToner.code}
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
                defaultValue={selectedToner.color}
                render={({onChange, value}) => (
                  <Select
                    label={'Color'}
                    onChange={onChange}
                    value={value}
                    options={['Black', 'Cyan', 'Magenta', 'Yellow']}
                  />
                )}
              />
              <Controller
                name="amount"
                control={control}
                defaultValue={selectedToner.amount}
                rules={{required: true}}
                render={({onChange, value}) => (
                  <Input label={'Amount'} onChange={onChange} value={value} />
                )}
              />
            </>
          )}
        </form>
      </Modal>
    </>
  );
};

export default TonerEdit;
