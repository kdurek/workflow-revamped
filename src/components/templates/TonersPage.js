import {useState} from 'react';
import Card from '@/elements/Card';
import Input from '@/elements/Input';
import Toner from '@/elements/Toner';

const TonersPage = ({tonersList}) => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <Card>
        <Input value={search} onChange={e => setSearch(e.target.value)} label={'Search'}></Input>
      </Card>
      <div className="grid h-full grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {tonersList
          .filter(toner => toner.code.toLowerCase().includes(search.toLowerCase()))
          .map((toner, i) => (
            <Toner toner={toner} key={i} />
          ))}
      </div>
    </div>
  );
};

export default TonersPage;
