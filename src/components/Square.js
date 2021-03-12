import classNames from 'classnames';

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

export default Square;
