import {useState} from 'react';
import classNames from 'classnames';
import firebaseClient from 'firebaseClient';
import {useAuth} from '@/context/AuthContext';
import Card from '@/elements/Card';
import Modal from '@/elements/Modal';
import Square from '@/elements/Square';

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
            className={classNames('flex items-center gap-4 p-8 bg-coolGray-100', {
              'bg-blue-200': cardHover,
            })}
          >
            <Square p={4} className={`${getColor(toner.color)}`}>
              {toner.amount}
            </Square>
            <span className="text-2xl font-medium">{toner.code}</span>
          </Card>
        </div>
      }
      buttonClass="h-full w-full"
    >
      <p className="text-2xl text-center ">Are you sure you want to use {toner.code}?</p>
    </Modal>
  );
};

export default Toner;
