const Card = ({className, children}) => {
  return (
    <div
      className={`p-4 transition-all shadow rounded-xl bg-coolGray-200 hover:bg-coolGray-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
