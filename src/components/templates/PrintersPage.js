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
      <Card className="flex flex-col gap-4 md:flex-row">
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
