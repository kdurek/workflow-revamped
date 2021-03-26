import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';

import {createToner} from '@/services/tonerService';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Input from '../Input';

const TonerCreate = () => {
  const {control, errors, handleSubmit} = useForm();

  const queryClient = useQueryClient();

  const createTonerMutation = useMutation(createToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('toners-uncategorized');
    },
  });
  const handleTonerCreate = async data => {
    createTonerMutation.mutate(data);
  };

  return (
    <Modal buttonLabel={'Create Toner'} submit={handleSubmit(handleTonerCreate)}>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <legend className="text-4xl">Create Toner</legend>
        <Controller
          name="code"
          control={control}
          defaultValue={''}
          rules={{required: true}}
          render={({onChange, value}) => <Input label={'Code'} onChange={onChange} value={value} />}
        />
        {errors.code && <span className="block text-red-600">You must provide code</span>}
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
  );
};

export default TonerCreate;
