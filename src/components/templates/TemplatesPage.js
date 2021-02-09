import {useState} from 'react';
import TemplatesMenu from '@/modules/TemplatesMenu';
import TemplatesGenerator from '@/modules/TemplatesGenerator';
import Card from '@/elements/Card';

const TemplatesPage = ({cmsList, user}) => {
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
        <TemplatesGenerator activeTemplate={activeTemplate} user={user} />
      </Card>
    </div>
  );
};

export default TemplatesPage;
