import Card from '../elements/Card';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="">Qucik Use</Card>
      <Card className="">Last pieces</Card>
    </div>
  );
};

export default Dashboard;
