import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import useTonerDelete from '@/hooks/useTonerDelete';
import useToners from '@/hooks/useToners';
import useTonerUpdate from '@/hooks/useTonerUpdate';

const TonerEdit = () => {
  const {control, errors, handleSubmit} = useForm();
  const {data: tonersList} = useToners();
  const deleteTonerMutation = useTonerDelete();
  const updateTonerMutation = useTonerUpdate();

  const [selectedToner, setSelectedToner] = useState();

  const handleTonerEdit = async data => {
    if (selectedToner) {
      updateTonerMutation.mutate({id: selectedToner._id, updatedToner: data});
    }
    setSelectedToner();
  };

  const handleTonerDelete = async () => {
    if (selectedToner) {
      deleteTonerMutation.mutate(selectedToner._id);
    }
    setSelectedToner();
  };

  return (
    <Modal buttonLabel={'Edit Toner'} submit={handleSubmit(handleTonerEdit)}>
      <div className="relative flex flex-col gap-4">
        <div>
          <Select
            label={'Selected toner'}
            optionLabel={'code'}
            options={tonersList}
            value={selectedToner}
            onChange={setSelectedToner}
          />
        </div>
        {selectedToner && (
          <div key={selectedToner._id}>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="flex justify-between">
                <legend className="text-4xl">Edit Toner</legend>
                <Button variant="danger" onClick={handleTonerDelete}>
                  Delete
                </Button>
              </div>
              <Controller
                name="code"
                control={control}
                defaultValue={selectedToner.code}
                rules={{required: true}}
                render={({onChange, value}) => (
                  <Input label={'Code'} onChange={onChange} value={value} />
                )}
              />
              {errors.code && <span className="text-red-500">You must provide code</span>}
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
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TonerEdit;
