import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';

import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import useTonerCreate from '@/modules/reactQuery/mutations/useCreateToner';
import {TONER_COLORS} from '@/app/constants';

const TonerCreate = () => {
  const router = useRouter();
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const {mutate: createToner} = useTonerCreate();

  const handleTonerCreate = async data => {
    createToner(data);
    router.push('/printers');
  };

  const handleCancel = () => {
    router.push('/printers');
  };

  return (
    <Form label="Create toner" onSubmit={handleSubmit(handleTonerCreate)}>
      <Input
        error={errors?.code?.message}
        label="Code"
        register={register('code', {required: {value: true, message: 'Code is required'}})}
      />
      <SelectNative label="Color" options={TONER_COLORS} register={register('color')} />
      <div className="flex gap-4">
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" fullWidth variant="primary" onClick={handleSubmit(handleTonerCreate)}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default TonerCreate;
