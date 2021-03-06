import Card from '@/components/Card';
import PrinterEdit from '@/components/Printers/PrinterEdit';
import Toner from '@/components/Printers/Toner';

const Printer = ({updatePrinter, useToner, printer, uncategorizedToners}) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{`${printer.brand} ${printer.model}`}</span>
        <PrinterEdit
          updatePrinter={updatePrinter}
          printer={printer}
          uncategorizedToners={uncategorizedToners}
        />
      </div>
      {printer.toners.length ? (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {printer.toners
            // .sort((a, b) =>
            //   a.color > b.color ? 1 : a.color === b.color ? (a.size > b.size ? 1 : -1) : -1
            // )
            .map(toner => (
              <Toner key={toner._id} useToner={useToner} toner={toner} />
            ))}
        </div>
      ) : (
        <p className="text-xl font-medium">
          No toners are associated to this printer, assign some!
        </p>
      )}
    </Card>
  );
};

export default Printer;
