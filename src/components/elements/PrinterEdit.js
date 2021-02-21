import {useState} from 'react';
import firebaseClient from 'firebaseClient';
import {useAuth} from '@/context/AuthContext';
import Button from '@/elements/Button';
import Input from '@/elements/Input';
import Modal from '@/elements/Modal';
import Select from '@/elements/Select';

const getColor = color => {
  switch (color) {
    case 'Black':
      return 'bg-gray-400';
    case 'Cyan':
      return 'bg-cyan-200';
    case 'Magenta':
      return 'bg-fuchsia-200';
    case 'Yellow':
      return 'bg-yellow-200';

    default:
      return 'bg-transparent';
  }
};

const PrinterEdit = ({printer, filteredToners, tonersUnset}) => {
  const {user} = useAuth();

  const [editModel, setEditModel] = useState(printer.model);
  const [editBrand, setEditBrand] = useState(printer.brand);
  const [editToners, setEditToners] = useState('');

  const onEdit = () => {
    firebaseClient.firestore().collection(`printers${user.location}`).doc(printer.id).update({
      brand: editBrand,
      model: editModel,
    });
    setEditBrand(editBrand);
    setEditModel(editModel);
  };

  return (
    user.role === 'admin' && (
      <Modal
        buttonLabel={<span className="align-middle material-icons">more_vert</span>}
        buttonClass=" h-12 hover:bg-coolGray-200 transition-all duration-300 rounded-xl"
        submit={onEdit}
      >
        <div className="flex flex-col gap-4">
          <p className="text-4xl ">Details</p>
          <Select
            fullWidth
            label={'Brand'}
            value={editBrand}
            setValue={setEditBrand}
            options={['Xerox', 'HP']}
          />
          <Input
            fullWidth
            label={'Model'}
            value={editModel}
            onChange={e => setEditModel(e.target.value)}
          />
          <p className="text-4xl ">Toners</p>
          {filteredToners.map(toner => (
            <div key={toner.id} className="flex flex-col gap-2 ">
              <div className="flex items-center gap-4">
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl shadow ${getColor(
                    toner.color
                  )}`}
                >
                  <span className="absolute font-medium cursor-default">{toner.amount}</span>
                </div>
                <p className="font-medium">{`${toner.code}`}</p>
                <button
                  onClick={() =>
                    firebaseClient
                      .firestore()
                      .collection(`printers${user.location}`)
                      .doc(printer.id)
                      .update({
                        toners: firebaseClient.firestore.FieldValue.arrayRemove(toner.id),
                      })
                  }
                >
                  <span className="p-1 m-1 align-middle rounded-xl material-icons hover:bg-coolGray-50">
                    close
                  </span>
                </button>
              </div>
            </div>
          ))}
          {tonersUnset.length ? (
            <div className="flex gap-4">
              <Select
                fullWidth
                label={'Add toner'}
                value={editToners}
                setValue={setEditToners}
                options={[...new Set(tonersUnset.map(toner => toner.code))]}
              />
              <Button
                onClick={() => {
                  editToners !== '' &&
                    firebaseClient
                      .firestore()
                      .collection(`printers${user.location}`)
                      .doc(printer.id)
                      .update({
                        toners: firebaseClient.firestore.FieldValue.arrayUnion(
                          tonersUnset.find(toner => toner.code === editToners).id
                        ),
                      });
                  setEditToners('');
                }}
              >
                Add
              </Button>
            </div>
          ) : null}
        </div>
      </Modal>
    )
  );
};

export default PrinterEdit;
