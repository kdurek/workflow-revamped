import {Controller, useForm} from 'react-hook-form';

import {useTemplateCms} from '@/modules/templates/hooks/useTemplateCms';
import Button from '@/common/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/common/components/Input';
import Select from '@/common/components/Select';

const TemplateCms = () => {
  const {control, errors, handleSubmit, watch, reset} = useForm();
  const selectedCms = watch('cms');
  const {cmsList, onSubmitEmail, onSubmitSms} = useTemplateCms();

  return (
    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
      <div className="flex items-end gap-4">
        <Controller
          name="cms"
          control={control}
          defaultValue={''}
          render={({onChange, value}) => (
            <Select
              label="Selected CMS"
              onChange={onChange}
              value={value}
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
          <Controller
            name="login"
            control={control}
            defaultValue={''}
            rules={{required: {value: true, message: 'Login is required'}}}
            render={({onChange, value}) => (
              <Input
                error={errors?.login?.message}
                label={'Login'}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{
              required: {value: true, message: 'Email is required'},
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: 'Email in bad format',
              },
            }}
            render={({onChange, value}) => (
              <Input
                error={errors?.email?.message}
                label={'Email'}
                onChange={onChange}
                value={value}
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
          <div className="flex gap-4">
            <Button fullWidth variant="primary" onClick={handleSubmit(onSubmitEmail)}>
              Send Login
            </Button>
            <Button fullWidth variant="primary" onClick={handleSubmit(onSubmitSms)}>
              Send Password
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
