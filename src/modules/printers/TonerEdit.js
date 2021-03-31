import {Controller, useForm} from 'react-hook-form';
import {useEffect} from 'react';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import usePrinterActions from '@/modules/printers/hooks/usePrinterActions';
import useToners from '@/modules/reactQuery/queries/useToners';

const TonerEdit = () => {
  const {data: tonersList} = useToners();
  const [open, toggle] = useToggle(false);
  const {control, errors, handleSubmit, setValue, watch} = useForm();
  const selectedToner = watch('toner');
  const {handleTonerEdit, handleTonerDelete} = usePrinterActions({
    selectedToner,
    toggle,
  });

  useEffect(() => {
    setValue('code', selectedToner?.code);
    setValue('color', selectedToner?.color);
    setValue('amount', selectedToner?.amount);
  }, [selectedToner]);

  return (
    <>
      <Button onClick={toggle}>Edit Toner</Button>
      <Modal open={open} setOpen={toggle}>
        <Modal.Title>Edit Toner</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handleTonerEdit)}>
          <Controller
            name="toner"
            control={control}
            defaultValue={''}
            render={({onChange, value}) => (
              <Select
                label="Selected Toner"
                onChange={onChange}
                value={value}
                optionLabel="code"
                options={tonersList}
              />
            )}
          />
          {selectedToner && (
            <>
              <Modal.Description>Details</Modal.Description>
              <Controller
                name="code"
                control={control}
                defaultValue={selectedToner.code}
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
                defaultValue={selectedToner.color}
                render={({onChange, value}) => (
                  <Select
                    label={'Color'}
                    onChange={onChange}
                    value={value}
                    options={['Black', 'Cyan', 'Magenta', 'Yellow']}
                  />
                )}
              />
              <Controller
                name="amount"
                control={control}
                defaultValue={selectedToner.amount}
                rules={{required: true}}
                render={({onChange, value}) => (
                  <Input label={'Amount'} onChange={onChange} value={value} />
                )}
              />
            </>
          )}
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
            Cancel
          </Button>
          {selectedToner && (
            <>
              <Button fullWidth variant="danger" onClick={handleTonerDelete}>
                Delete
              </Button>
              <Button fullWidth variant="primary" onClick={handleSubmit(handleTonerEdit)}>
                Submit
              </Button>
            </>
          )}
        </Modal.Buttons>
      </Modal>
    </>
  );
};

export default TonerEdit;
