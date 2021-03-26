import {useMutation, useQueryClient} from 'react-query';
import {useSession} from 'next-auth/client';
import PropTypes from 'prop-types';

import {updateToner} from '@/services/tonerService';
import Card from '@/components/Card';
import PrinterEdit from '@/components/Printers/PrinterEdit';
import Toner from '@/components/Printers/Toner';

const Printer = ({printer, uncategorizedToners}) => {
  const [session] = useSession();

  const queryClient = useQueryClient();

  const updateTonerMutation = useMutation(updateToner, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
    },
  });
  const useToner = async toner => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateTonerMutation.mutate({id: toner._id, updatedToner});
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{`${printer.brand} ${printer.model}`}</span>
        {session.user.role === 'admin' && (
          <PrinterEdit printer={printer} uncategorizedToners={uncategorizedToners} />
        )}
      </div>
      {printer.toners.length ? (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {printer.toners.map(toner => (
            <Toner key={toner._id} useToner={useToner} toner={toner} />
          ))}
        </div>
      ) : (
        <p className="text-xl font-medium">
          No toners are associated to this printer, assign some!
        </p>
      )}
    </Card>
  );
};

Printer.propTypes = {
  printer: PropTypes.object,
  session: PropTypes.object,
  uncategorizedToners: PropTypes.array,
  useToner: PropTypes.func,
};

export default Printer;
