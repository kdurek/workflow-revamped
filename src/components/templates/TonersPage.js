import {useState} from 'react';
import Card from '@/elements/Card';
import Input from '@/elements/Input';
import Toner from '@/elements/Toner';
import Select from '@/elements/Select';
import Printer from '@/elements/Printer';

const TonersPage = ({printersList, tonersList, tonersUnset}) => {
  const [filterSearch, setFilterSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterColor, setFilterColor] = useState('');

  return (
    <div>
      <Card className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-rows-1 md:grid-cols-6">
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
          options={tonersList}
        />
        <Select
          fullWidth
          label={'Color'}
          value={filterColor}
          setValue={setFilterColor}
          options={tonersList}
        />
      </Card>

      <div className="flex flex-col gap-4 mt-4">
        {printersList.map(printer => (
          <Printer
            key={printer.id}
            printer={printer}
            tonersList={tonersList}
            filterSearch={filterSearch}
            filterBrand={filterBrand}
            filterColor={filterColor}
          />
        ))}
      </div>
      <div className="grid h-full grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {tonersList
          .filter(toner => !tonersUnset.includes(toner.id))
          .map(toner => (
            <Toner toner={toner} key={toner.id} />
          ))}
      </div>
    </div>
  );
};

export default TonersPage;
