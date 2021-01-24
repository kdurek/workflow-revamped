import {useState} from 'react';
import classNames from 'classnames';
import Card from '../elements/Card';
import Generator from '../modules/Generator';
import cmss from '../../../cmss.json';

const Templates = () => {
  const [activeTemplate, setActiveTemplate] = useState(cmss[0]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <Card className="">
        {cmss.map((cms, i) => (
          <button
            key={i}
            onClick={() => setActiveTemplate(cms)}
            className={classNames(
              'w-full py-3 font-medium text-center transition-all rounded-xl transform text-coolGray-600 hover:bg-coolGray-200',
              {'bg-coolGray-400 hover:bg-coolGray-400': activeTemplate === cms}
            )}
          >
            <p className="">{cms.name}</p>
          </button>
        ))}
      </Card>
      <Card className="col-span-5">
        <Generator activeTemplate={activeTemplate} />
      </Card>
    </div>
  );
};

export default Templates;
