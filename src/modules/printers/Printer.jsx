import PropTypes from 'prop-types';

import Card from '@/common/components/Card';
import PrinterEdit from '@/modules/printers/PrinterEdit';
import Protect from '@/common/components/Protect';
import Toner from '@/modules/printers/Toner';

const Printer = ({printer}) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{`${printer.brand} ${printer.model}`}</span>
        <Protect>
          <PrinterEdit printer={printer} />
        </Protect>
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
  printer: PropTypes.shape({
    brand: PropTypes.string,
    model: PropTypes.string,
    toners: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        code: PropTypes.string,
        color: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Printer;
