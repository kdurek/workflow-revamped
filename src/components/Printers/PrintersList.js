import PropTypes from 'prop-types';

import Printer from '@/components/Printers/Printer';

const PrintersList = ({printersList, uncategorizedToners}) => {
  return (
    <div className="flex flex-col gap-4">
      {printersList?.map(printer => (
        <Printer key={printer._id} printer={printer} uncategorizedToners={uncategorizedToners} />
      ))}
    </div>
  );
};

PrintersList.propTypes = {
  printersList: PropTypes.array,
  uncategorizedToners: PropTypes.array,
};

export default PrintersList;
