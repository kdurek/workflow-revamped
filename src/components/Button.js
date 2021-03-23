import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({className, fullWidth, label, onClick, square, type, variant}) => {
  const VARIANT_MAPS = {
    default: 'bg-coolGray-100 hover:bg-coolGray-200 shadow-inner',
    primary: 'bg-blue-400 text-white hover:bg-blue-500 hover:shadow-lg',
    danger: 'bg-red-400 text-white hover:bg-red-500 hover:shadow-lg',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        'flex items-center justify-center rounded-xl px-4 py-2 uppercase font-medium duration-300 transition-all focus:ring-2',
        className,
        VARIANT_MAPS[variant],
        {
          'w-full': fullWidth,
          'w-10 h-10': square,
        }
      )}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  square: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
};

Button.defaultProps = {
  label: 'button',
  variant: 'default',
};

export default Button;
