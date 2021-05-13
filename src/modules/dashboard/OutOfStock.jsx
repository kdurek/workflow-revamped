import PropTypes from 'prop-types';

import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import formatToCopyable from '@/modules/dashboard/utils/formatToCopyable';

const OutOfStock = ({tonersList}) => {
  return (
    <Card>
      <div className="text-xl font-medium text-center">Nearly or out of stock, please resupply</div>
      <div className="my-4 divide-y divide-gray-200 bg-gra divide-solid">
        {tonersList?.map(toner => (
          <div key={toner._id} className="flex items-center gap-4 py-2">
            <div className="flex items-center justify-center w-10 h-10 font-bold bg-gray-200 shadow-inner rounded-xl">
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
  tonersList: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      code: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};

OutOfStock.defaultProps = {
  tonersList: [],
};

export default OutOfStock;
