import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Square from 'src/components/Square';
import copyToClipboard from '@/utils/copyToClipboard';

const formatToCopyable = tonersList => {
  let data = [];
  tonersList.forEach(toner => {
    data.push(`${toner.brand} ${toner.code} - ${2 - toner.amount}`);
  });
  copyToClipboard(data.join('\n'));
};

const OutOfStock = ({tonersList}) => {
  return (
    <Card>
      <div className="text-xl font-medium text-center ">
        Nearly or out of stock, please resupply
      </div>
      <div className="my-4 divide-y divide-coolGray-200 divide-solid">
        {tonersList?.map(toner => (
          <div key={toner._id} className="flex items-center gap-4 py-2">
            <Square p={4} className="bg-coolGray-200">
              {toner.amount}
            </Square>
            <span className="text-2xl">{toner.code}</span>
          </div>
        ))}
      </div>
      <Button primary fullWidth onClick={() => formatToCopyable(tonersList)}>
        Copy list
      </Button>
    </Card>
  );
};

export default OutOfStock;
