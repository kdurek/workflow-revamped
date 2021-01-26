import {useState} from 'react';
import classNames from 'classnames';
import Card from '../elements/Card';
import TemplatesGenerator from '../modules/TemplatesGenerator';

const Templates = ({cmsList}) => {
  const [activeTemplate, setActiveTemplate] = useState(cmsList[0]);

  return (
    <div className="flex gap-4">
      <Card className="space-y-2 w-96">
        {cmsList.map((cms, i) => (
          <button
            key={i}
            onClick={() => setActiveTemplate(cms)}
            className={classNames(
              'w-full py-3 font-medium text-center transition-all rounded-xl transform text-coolGray-600 hover:bg-blue-200',
              {'bg-blue-300 hover:bg-blue-300': activeTemplate === cms}
            )}
          >
            {cms.name}
          </button>
        ))}
      </Card>
      <Card className="w-full">
        <TemplatesGenerator activeTemplate={activeTemplate} />
      </Card>
    </div>
  );
};

export default Templates;
