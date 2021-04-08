import {useForm} from 'react-hook-form';

import useTemplateReset from '@/modules/templates/hooks/useTemplateReset';
import Button from '@/common/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/common/components/Input';

const TemplateReset = () => {
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();
  const {onSubmit} = useTemplateReset();

  return (
    <div>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <Input
          readOnly
          label="Password"
          defaultValue={generatePassword(true, true, true, true, 15)}
          onClick={e => {
            copyToClipboard(e.target.value);
            e.target.select();
          }}
          register={register('password')}
        />
        <Input
          error={errors?.phone?.message}
          label="Phone"
          register={register('phone', {required: {value: true, message: 'Phone is required'}})}
        />

        <Button fullWidth variant="primary" onClick={handleSubmit(onSubmit)}>
          Send Password
        </Button>
      </form>
    </div>
  );
};

export default TemplateReset;
