import usePrinterCreate from '@/modules/reactQuery/mutations/usePrinterCreate';
import usePrinterDelete from '@/modules/reactQuery/mutations/usePrinterDelete';
import usePrinterUpdate from '@/modules/reactQuery/mutations/usePrinterUpdate';
import useTonerCreate from '@/modules/reactQuery/mutations/useTonerCreate';
import useTonerDelete from '@/modules/reactQuery/mutations/useTonerDelete';
import useTonerUpdate from '@/modules/reactQuery/mutations/useTonerUpdate';

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
    updatePrinter({id: printer._id, updatedPrinter: data});

    toggle();
  };

  const handlePrinterDelete = () => {
    deletePrinter(printer._id);

    toggle();
  };

  const handlePushToner = tonerId => {
    const updatedToners = [...printer.toners.map(toner => toner._id), tonerId];
    updatePrinter({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handlePullToner = tonerId => {
    const updatedToners = printer.toners.filter(toner => toner._id !== tonerId);
    updatePrinter({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handleTonerUse = () => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateToner({id: toner._id, updatedToner});

    toggle();
  };

  const handleTonerCreate = async data => {
    createToner(data);

    toggle();
  };

  const handleTonerEdit = async data => {
    delete data.toner;

    updateToner({id: selectedToner._id, updatedToner: data});

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
