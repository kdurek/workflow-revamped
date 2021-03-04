const Card = ({children, className}) => {
  return <div className={`p-4 rounded-xl bg-white shadow-md ${className}`}>{children}</div>;
};

export default Card;
