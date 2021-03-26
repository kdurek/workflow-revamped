import {useSession} from 'next-auth/client';
import PropTypes from 'prop-types';

import Card from '@/components/Card';
import PrinterEdit from '@/components/Printers/PrinterEdit';
import Toner from '@/components/Printers/Toner';

const Printer = ({printer}) => {
  const [session] = useSession();

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{`${printer.brand} ${printer.model}`}</span>
        {session.user.role === 'admin' && <PrinterEdit printer={printer} />}
      </div>
      {printer.toners.length ? (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {printer.toners.map(toner => (
            <Toner key={toner._id} toner={toner} />
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
};

export default Printer;
