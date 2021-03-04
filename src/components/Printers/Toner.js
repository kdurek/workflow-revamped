import {useState} from 'react';
import classNames from 'classnames';

import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Square from '@/components/Square';

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

const Toner = ({toner, onUse}) => {
  const [cardHover, setCardHover] = useState(false);

  return (
    <Modal
      submit={() => onUse(toner)}
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
