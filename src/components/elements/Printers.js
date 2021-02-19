import Printer from '@/elements/Printer';

const Printers = ({printer, tonersList, tonersUnset, filterSearch, filterBrand, filterColor}) => {
  const filteredToners = tonersList
    .filter(toner => printer.toners.includes(toner.id))
    .filter(toner => toner.color.includes(filterColor))
    .filter(toner => toner.brand.includes(filterBrand));

  const filterString =
    printer.model.toLowerCase().includes(filterSearch.toLowerCase()) ||
    filteredToners.find(toner => toner.code.toLowerCase().includes(filterSearch.toLowerCase()));

  return filterString && filteredToners ? (
    <Printer
      printer={printer}
      filteredToners={filteredToners}
      filterString={filterString}
      tonersUnset={tonersUnset}
    />
  ) : null;
};

export default Printers;
