import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({children, fullWidth, onClick, square, type, variant}) => {
  const VARIANT_MAPS = {
    default: 'bg-gray-200 hover:bg-gray-300 text-gray-600 ring-gray-300',
    primary: 'bg-blue-500 hover:bg-blue-600 text-blue-50 ring-blue-300',
    danger: ' bg-red-500 hover:bg-red-600 text-red-50 ring-red-300',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        'flex items-center justify-center rounded-xl px-4 py-2 uppercase hover:shadow-lg font-medium transition focus:ring-2',
        VARIANT_MAPS[variant],
        {
          'w-full': fullWidth,
          'w-10 h-10': square,
        }
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  square: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
};

Button.defaultProps = {
  children: 'button',
  variant: 'default',
};

export default Button;
