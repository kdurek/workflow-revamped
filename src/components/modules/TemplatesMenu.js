import classNames from 'classnames';

const TemplatesMenu = ({cmsList, activeTemplate, setActiveTemplate}) => {
  return (
    <div className="">
      {cmsList.map((cms, i) => (
        <button
          key={i}
          onClick={() => setActiveTemplate(cms)}
          className={classNames(
            'w-full py-3 font-medium text-center transition-all rounded-xl transform text-coolGray-600 hover:bg-coolGray-50 hover:shadow-sm',
            {
              'bg-coolGray-100 hover:bg-coolGray-100 shadow-inner hover:shadow-inner':
                activeTemplate === cms,
            }
          )}
        >
          {cms.name}
        </button>
      ))}
    </div>
  );
};

export default TemplatesMenu;
