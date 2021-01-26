const Card = ({className, children}) => {
  return <div className={`p-4 transition-all rounded-xl bg-blue-100 ${className}`}>{children}</div>;
};

export default Card;
