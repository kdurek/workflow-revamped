import {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/components/Input';
import normalizeNumber from '@/utils/normalizeNumber';
import Select from '@/components/Select';
import sendEmail from '@/utils/sendEmail';
import useCms from '@/hooks/useCms';

const TemplateCms = ({user}) => {
  const {data: cmsList} = useCms();

  const [selectedCms, setSelectedCms] = useState();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(() => generatePassword(true, true, true, true, 15));

  const resetForm = () => {
    setLogin('');
    setEmail('');
    setPhone('');
    setPassword(generatePassword(true, true, true, true, 15));
    setSelectedCms();
  };

  const templateHeader = `(Credentials to ${selectedCms?.name})\n`;
  const templateLogin = `Login: ${login}\n`;
  const templateLink = `Link: ${selectedCms?.link}\n`;
  const templatePassword = `Password: ${password}\n`;
  const templateFooter = `Best regards\n${user.name}`;

  const patternEmail = [templateHeader, templateLogin, templateLink, templateFooter].join('\n');
  const patternSms = [templateHeader, templatePassword, templateFooter].join('\n');

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4">
        <Select
          label="Selected CMS"
          onChange={setSelectedCms}
          value={selectedCms}
          optionLabel="name"
          options={cmsList}
        />
        {selectedCms && (
          <a
            className="self-end"
            target="_blank"
            href={selectedCms?.link}
            rel="noopener noreferrer"
          >
            <Button square>
              <span className="material-icons">chevron_right</span>
            </Button>
          </a>
        )}
      </div>
      {selectedCms && (
        <div className="space-y-4">
          <Input label={'Login'} onChange={setLogin} value={login} />
          <Input label={'Email'} onChange={setEmail} value={email} />
          <Input label={'Phone'} onChange={setPhone} value={phone} />
          <Input
            readOnly
            label={'Password'}
            defaultValue={password}
            onClick={e => {
              copyToClipboard(e.target.value);
              e.target.select();
            }}
          />
          <div className="flex gap-4">
            <Button
              fullWidth
              variant="primary"
              onClick={() => {
                if (normalizeNumber(phone).length === 9) {
                  sendEmail(email, templateHeader, patternEmail);
                }
              }}
            >
              Send Login
            </Button>
            <Button
              fullWidth
              variant="primary"
              onClick={() => {
                if (normalizeNumber(phone).length === 9) {
                  sendEmail(
                    `${normalizeNumber(phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
                    templateHeader,
                    patternSms
                  );
                }
              }}
            >
              Send Password
            </Button>
            <Button square onClick={resetForm}>
              <span className="material-icons">cached</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

TemplateCms.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TemplateCms;
