import {Controller, useForm} from 'react-hook-form';
import {useEffect} from 'react';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import SelectNative from '@/common/components/SelectNative';
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
    setValue,
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
            render={({field: {onChange, value}}) => (
              <Select
                value={value}
                onChange={onChange}
                label="Selected Toner"
                optionLabel="code"
                options={tonersList}
              />
            )}
          />
          {selectedToner && (
            <>
              <Modal.Description>Details</Modal.Description>
              <Input
                error={errors?.code?.message}
                label={'Code'}
                defaultValue={selectedToner.code}
                register={register('code', {
                  required: {value: true, message: 'Code is required'},
                })}
              />
              <SelectNative
                label="Color"
                options={['Black', 'Cyan', 'Magenta', 'Yellow']}
                register={register('color')}
              />
              <Input
                error={errors?.amount?.message}
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
