import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Card from '@/components/Card';
import copyToClipboard from '@/utils/copyToClipboard';
import useTonersOutOfStock from '@/hooks/useTonersOutOfStock';

const formatToCopyable = tonersList => {
  let data = [];
  tonersList.forEach(toner => {
    data.push(`${toner.brand} ${toner.code} - ${2 - toner.amount}`);
  });
  copyToClipboard(data.join('\n'));
};

const OutOfStock = () => {
  const {data: tonersList} = useTonersOutOfStock();

  return (
    <Card className="p-4">
      <div className="text-xl font-medium text-center">Nearly or out of stock, please resupply</div>
      <div className="my-4 divide-y divide-coolGray-200 divide-solid">
        {tonersList?.map(toner => (
          <div key={toner._id} className="flex items-center gap-4 py-2">
            <div className="flex items-center justify-center w-10 h-10 font-bold shadow-inner rounded-xl bg-coolGray-200">
              {toner.amount}
            </div>
            <span className="text-2xl font-medium">{toner.code}</span>
          </div>
        ))}
      </div>
      <Button fullWidth variant="primary" onClick={() => formatToCopyable(tonersList)}>
        Copy list
      </Button>
    </Card>
  );
};

OutOfStock.propTypes = {
  tonersList: PropTypes.array,
};

export default OutOfStock;
