import Card from '@/components/Card';
import PrinterEdit from '@/components/Printers/PrinterEdit';
import Toner from '@/components/Printers/Toner';
import PrinterCreate from './PrinterCreate';
import TonerCreate from './TonerCreate';
import TonerEdit from './TonerEdit';
// import Input from '@/components/Input';
// import Select from '@/components/Select';

const Printers = ({printersList, session, uncategorizedToners, useToner}) => {
  // const [filterSearch, setFilterSearch] = useState('');
  // const [filterBrand, setFilterBrand] = useState('');
  // const [filterColor, setFilterColor] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 p-2 bg-white shadow rounded-xl">
        <PrinterCreate />
        <TonerCreate />
        <TonerEdit />
      </div>
      {/* <Card className="flex flex-col gap-4 md:flex-row">
        <Input
          fullWidth
          value={filterSearch}
          onChange={e => setFilterSearch(e.target.value)}
          label={'Search for model or code'}
          className="col-span-2 md:col-span-4"
        />
        <Select
          label={'Brand'}
          value={filterBrand}
          setValue={setFilterBrand}
          options={['Xerox', 'HP']}
        />
        <Select
          label={'Color'}
          value={filterColor}
          setValue={setFilterColor}
          options={['Black', 'Cyan', 'Magenta', 'Yellow']}
        />
      </Card> */}

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

export default Printers;
