import classNames from 'classnames';
import PropTypes from 'prop-types';

const Square = ({children, className, p}) => {
  return (
    <div
      className={classNames(
        `flex items-center justify-center rounded-xl ${p && `p-${p}`}`,
        className,
        {
          'p-6': !p,
        }
      )}
    >
      <div className="absolute font-bold">{children}</div>
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  p: PropTypes.number,
};

export default Square;
