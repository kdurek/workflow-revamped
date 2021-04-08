import classNames from 'classnames';
import PropTypes from 'prop-types';

const Card = ({children, className}) => {
  return <div className={classNames('p-2 rounded-xl bg-white shadow', className)}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.object)]),
};

Card.defaultProps = {
  className: undefined,
};

export default Card;
