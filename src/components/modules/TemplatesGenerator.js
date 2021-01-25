import {useState} from 'react';
import Input from '../elements/Input';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import generatePassword from '../../utils/generatePassword';
import normalizeNumber from '../../utils/normalizeNumber';
import sendEmail from '../../utils/sendEmail';

const TemplatesGenerator = ({activeTemplate}) => {
  const [login, setLogin] = useState('');
  const [phone, setPhone] = useState('');
  const [password] = useState(() => generatePassword(true, true, true, true, 15));

  const pattern = `(Credentials to ${activeTemplate.name})

Login: ${login || 'Login'}
Password: ${password}

Link: ${activeTemplate.link}

Best regards
Template Name`;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Enter user login..."
      />
      <Input
        readOnly
        label="Password"
        value={password}
        onFocus={e => {
          e.target.select();
        }}
      />
      <TextArea readOnly label="Preview" value={pattern} className="col-span-2" />
      <Input
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Enter user phone..."
      />
      <Button
        onClick={() =>
          sendEmail(
            `${normalizeNumber(phone)}@template.sms.domain`,
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
