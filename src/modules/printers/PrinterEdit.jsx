import {useForm} from 'react-hook-form';
import {useState} from 'react';
import PropTypes from 'prop-types';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import SelectNative from '@/common/components/SelectNative';
import usePrinterActions from '@/modules/printers/hooks/usePrinterActions';
import useTonersUncategorized from '@/modules/reactQuery/queries/useTonersUncategorized';

const PrinterEdit = ({printer}) => {
  const {data: uncategorizedToners} = useTonersUncategorized();
  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();
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
          <SelectNative
            label="Brand"
            defaultValue={printer.brand}
            options={['Xerox', 'HP']}
            register={register('brand')}
          />
          <Input
            error={errors?.model?.message}
            label="Model"
            defaultValue={printer.model}
            register={register('model', {required: {value: true, message: 'Model is required'}})}
          />
          <input type="submit" className="hidden" />
        </form>
        <div className="space-y-4">
          <Modal.Description>Toners</Modal.Description>
          <div className="divide-y divide-gray-300 divide-solid">
            {printer.toners.map(toner => (
              <div key={toner._id} className="flex items-center gap-2">
                <button type="button" onClick={() => handlePullToner(toner._id)}>
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
              <SelectNative
                label="Add toner"
                onChange={e => setEditToners(e.target.value)}
                options={[...new Set(uncategorizedToners?.map(toner => toner.code))]}
              />
              <div className="self-end">
                <Button
                  onClick={() => {
                    if (editToners !== '') {
                      const toner = uncategorizedToners.find(
                        uncategorizedToner => uncategorizedToner.code === editToners
                      );
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
  printer: PropTypes.shape({
    brand: PropTypes.string,
    model: PropTypes.string,
    toners: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        code: PropTypes.string,
        color: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PrinterEdit;
