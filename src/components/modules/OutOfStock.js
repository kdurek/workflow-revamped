import Button from '@/elements/Button';
import Card from '@/elements/Card';
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
      <div className="my-4 divide-y  divide-coolGray-200 divide-solid">
        {tonersList.map((toner, i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <div
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl bg-coolGray-200 shadow`}
            >
              <span className="absolute font-bold cursor-default">{toner.amount}</span>
            </div>
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
