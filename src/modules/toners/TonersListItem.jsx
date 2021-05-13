import {useRouter} from 'next/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import getTonerColor from '@/modules/toners/utils/getTonerColor';

const TonersListItem = ({toner}) => {
  const router = useRouter();

  const handleTonerClick = () => {
    router.push(`/toners/${toner._id}`);
  };

  return (
    <button type="button" onClick={handleTonerClick}>
      <div
        className={classNames(
          'flex hover:bg-blue-200 transition items-center justify-between shadow h-16 bg-gray-100 rounded-xl overflow-hidden'
        )}
      >
        <span className="px-4 text-2xl font-medium">{toner.code}</span>
        <div
          className={`w-16 h-16 p-1 flex items-center justify-center ${getTonerColor(toner.color)}`}
        >
          <span className="text-2xl font-medium">{toner.amount}</span>
        </div>
      </div>
    </button>
  );
};

TonersListItem.propTypes = {
  toner: PropTypes.shape({
    _id: PropTypes.string,
    amount: PropTypes.number,
    code: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default TonersListItem;
