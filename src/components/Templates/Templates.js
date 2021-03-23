import Tabs from '../Tabs';
import TemplateCms from './TemplateCms';
import PropTypes from 'prop-types';

const Templates = ({user}) => {
  return (
    <div>
      <Tabs>
        <div label="cms">
          <TemplateCms user={user} />
        </div>
        <div label="password">PLACEHOLDER</div>
      </Tabs>
    </div>
  );
};

Templates.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Templates;
