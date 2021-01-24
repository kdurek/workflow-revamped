import {useState} from 'react';
import Input from '../elements/Input';
import generatePassword from '../../utils/generatePassword';

const Generator = ({activeTemplate}) => {
  const [name, setName] = useState();
  const [login, setLogin] = useState('[CMS LOGIN]');
  const [link, setLink] = useState('[CMS LINK]');
  const [phone, setPhone] = useState('');
  const [password] = useState(() => generatePassword(true, true, true, true, 15));

  const pattern = `(Credentials to ${activeTemplate.name})
Login: ${login}
Password: ${password}
Link: ${link}
Best regards
Template Name`;

  return (
    <div className="grid h-full grid-cols-2 grid-rows-5 gap-4">
      <Input label="Phone" placeholder="Enter user phone..." className="col-span-2" />
      <Input label="Login" placeholder="Enter user login..." />
      <Input label="Password" value={password} />
      <Input multiline label="Preview" value={pattern} className="col-span-2 row-span-2" />
    </div>
  );
};

export default Generator;
