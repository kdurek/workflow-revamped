import {Controller, useForm} from 'react-hook-form';

import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import useTonerCreate from '@/hooks/useTonerCreate';

const TonerCreate = () => {
  const {control, errors, handleSubmit} = useForm();
  const createTonerMutation = useTonerCreate();

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
          rules={{required: {value: true, message: 'Code is required'}}}
          render={({onChange, value}) => (
            <Input error={errors?.code?.message} label={'Code'} onChange={onChange} value={value} />
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
  );
};

export default TonerCreate;
