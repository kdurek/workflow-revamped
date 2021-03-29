import Printer from '@/modules/printers/Printer';
import usePrinters from '@/common/hooks/usePrinters';

const PrintersList = () => {
  const {data: printersList} = usePrinters();

  return (
    <div className="flex flex-col gap-4">
      {printersList?.map(printer => (
        <Printer key={printer._id} printer={printer} />
      ))}
    </div>
  );
};

export default PrintersList;
