import Card from '@/elements/Card';
import OutOfStock from '@/modules/OutOfStock';

const Dashboard = ({tonersList}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <OutOfStock tonersList={tonersList} />
    </div>
  );
};

export default Dashboard;
