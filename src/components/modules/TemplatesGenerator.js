import {useState} from 'react';
import {useConfig} from '@/context/ConfigContext';
import Button from '@/elements/Button';
import TextArea from '@/elements/TextArea';
import Input from '@/elements/Input';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import normalizeNumber from '@/utils/normalizeNumber';
import sendEmail from '@/utils/sendEmail';

const TemplatesGenerator = ({activeTemplate, user}) => {
  const {config} = useConfig();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password] = useState(() => generatePassword(true, true, true, true, 15));

  const emailPattern = `(Credentials to ${activeTemplate.name})

Login: ${login || '[XXXXX]'}

Link: ${activeTemplate.link}

Best regards
${user.name}`;

  const smsPattern = `(Credentials to ${activeTemplate.name})

Password: ${password}

Best regards
${user.name}`;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input fullWidth label="Login" value={login} onChange={e => setLogin(e.target.value)} />
      <Input
        fullWidth
        readOnly
        label="Password"
        value={password}
        onFocus={e => {
          copyToClipboard(e.target.value);
          e.target.select();
        }}
      />
      <TextArea fullWidth readOnly label="Preview" value={emailPattern} className="md:col-span-2" />
      <Input fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input fullWidth label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <Button
        primary
        onClick={() => sendEmail(email, `Credentials to ${activeTemplate.name}`, emailPattern)}
      >
        Send Email
      </Button>
      <Button
        primary
        onClick={() =>
          sendEmail(
            `${normalizeNumber(phone)}@${config.sms_domain}`,
            `Credentials to ${activeTemplate.name}`,
            smsPattern
          )
        }
      >
        Send SMS
      </Button>
    </div>
  );
};

export default TemplatesGenerator;
