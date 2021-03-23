import Button from '@/components/Button';
import Card from '@/components/Card';
import Square from '@/components/Square';
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
      <div className="text-xl font-medium text-center">Nearly or out of stock, please resupply</div>
      <div className="my-4 divide-y divide-coolGray-200 divide-solid">
        {tonersList?.map(toner => (
          <div key={toner._id} className="flex items-center gap-4 py-2">
            <Square p={4} className="bg-coolGray-200">
              {toner.amount}
            </Square>
            <span className="text-2xl font-medium">{toner.code}</span>
          </div>
        ))}
      </div>
      <Button
        fullWidth
        variant="primary"
        label={'Copy list'}
        onClick={() => formatToCopyable(tonersList)}
      />
    </Card>
  );
};

export default OutOfStock;
