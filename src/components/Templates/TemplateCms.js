import {Controller, useForm} from 'react-hook-form';
import {useSession} from 'next-auth/client';

import Button from '@/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/components/Input';
import normalizeNumber from '@/utils/normalizeNumber';
import Select from '@/components/Select';
import sendEmail from '@/utils/sendEmail';
import useCms from '@/hooks/useCms';

const TemplateCms = () => {
  const [session] = useSession();
  const {control, errors, handleSubmit, watch, reset} = useForm();
  const selectedCms = watch('cms');

  const {data: cmsList} = useCms();

  const onSubmitEmail = data => {
    const templateHeader = `(Credentials to ${data.cms.name})\n`;
    const templateLogin = `Login: ${data.login}\n`;
    const templateLink = `Link: ${data.cms.link}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternEmail = [templateHeader, templateLogin, templateLink, templateFooter].join('\n');

    sendEmail(data.email, templateHeader, patternEmail);
  };

  const onSubmitSms = data => {
    const templateHeader = `(Credentials to ${data.cms.name})\n`;
    const templatePassword = `Password: ${data.password}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternSms = [templateHeader, templatePassword, templateFooter].join('\n');

    sendEmail(
      `${normalizeNumber(data.phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
      templateHeader,
      patternSms
    );
  };

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
