import TonersListItem from '@/modules/toners/TonersListItem';
import useToners from '@/modules/reactQuery/queries/useToners';

const TonersList = () => {
  const {data: tonersList, isLoading: isLoadingToners} = useToners();

  if (isLoadingToners) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {tonersList.map(toner => (
        <TonersListItem key={toner._id} toner={toner} />
      ))}
    </div>
  );
};

export default TonersList;
