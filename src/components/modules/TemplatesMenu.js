import classNames from 'classnames';

const TemplatesMenu = ({cmsList, activeTemplate, setActiveTemplate}) => {
  return (
    <div className="space-y-3">
      {cmsList.map((cms, i) => (
        <div
          key={i}
          className={classNames(
            'flex transition-all transform rounded-xl  hover:bg-coolGray-50 hover:shadow-sm',
            {
              'bg-coolGray-100 hover:bg-coolGray-100 shadow-inner hover:shadow-inner':
                activeTemplate === cms,
            }
          )}
        >
          <button
            onClick={() => setActiveTemplate(cms)}
            className={classNames('w-full py-3 pl-3 font-medium text-left')}
          >
            {cms.name}
          </button>
          {activeTemplate === cms && (
            <button
              className={classNames('w-16 hover:bg-coolGray-200 rounded-xl', {
                'bg-coolGray-100 hover:bg-coolGray-100 hover:shadow-inner': activeTemplate === cms,
              })}
            >
              <a href={cms.link} target="_blank" rel="noopener noreferrer">
                <span className="align-middle material-icons">keyboard_arrow_right</span>
              </a>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TemplatesMenu;
