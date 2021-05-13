import PropTypes from 'prop-types';

const OutOfStockItem = ({toner}) => {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex items-center justify-center w-10 h-10 font-bold bg-gray-200 shadow-inner rounded-xl">
        {toner.amount}
      </div>
      <span className="text-2xl font-medium">{toner.code}</span>
    </div>
  );
};

OutOfStockItem.propTypes = {
  toner: PropTypes.shape({
    amount: PropTypes.number,
    code: PropTypes.string,
  }).isRequired,
};

export default OutOfStockItem;
