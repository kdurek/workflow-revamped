import {Controller, useForm} from 'react-hook-form';

import Button from '@/common/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/common/components/Input';
import Select from '@/common/components/Select';
import useCms from '@/modules/reactQuery/queries/useCms';
import useTemplateCms from '@/modules/templates/hooks/useTemplateCms';

const TemplateCms = () => {
  const {data: cmsList, isLoading: isLoadingCms} = useCms();

  const {
    control,
    formState: {errors},
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm();
  const selectedCms = watch('cms');
  const {onSubmitEmail} = useTemplateCms();

  if (isLoadingCms) {
    return null;
  }

  return (
    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
      <div className="flex items-end gap-4">
        <Controller
          name="cms"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <Select
              value={value}
              onChange={onChange}
              label="Selected CMS"
              optionLabel="name"
              options={cmsList}
            />
          )}
        />
        {selectedCms && (
          <Button square onClick={() => window.open(selectedCms.link)}>
            <span className="material-icons">chevron_right</span>
          </Button>
        )}
      </div>
      {selectedCms && (
        <>
          <Input
            error={errors?.login?.message}
            label="Login"
            register={register('login', {required: {value: true, message: 'Login is required'}})}
          />
          <Input
            error={errors?.email?.message}
            label="Email"
            register={register('email', {
              required: {value: true, message: 'Email is required'},
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: 'Email in bad format',
              },
            })}
          />
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
          <div className="flex gap-4">
            <Button fullWidth variant="primary" onClick={handleSubmit(onSubmitEmail)}>
              Send Login
            </Button>
            <Button square onClick={reset}>
              <span className="material-icons">cached</span>
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default TemplateCms;
