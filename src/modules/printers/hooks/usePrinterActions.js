import usePrinterCreate from '@/modules/reactQuery/mutations/useCreatePrinter';
import usePrinterDelete from '@/modules/reactQuery/mutations/useDeletePrinter';
import usePrinterUpdate from '@/modules/reactQuery/mutations/useUpdatePrinter';
import useTonerCreate from '@/modules/reactQuery/mutations/useCreateToner';
import useTonerDelete from '@/modules/reactQuery/mutations/useDeleteToner';
import useTonerUpdate from '@/modules/reactQuery/mutations/useUpdateToner';

const usePrinterActions = ({printer, selectedToner, toggle, toner}) => {
  const {mutate: createPrinter} = usePrinterCreate();
  const {mutate: createToner} = useTonerCreate();
  const {mutate: deletePrinter} = usePrinterDelete();
  const {mutate: updatePrinter} = usePrinterUpdate();
  const {mutate: updateToner} = useTonerUpdate();
  const {mutate: deleteToner} = useTonerDelete();

  const handlePrinterCreate = data => {
    createPrinter(data);

    toggle();
  };

  const handlePrinterEdit = data => {
    updatePrinter({_id: printer._id, data});

    toggle();
  };

  const handlePrinterDelete = () => {
    deletePrinter(printer._id);

    toggle();
  };

  const handlePushToner = tonerId => {
    const updatedToners = [...printer.toners.map(toner => toner._id), tonerId];
    updatePrinter({_id: printer._id, data: {toners: updatedToners}});
  };

  const handlePullToner = tonerId => {
    const updatedToners = printer.toners.filter(toner => toner._id !== tonerId);
    updatePrinter({_id: printer._id, data: {toners: updatedToners}});
  };

  const handleTonerUse = () => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateToner({_id: toner._id, data: {updatedToner}});

    toggle();
  };

  const handleTonerCreate = async data => {
    createToner(data);

    toggle();
  };

  const handleTonerEdit = async data => {
    delete data.toner;

    updateToner({_id: selectedToner._id, data});

    toggle();
  };

  const handleTonerDelete = async () => {
    deleteToner(selectedToner._id);

    toggle();
  };

  const printerActions = {
    handlePrinterCreate,
    handlePrinterEdit,
    handlePrinterDelete,
    handlePushToner,
    handlePullToner,
    handleTonerUse,
    handleTonerCreate,
    handleTonerEdit,
    handleTonerDelete,
  };

  return {...printerActions};
};

export default usePrinterActions;
