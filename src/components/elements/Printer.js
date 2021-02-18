import Card from './Card';
import Toner from './Toner';

const Printer = ({printer, tonersList, filterSearch, filterBrand, filterColor}) => {
  const filteredToners = tonersList
    .filter(toner => printer.toners.includes(toner.id))
    .filter(toner => toner.color.includes(filterColor))
    .filter(toner => toner.brand.includes(filterBrand));

  const search =
    printer.model.toLowerCase().includes(filterSearch.toLowerCase()) ||
    filteredToners.find(toner => toner.code.toLowerCase().includes(filterSearch.toLowerCase()));

  return search &&
    filteredToners.find(toner => toner.color.includes(filterColor)) &&
    filteredToners.find(toner => toner.brand.includes(filterBrand)) ? (
    <Card className="flex flex-col">
      <span className="text-4xl text-coolGray-600">{`${printer.brand} ${printer.model}`}</span>
      <div className="grid h-full grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredToners
          .sort((a, b) =>
            a.color > b.color ? 1 : a.color === b.color ? (a.size > b.size ? 1 : -1) : -1
          )
          .map(toner => (
            <Toner key={toner.id} toner={toner} />
          ))}
      </div>
    </Card>
  ) : (
    <></>
  );
};

export default Printer;
