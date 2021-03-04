import {useState} from 'react';

import Card from '@/components/Card';
import TemplatesMenu from '@/components/Templates/TemplatesMenu';
import TemplatesGenerator from '@/components/Templates/TemplatesGenerator';

const Templates = ({cmsList, user}) => {
  const [activeTemplate, setActiveTemplate] = useState();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="h-48 overflow-auto md:h-full md:w-96">
        <TemplatesMenu
          cmsList={cmsList}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
      </Card>
      <Card className="w-full">
        {activeTemplate && <TemplatesGenerator activeTemplate={activeTemplate} user={user} />}
      </Card>
    </div>
  );
};

export default Templates;
