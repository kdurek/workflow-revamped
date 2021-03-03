import Printer from '@/components/Printers/Printer';
// import Card from '@/components/Card';
// import Input from '@/components/Input';
// import Select from '@/components/Select';

const Printers = ({onUse, printersList}) => {
  // const [filterSearch, setFilterSearch] = useState('');
  // const [filterBrand, setFilterBrand] = useState('');
  // const [filterColor, setFilterColor] = useState('');
  return (
    <div>
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

      <div className="flex flex-col gap-4 mt-4">
        {printersList.map(printer => (
          <Printer key={printer._id} onUse={onUse} printer={printer} />
        ))}
      </div>
    </div>
  );
};

export default Printers;
