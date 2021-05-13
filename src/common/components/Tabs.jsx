import {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Card from '@/common/components/Card';

const Tab = ({activeTab, label, onClick}) => {
  return (
    <button
      type="button"
      className={classNames(
        'flex items-center justify-center rounded-xl px-4 py-2 uppercase font-medium duration-300 transition-all focus:ring-2 bg-gray-100 hover:bg-gray-200 shadow-inner',
        {
          'bg-gray-400 hover:bg-gray-400': activeTab === label,
        }
      )}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
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
      <Card className="flex gap-2 p-2">
        {children.map(child => {
          const {label} = child.props;
          return <Tab activeTab={activeTab} key={label} label={label} onClick={onClick} />;
        })}
      </Card>
      <Card>
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </Card>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tabs;
