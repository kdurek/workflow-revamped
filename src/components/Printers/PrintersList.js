import Printer from '@/components/Printers/Printer';
import usePrinters from '@/hooks/usePrinters';

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
