import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';
import PropTypes from 'prop-types';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import usePrinterActions from '@/modules/printers/hooks/usePrinterActions';
import useTonersUncategorized from '@/modules/reactQuery/queries/useTonersUncategorized';

const PrinterEdit = ({printer}) => {
  const {data: uncategorizedToners} = useTonersUncategorized();
  const {control, errors, handleSubmit} = useForm();
  const [open, toggle] = useToggle(false);
  const [editToners, setEditToners] = useState('');
  const {
    handlePrinterEdit,
    handlePrinterDelete,
    handlePushToner,
    handlePullToner,
  } = usePrinterActions({printer, toggle});

  return (
    <>
      <Button square onClick={toggle}>
        <span className="align-middle material-icons">more_vert</span>
      </Button>
      <Modal open={open} setOpen={toggle}>
        <Modal.Title>Edit Printer</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handlePrinterEdit)}>
          <Modal.Description>Details</Modal.Description>
          <Controller
            name="brand"
            control={control}
            defaultValue={printer.brand}
            render={({onChange, value}) => (
              <Select label={'Brand'} onChange={onChange} value={value} options={['Xerox', 'HP']} />
            )}
          />
          <Controller
            name="model"
            control={control}
            defaultValue={printer.model}
            rules={{required: {value: true, message: 'Model is required'}}}
            render={({onChange, value}) => (
              <Input
                error={errors?.model?.message}
                label={'Model'}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <input type="submit" className="hidden" />
        </form>
        <div className="space-y-4">
          <Modal.Description>Toners</Modal.Description>
          <div className="divide-y divide-gray-300 divide-solid">
            {printer.toners.map(toner => (
              <div key={toner._id} className="flex items-center gap-2">
                <button onClick={() => handlePullToner(toner._id)}>
                  <span className="flex items-center justify-center w-10 h-10 rounded-md material-icons hover:bg-gray-200">
                    close
                  </span>
                </button>
                <span className="font-medium">{toner.code}</span>
              </div>
            ))}
          </div>
          {!!uncategorizedToners?.length && (
            <div className="flex gap-4">
              <Select
                label={'Add toner'}
                value={editToners}
                onChange={setEditToners}
                options={[...new Set(uncategorizedToners?.map(toner => toner.code))]}
              />
              <div className="self-end">
                <Button
                  onClick={() => {
                    if (editToners !== '') {
                      const toner = uncategorizedToners.find(toner => toner.code === editToners);
                      handlePushToner(toner._id);
                      setEditToners('');
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
            Cancel
          </Button>
          <Button fullWidth variant="danger" onClick={handlePrinterDelete}>
            Delete
          </Button>
          <Button fullWidth variant="primary" onClick={handleSubmit(handlePrinterEdit)}>
            Submit
          </Button>
        </Modal.Buttons>
      </Modal>
    </>
  );
};

PrinterEdit.propTypes = {
  printer: PropTypes.object.isRequired,
};

export default PrinterEdit;
