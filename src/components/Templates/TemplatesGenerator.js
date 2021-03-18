import {useState} from 'react';

import Button from '@/components/Button';
import TemplatesInput from '@/components/Templates/TemplatesInput';
import TextArea from '@/components/TextArea';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import normalizeNumber from '@/utils/normalizeNumber';
import sendEmail from '@/utils/sendEmail';

const TemplatesGenerator = ({activeTemplate, user}) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(() => generatePassword(true, true, true, true, 15));

  const resetForm = () => {
    setLogin('');
    setEmail('');
    setPhone('');
    setPassword(generatePassword(true, true, true, true, 15));
  };

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
      <TemplatesInput
        fullWidth
        label="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
      />
      <div className="flex gap-2">
        <TemplatesInput
          fullWidth
          readOnly
          label="Password"
          value={password}
          onFocus={e => {
            copyToClipboard(e.target.value);
            e.target.select();
          }}
        />
        <Button label={<span className="material-icons">cached</span>} square onClick={resetForm} />
      </div>
      <TextArea fullWidth readOnly label="Preview" value={emailPattern} className="" />
      <TextArea fullWidth readOnly label="Preview" value={smsPattern} className="" />
      <TemplatesInput
        fullWidth
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TemplatesInput
        fullWidth
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <Button
        primary
        fullWidth
        label={'Send Email'}
        onClick={() => sendEmail(email, `Credentials to ${activeTemplate.name}`, emailPattern)}
      />
      <Button
        primary
        fullWidth
        label={'Send SMS'}
        onClick={() =>
          sendEmail(
            `${normalizeNumber(phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
            `Credentials to ${activeTemplate.name}`,
            smsPattern
          )
        }
      />
    </div>
  );
};

export default TemplatesGenerator;
