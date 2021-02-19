import {useState} from 'react';
import Card from '@/elements/Card';
import Input from '@/elements/Input';
import Select from '@/elements/Select';
import Printers from '@/elements/Printers';

const PrintersPage = ({printersList, tonersList, tonersUnset}) => {
  const [filterSearch, setFilterSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterColor, setFilterColor] = useState('');

  return (
    <div>
      <Card className="grid grid-cols-2 grid-rows-2 gap-4 rounded-xl md:grid-rows-1 md:grid-cols-6">
        <Input
          fullWidth
          value={filterSearch}
          onChange={e => setFilterSearch(e.target.value)}
          label={'Search for model or code'}
          className="col-span-2 md:col-span-4"
        />
        <Select
          fullWidth
          label={'Brand'}
          value={filterBrand}
          setValue={setFilterBrand}
          options={['Xerox', 'HP']}
        />
        <Select
          fullWidth
          label={'Color'}
          value={filterColor}
          setValue={setFilterColor}
          options={['Black', 'Cyan', 'Magenta', 'Yellow']}
        />
      </Card>

      <div className="flex flex-col gap-4 mt-4">
        {printersList.map(printer => (
          <Printers
            key={printer.id}
            printer={printer}
            tonersList={tonersList}
            tonersUnset={tonersUnset}
            filterSearch={filterSearch}
            filterBrand={filterBrand}
            filterColor={filterColor}
          />
        ))}
      </div>
    </div>
  );
};

export default PrintersPage;
