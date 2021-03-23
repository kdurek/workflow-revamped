import classNames from 'classnames';

const Card = ({children, className}) => {
  return <div className={classNames('p-2 rounded-xl bg-white shadow', className)}>{children}</div>;
};

export default Card;
