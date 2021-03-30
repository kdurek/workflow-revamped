import usePrinterCreate from '@/modules/reactQuery/mutations/usePrinterCreate';
import usePrinterDelete from '@/modules/reactQuery/mutations/usePrinterDelete';
import usePrinterUpdate from '@/modules/reactQuery/mutations/usePrinterUpdate';
import useTonerCreate from '@/modules/reactQuery/mutations/useTonerCreate';
import useTonerDelete from '@/modules/reactQuery/mutations/useTonerDelete';
import useTonerUpdate from '@/modules/reactQuery/mutations/useTonerUpdate';

const usePrinterActions = ({printer, selectedToner, toggle, toner}) => {
  const createPrinterMutation = usePrinterCreate();
  const createTonerMutation = useTonerCreate();
  const deletePrinterMutation = usePrinterDelete();
  const updatePrinterMutation = usePrinterUpdate();
  const updateTonerMutation = useTonerUpdate();
  const deleteTonerMutation = useTonerDelete();

  const handlePrinterCreate = data => {
    createPrinterMutation.mutate(data);

    toggle();
  };

  const handlePrinterEdit = data => {
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: data});

    toggle();
  };

  const handlePrinterDelete = () => {
    deletePrinterMutation.mutate(printer._id);

    toggle();
  };

  const handlePushToner = tonerId => {
    const updatedToners = [...printer.toners.map(toner => toner._id), tonerId];
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handlePullToner = tonerId => {
    const updatedToners = printer.toners.filter(toner => toner._id !== tonerId);
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const handleTonerUse = () => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateTonerMutation.mutate({id: toner._id, updatedToner});

    toggle();
  };

  const handleTonerCreate = async data => {
    createTonerMutation.mutate(data);

    toggle();
  };

  const handleTonerEdit = async data => {
    delete data.toner;

    updateTonerMutation.mutate({id: selectedToner._id, updatedToner: data});

    toggle();
  };

  const handleTonerDelete = async () => {
    deleteTonerMutation.mutate(selectedToner._id);

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
