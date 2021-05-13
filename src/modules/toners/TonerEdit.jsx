import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';

import Button from '@/common/components/Button';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import useToner from '@/modules/reactQuery/queries/useToner';
import useTonerDelete from '@/modules/reactQuery/mutations/useDeleteToner';
import useTonerUpdate from '@/modules/reactQuery/mutations/useUpdateToner';

const TonerEdit = () => {
  const router = useRouter();
  const {data: toner} = useToner();
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const {mutate: updateToner} = useTonerUpdate();
  const {mutate: deleteToner} = useTonerDelete();

  const handleTonerEdit = async data => {
    updateToner({_id: toner._id, ...data});
    router.push('/toners');
  };

  const handleTonerDelete = async () => {
    deleteToner(toner._id);
    router.push('/toners');
  };

  const handleCancel = () => {
    router.push('/toners');
  };

  return (
    <Form label="Edit toner" onSubmit={handleSubmit(handleTonerEdit)}>
      <Input
        error={errors?.code?.message}
        label="Code"
        defaultValue={toner.code}
        register={register('code', {
          required: {value: true, message: 'Code is required'},
        })}
      />
      <SelectNative
        label="Color"
        defaultValue={toner.color}
        options={['Black', 'Cyan', 'Magenta', 'Yellow']}
        register={register('color')}
      />
      <Input
        error={errors?.amount?.message}
        label="Amount"
        defaultValue={toner.amount}
        register={register('amount', {
          required: {value: true, message: 'Amount is required'},
        })}
      />
      <div className="flex gap-4">
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
        <Button fullWidth variant="danger" onClick={handleTonerDelete}>
          Delete
        </Button>
        <Button type="submit" fullWidth variant="primary" onClick={handleSubmit(handleTonerEdit)}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default TonerEdit;
