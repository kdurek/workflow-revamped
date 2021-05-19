import classNames from 'classnames';
import PropTypes from 'prop-types';

const Card = ({children, className, label}) => {
  return (
    <div className={classNames('p-4 rounded-xl bg-white shadow', className)}>
      <>
        <span className="text-xl font-medium select-none">{label}</span>
        {children}
      </>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.object)]),
  label: PropTypes.string,
};

Card.defaultProps = {
  className: undefined,
  label: undefined,
};

export default Card;
