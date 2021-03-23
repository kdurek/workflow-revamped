import {useQuery} from 'react-query';
import {useState} from 'react';
import PropTypes from 'prop-types';

import {getCms} from '@/services/templateService';
import Button from '@/components/Button';
import copyToClipboard from '@/utils/copyToClipboard';
import generatePassword from '@/utils/generatePassword';
import Input from '@/components/Input';
import normalizeNumber from '@/utils/normalizeNumber';
import Select from '@/components/Select';
import sendEmail from '@/utils/sendEmail';

const TemplateCms = ({user}) => {
  const {data: cmsList} = useQuery('template-cms', getCms);

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
          setValue={setSelectedCms}
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
            <Button label={<span className="material-icons">chevron_right</span>} square />
          </a>
        )}
      </div>
      {selectedCms && (
        <div className="space-y-4">
          <Input label={'Login'} setValue={setLogin} value={login} />
          <Input label={'Email'} setValue={setEmail} value={email} />
          <Input label={'Phone'} setValue={setPhone} value={phone} />
          <Input
            label={'Password'}
            setValue={setPhone}
            value={password}
            onClick={e => {
              copyToClipboard(e.target.value);
              e.target.select();
            }}
          />
          <div className="flex gap-4">
            <Button
              primary
              fullWidth
              label={'Send Login'}
              onClick={() => sendEmail(email, templateHeader, patternEmail)}
            />
            <Button
              primary
              fullWidth
              label={'Send Password'}
              onClick={() =>
                sendEmail(
                  `${normalizeNumber(phone)}@${process.env.NEXT_PUBLIC_SMS_DOMAIN}`,
                  templateHeader,
                  patternSms
                )
              }
            />
            <Button
              label={<span className="material-icons">cached</span>}
              square
              onClick={resetForm}
            />
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
