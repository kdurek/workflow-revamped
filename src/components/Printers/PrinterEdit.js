import {useQueryClient, useMutation} from 'react-query';
import {useState} from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Square from '@/components/Square';
import {updatePrinter} from 'src/services/printerService';

const getColor = color => {
  switch (color) {
    case 'Black':
      return 'bg-gray-400';
    case 'Cyan':
      return 'bg-cyan-200';
    case 'Magenta':
      return 'bg-fuchsia-200';
    case 'Yellow':
      return 'bg-yellow-200';

    default:
      return 'bg-transparent';
  }
};

const PrinterEdit = ({printer, uncategorizedToners}) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation(arg => updatePrinter(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });

  const [editModel, setEditModel] = useState(printer.model);
  const [editBrand, setEditBrand] = useState(printer.brand);
  const [editToners, setEditToners] = useState('');

  const handlePrinterEdit = () => {
    const updatedPrinter = {model: editModel, brand: editBrand};
    updateMutation.mutate({id: printer._id, updatedPrinter});
  };

  const handlePullToner = async tonerId => {
    const updatedToners = printer.toners.map(toner => toner._id);
    const pullTonerIndex = updatedToners.indexOf(tonerId);
    updatedToners.splice(pullTonerIndex, 1);
    updateMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handlePushToner = tonerId => {
    const updatedToners = printer.toners.map(toner => toner._id);
    updatedToners.push(tonerId);
    updateMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  return (
    <Modal
      buttonLabel={<span className="align-middle material-icons">more_vert</span>}
      buttonClass=" h-12 hover:bg-coolGray-200 transition-all duration-300 rounded-xl"
      submit={handlePrinterEdit}
    >
      <div className="flex flex-col gap-4">
        <p className="text-4xl ">Details</p>
        <Select
          fullWidth
          label={'Brand'}
          value={editBrand}
          setValue={setEditBrand}
          options={['Xerox', 'HP']}
        />
        <Input
          fullWidth
          label={'Model'}
          value={editModel}
          onChange={e => setEditModel(e.target.value)}
        />
        <p className="text-4xl ">Toners</p>
        {printer.toners.map(toner => (
          <div key={toner._id} className="flex flex-col gap-2 ">
            <div className="flex items-center gap-4">
              <Square p={4} className="bg-coolGray-200">
                {toner.amount}
              </Square>

              <p className="font-medium">{`${toner.code}`}</p>
              <button onClick={() => handlePullToner(toner._id)}>
                <span className="p-1 m-1 align-middle rounded-xl material-icons hover:bg-coolGray-50">
                  close
                </span>
              </button>
            </div>
          </div>
        ))}
        {!!uncategorizedToners?.length && (
          <div className="flex gap-4">
            <Select
              fullWidth
              label={'Add toner'}
              value={editToners}
              setValue={setEditToners}
              options={[...new Set(uncategorizedToners?.map(toner => toner.code))]}
            />
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
        )}
      </div>
    </Modal>
  );
};

export default PrinterEdit;
