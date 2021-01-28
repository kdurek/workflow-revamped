import {useState} from 'react';
import Card from '../elements/Card';
import TemplatesMenu from '../modules/TemplatesMenu';
import TemplatesGenerator from '../modules/TemplatesGenerator';

const Templates = ({cmsList, user, config}) => {
  const [activeTemplate, setActiveTemplate] = useState(cmsList[0]);

  return (
    <div className="flex gap-4">
      <Card className="w-40 md:w-96">
        <TemplatesMenu
          cmsList={cmsList}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
      </Card>
      <Card className="w-full">
        <TemplatesGenerator activeTemplate={activeTemplate} user={user} config={config} />
      </Card>
    </div>
  );
};

export default Templates;
