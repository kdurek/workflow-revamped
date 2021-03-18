import Card from '@/components/Card';
import PrinterCreate from '@/components/Printers/PrinterCreate';
import PrinterEdit from '@/components/Printers/PrinterEdit';
import Toner from '@/components/Printers/Toner';
import TonerCreate from '@/components/Printers/TonerCreate';
import TonerEdit from '@/components/Printers/TonerEdit';

const Printers = ({printersList, session, uncategorizedToners, useToner}) => {
  return (
    <div className="flex flex-col gap-4">
      {session.user.role === 'admin' && (
        <div className="flex gap-2 p-2 bg-white shadow rounded-xl">
          <PrinterCreate />
          <TonerCreate />
          <TonerEdit />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {printersList?.map(printer => (
          <Printer
            key={printer._id}
            printer={printer}
            session={session}
            uncategorizedToners={uncategorizedToners}
            useToner={useToner}
          />
        ))}
      </div>
    </div>
  );
};

const Printer = ({printer, session, uncategorizedToners, useToner}) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{`${printer.brand} ${printer.model}`}</span>
        {session.user.role === 'admin' && (
          <PrinterEdit printer={printer} uncategorizedToners={uncategorizedToners} />
        )}
      </div>
      {printer.toners.length ? (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {printer.toners.map(toner => (
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

export default Printers;
