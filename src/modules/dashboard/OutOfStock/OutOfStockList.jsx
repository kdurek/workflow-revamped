import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import formatToCopyable from '@/modules/dashboard/OutOfStock/utils/formatToCopyable';
import OutOfStockItem from '@/modules/dashboard/OutOfStock/OutOfStockItem';
import useTonersOutOfStock from '@/modules/reactQuery/queries/useTonersOutOfStock';

const OutOfStock = () => {
  const {data: tonersList} = useTonersOutOfStock();

  return (
    <Card>
      <div className="text-xl font-medium text-center">Nearly or out of stock, please resupply</div>
      <div className="my-4 divide-y divide-gray-200 bg-gra divide-solid">
        {tonersList.map(toner => (
          <OutOfStockItem key={toner._id} toner={toner} />
        ))}
      </div>
      <Button fullWidth variant="primary" onClick={() => formatToCopyable(tonersList)}>
        Copy list
      </Button>
    </Card>
  );
};

export default OutOfStock;
