import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useState} from 'react';

import {getToners} from '@/services/tonerService';
import {updateToner, deleteToner} from '@/services/tonerService';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';

const TonerEdit = () => {
  const [selectedToner, setSelectedToner] = useState();

  const {control, errors, handleSubmit} = useForm();

  const queryClient = useQueryClient();

  const {data: tonersList} = useQuery('toners', getToners);

  const updateTonerMutation = useMutation(updateToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
  const handleTonerEdit = async data => {
    if (selectedToner) {
      updateTonerMutation.mutate({id: selectedToner._id, updatedToner: data});
    }
    setSelectedToner();
  };

  const deleteTonerMutation = useMutation(deleteToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
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
              <legend className="text-4xl">Edit Toner</legend>
              <Controller
                name="code"
                control={control}
                defaultValue={selectedToner.code}
                rules={{required: true}}
                render={({onChange, value}) => (
                  <Input label={'Code'} onChange={onChange} value={value} />
                )}
              />
              {errors.code && <span className="block text-red-600">You must provide code</span>}
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
              <Button fullWidth variant="danger" label="Delete" onClick={handleTonerDelete} />
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TonerEdit;
