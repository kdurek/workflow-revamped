const Card = ({className, children}) => {
  return (
    <div className={`p-4 transition-all rounded-xl bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
