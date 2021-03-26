import {Controller, useForm} from 'react-hook-form';
import {useSession} from 'next-auth/client';

import Button from '@/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/components/Input';
import normalizeNumber from '@/utils/normalizeNumber';
import sendEmail from '@/utils/sendEmail';

const TemplateReset = () => {
  const [session] = useSession();
  const {control, errors, handleSubmit} = useForm();

  const onSubmit = data => {
    const templateHeader = `(Temporary domain password)\n`;
    const templatePassword = `Password: ${data.password}\n`;
    const templateFooter = `Best regards\n${session.user.name}`;

    const patternSms = [templateHeader, templatePassword, templateFooter].join('\n');

    if (normalizeNumber(data.phone).length === 9) {
      sendEmail(
        `${normalizeNumber(data.phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
        templateHeader,
        patternSms
      );
    }
  };

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
          rules={{required: true}}
          render={({onChange, value}) => (
            <Input label={'Phone'} onChange={onChange} value={value} />
          )}
        />
        {errors.phone && <span className="text-red-500">You must provide phone</span>}
        <Button fullWidth variant="primary" onClick={handleSubmit(onSubmit)}>
          Send Password
        </Button>
      </form>
    </div>
  );
};

export default TemplateReset;
