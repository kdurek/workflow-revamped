import {useState} from 'react';
import {Transition} from '@headlessui/react';
import classNames from 'classnames';
import firebaseClient from 'firebaseClient';
import Button from '@/elements/Button';
import Card from '@/elements/Card';
import {useAuth} from '@/context/AuthContext';
import Modal from './Modal';

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
    <Modal
      submit={() => onUse(toner.id)}
      submitLabel={'yes'}
      buttonLabel={
        <div onMouseEnter={() => setCardHover(true)} onMouseLeave={() => setCardHover(false)}>
          <Card
            className={classNames('flex items-center text-coolGray-600 gap-4 bg-coolGray-100', {
              'bg-blue-200': cardHover,
            })}
          >
            <div
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow ${getColor(
                toner.color
              )}`}
            >
              <span className="absolute font-bold cursor-pointer">{toner.amount}</span>
            </div>
            <span className="text-2xl font-medium">{toner.code}</span>
          </Card>
        </div>
      }
      buttonClass="h-full w-full"
      // onClick={() => onUse(toner.id)}
    >
      <p className="text-2xl text-center text-coolGray-600">
        Are you sure you want to use {toner.code}?
      </p>
    </Modal>
  );
};

export default Toner;
