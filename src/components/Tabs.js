import {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Card from '@/components/Card';

const Tab = ({activeTab, label, onClick}) => {
  return (
    <Button
      label={label}
      className={classNames({'bg-coolGray-400 hover:bg-coolGray-400': activeTab === label})}
      onClick={() => onClick(label)}
    >
      {label}
    </Button>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Tabs = ({children}) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClick = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-4">
      <Card className="flex gap-2">
        {children.map(child => {
          const {label} = child.props;
          return <Tab activeTab={activeTab} key={label} label={label} onClick={onClick} />;
        })}
      </Card>
      <Card className="p-4">
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </Card>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Tabs;
