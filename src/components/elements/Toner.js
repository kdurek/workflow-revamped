import {useState} from 'react';
import {Transition} from '@headlessui/react';
import firebaseClient from 'firebaseClient';
import Button from '@/elements/Button';
import Card from '@/elements/Card';
import {useAuth} from '@/context/AuthContext';

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

const Toner = ({toner}) => {
  const {user} = useAuth();

  const [cardHover, setCardHover] = useState(false);

  const onUse = id => {
    if (user.role === 'admin') {
      const decrement = firebaseClient.firestore.FieldValue.increment(-1);
      firebaseClient
        .firestore()
        .collection(`toners${user.location}`)
        .doc(id)
        .update({amount: decrement});
    }
  };

  return (
    <div onMouseEnter={() => setCardHover(true)} onMouseLeave={() => setCardHover(false)}>
      <Card className="flex flex-col group text-coolGray-600 bg-coolGray-100">
        <div className="flex justify-between">
          <span className="text-3xl font-bold">{toner.code}</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div
            className={`flex flex-col items-center justify-center p-6 rounded-xl shadow ${getColor(
              toner.color
            )}`}
          >
            <span className="absolute font-bold cursor-default">{toner.amount}</span>
          </div>
          <Transition
            show={cardHover}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-300 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="w-full"
          >
            <Button onClick={() => onUse(toner.id)} primary fullWidth>
              Use
            </Button>
          </Transition>
        </div>
      </Card>
    </div>
  );
};

export default Toner;
