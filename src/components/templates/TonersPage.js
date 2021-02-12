import {useState} from 'react';
import Card from '@/elements/Card';
import Input from '@/elements/Input';
import Toner from '@/elements/Toner';
import Select from '@/elements/Select';

const TonersPage = ({tonersList}) => {
  const [search, setSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterColor, setFilterColor] = useState('');

  return (
    <div>
      <Card className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-rows-1 md:grid-cols-6">
        <Input
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          label={'Search'}
          className="col-span-2 md:col-span-4"
        />
        <Select
          fullWidth
          label={'Color'}
          value={filterColor}
          setValue={setFilterColor}
          options={tonersList}
        />
        <Select
          fullWidth
          label={'Brand'}
          value={filterBrand}
          setValue={setFilterBrand}
          options={tonersList}
        />
      </Card>
      <div className="grid h-full grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {tonersList
          .filter(toner => toner.color.includes(filterColor))
          .filter(toner => toner.brand.includes(filterBrand))
          .filter(toner => toner.code.toLowerCase().includes(search.toLowerCase()))
          .map((toner, i) => (
            <Toner toner={toner} key={i} />
          ))}
      </div>
    </div>
  );
};

export default TonersPage;
