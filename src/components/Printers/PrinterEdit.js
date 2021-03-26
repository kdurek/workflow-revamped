import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import usePrinterDelete from '@/hooks/usePrinterDelete';
import usePrinterUpdate from '@/hooks/usePrinterUpdate';
import useTonersUncategorized from '@/hooks/useTonersUncategorized';

const PrinterEdit = ({printer}) => {
  const {control, errors, handleSubmit} = useForm();
  const {data: uncategorizedToners} = useTonersUncategorized();
  const updatePrinterMutation = usePrinterUpdate();
  const deletePrinterMutation = usePrinterDelete();

  const [editToners, setEditToners] = useState('');

  const handlePrinterEdit = async data => {
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: data});
  };

  const handlePullToner = async tonerId => {
    const updatedToners = printer.toners.filter(toner => toner._id !== tonerId);
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handlePushToner = tonerId => {
    const updatedToners = [...printer.toners.map(toner => toner._id), tonerId];
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handlePrinterDelete = async printerId => {
    deletePrinterMutation.mutate(printerId);
  };

  return (
    <Modal
      buttonLabel={<span className="align-middle material-icons">more_vert</span>}
      buttonClass=" h-12 hover:bg-coolGray-200 transition-all duration-300 rounded-xl"
      submit={handleSubmit(handlePrinterEdit)}
    >
      <div className="relative flex flex-col gap-4">
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="flex justify-between">
            <legend className="text-4xl">Details</legend>
            <Button variant="danger" onClick={() => handlePrinterDelete(printer._id)}>
              Delete
            </Button>
          </div>
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
            rules={{required: true}}
            render={({onChange, value}) => (
              <Input label={'Model'} onChange={onChange} value={value} />
            )}
          />
          {errors.model && <span className="text-red-500">You must provide model</span>}
        </form>

        <div className="space-y-4">
          <p className="text-4xl">Toners</p>
          <div className="rounded-md ring-2 ring-coolGray-300 ring-opacity-50">
            {printer.toners.map(toner => (
              <div key={toner._id} className="flex items-center gap-2">
                <button onClick={() => handlePullToner(toner._id)}>
                  <span className="flex items-center justify-center w-10 h-10 rounded-md material-icons hover:bg-coolGray-200">
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
      </div>
    </Modal>
  );
};

PrinterEdit.propTypes = {
  printer: PropTypes.object.isRequired,
};

export default PrinterEdit;
