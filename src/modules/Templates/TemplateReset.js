import {Controller, useForm} from 'react-hook-form';

import {useTemplateReset} from '@/modules/templates/hooks/useTemplateReset';
import Button from '@/common/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/common/components/Input';

const TemplateReset = () => {
  const {control, errors, handleSubmit} = useForm();
  const {onSubmit} = useTemplateReset();

  return (
    <div>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <Controller
          name="password"
          control={control}
          defaultValue={generatePassword(true, true, true, true, 15)}
          render={({value}) => (
            <Input
              readOnly
              label={'Password'}
              defaultValue={value}
              onClick={e => {
                copyToClipboard(e.target.value);
                e.target.select();
              }}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue={''}
          rules={{
            required: {value: true, message: 'Phone is required'},
            pattern: {
              value: /^[0-9]{9}$/,
              message: 'Phone in bad format',
            },
          }}
          render={({onChange, value}) => (
            <Input
              error={errors?.phone?.message}
              label={'Phone'}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Button fullWidth variant="primary" onClick={handleSubmit(onSubmit)}>
          Send Password
        </Button>
      </form>
    </div>
  );
};

export default TemplateReset;
