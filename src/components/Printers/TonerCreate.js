import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';

import {createToner} from '@/services/tonerService';
import Modal from '@/components/Modal';
import Select from '@/components/Select';

const TonerCreate = () => {
  const {control, errors, handleSubmit, register} = useForm();

  const queryClient = useQueryClient();

  const createTonerMutation = useMutation(createToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('toners');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
  const handleTonerCreate = async data => {
    createTonerMutation.mutate(data);
  };

  return (
    <Modal buttonLabel={'Add Toner'} submit={handleSubmit(handleTonerCreate)}>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <legend className="text-4xl">Create Toner</legend>
        <label htmlFor="code">
          Code
          <input
            autoComplete="off"
            className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200"
            name="code"
            ref={register({required: true})}
          />
          {errors.code && <span className="block text-red-600">You must provide code</span>}
        </label>
        <Controller
          name="color"
          control={control}
          defaultValue={'Black'}
          render={({onChange, value}) => (
            <Select
              label={'Color'}
              setValue={onChange}
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
