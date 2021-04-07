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
  const {
    control,
    formState: {errors},
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm();
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
            render={({field}) => (
              <Select {...field} label="Selected Toner" optionLabel="code" options={tonersList} />
            )}
          />
          {selectedToner && (
            <>
              <Modal.Description>Details</Modal.Description>
              <Input
                label={'Code'}
                defaultValue={selectedToner.code}
                register={register('code', {
                  required: {value: true, message: 'Code is required'},
                })}
              />
              <Controller
                name="color"
                control={control}
                defaultValue={selectedToner.color}
                render={({field}) => (
                  <Select
                    {...field}
                    label={'Color'}
                    options={['Black', 'Cyan', 'Magenta', 'Yellow']}
                  />
                )}
              />
              <Input
                label={'Amount'}
                defaultValue={selectedToner.amount}
                register={register('amount', {
                  required: {value: true, message: 'Amount is required'},
                })}
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
