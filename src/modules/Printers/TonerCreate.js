import {Controller, useForm} from 'react-hook-form';

import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import {useToggle} from '@/common/hooks/useToggle';
import usePrinterActions from './hooks/usePrinterActions';

const TonerCreate = () => {
  const {control, errors, handleSubmit} = useForm();
  const [open, toggle] = useToggle(false);
  const {handleTonerCreate} = usePrinterActions({toggle});

  return (
    <>
      <Button onClick={toggle}>Create Toner</Button>
      <Modal open={open} setOpen={toggle}>
        <Modal.Title>Create Toner</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handleTonerCreate)}>
          <Modal.Description>Details</Modal.Description>
          <Controller
            name="code"
            control={control}
            defaultValue={''}
            rules={{required: {value: true, message: 'Code is required'}}}
            render={({onChange, value}) => (
              <Input
                error={errors?.code?.message}
                label={'Code'}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            defaultValue={'Black'}
            render={({onChange, value}) => (
              <Select
                label={'Color'}
                onChange={onChange}
                value={value}
                options={['Black', 'Cyan', 'Magenta', 'Yellow']}
              />
            )}
          />
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
            Cancel
          </Button>
          <Button fullWidth variant="primary" onClick={handleSubmit(handleTonerCreate)}>
            Submit
          </Button>
        </Modal.Buttons>
      </Modal>
    </>
  );
};

export default TonerCreate;
