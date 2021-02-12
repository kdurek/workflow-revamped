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
  const [phone, setPhone] = useState('');
  const [password] = useState(() => generatePassword(true, true, true, true, 15));

  const pattern = `(Credentials to ${activeTemplate.name})

Login: ${login || '[XXXXX]'}
Password: ${password}

Link: ${activeTemplate.link}

Best regards
${user.name}`;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        fullWidth
        label="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Enter user login..."
      />
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
      <TextArea fullWidth readOnly label="Preview" value={pattern} className="md:col-span-2" />
      <Input fullWidth label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <Button
        primary
        onClick={() =>
          sendEmail(
            `${normalizeNumber(phone)}@${config.sms_domain}`,
            `Credentials to ${activeTemplate.name}`,
            pattern
          )
        }
      >
        Send Email
      </Button>
    </div>
  );
};

export default TemplatesGenerator;
