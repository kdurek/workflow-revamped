import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';
import axios from 'axios';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import copyToClipboard from '@/common/utils/copyToClipboard';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';

const ResetTokenGenerator = () => {
  const {control, errors, handleSubmit} = useForm();
  const [open, toggle] = useToggle(false);

  const [resetTokenLink, setResetTokenLink] = useState();

  const getResetToken = email => {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/forgotpassword`, email);
  };

  const handleResetToken = async data => {
    const response = await getResetToken(data);
    const resetToken = response.data.resetToken;

    const resetTokenLink = `${window.location.href}?resetToken=${resetToken}`;
    setResetTokenLink(resetTokenLink);
    copyToClipboard(resetTokenLink);
  };

  // TODO: Extract logic

  return (
    <>
      <Button onClick={toggle}>Reset Token</Button>

      <Modal open={open} setOpen={toggle}>
        <Modal.Title>Get Reset Token</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handleResetToken)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
            Cancel
          </Button>
          {resetTokenLink && (
            <Button fullWidth variant="primary" onClick={() => copyToClipboard(resetTokenLink)}>
              Copy
            </Button>
          )}
          {!resetTokenLink && (
            <Button fullWidth variant="primary" onClick={handleSubmit(handleResetToken)}>
              Submit
            </Button>
          )}
        </Modal.Buttons>
      </Modal>
    </>
  );
};

export default ResetTokenGenerator;
