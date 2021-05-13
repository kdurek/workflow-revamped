import TonersListItem from '@/modules/toners/TonersListItem';
import useToners from '@/modules/reactQuery/queries/useToners';

const TonersList = () => {
  const {data: tonersList} = useToners();

  return (
    <div className="flex flex-col gap-4">
      {tonersList.map(toner => (
        <TonersListItem key={toner._id} toner={toner} />
      ))}
    </div>
  );
};

export default TonersList;
