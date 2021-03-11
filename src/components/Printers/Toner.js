import {useState} from 'react';
import classNames from 'classnames';

import Modal from '@/components/Modal';

const getColor = color => {
  switch (color) {
    case 'Black':
      return 'bg-gray-300';
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

const Toner = ({toner, useToner}) => {
  const [cardHover, setCardHover] = useState(false);

  return (
    <Modal
      submit={() => useToner(toner)}
      submitLabel={'yes'}
      buttonLabel={
        <div onMouseEnter={() => setCardHover(true)} onMouseLeave={() => setCardHover(false)}>
          <div
            className={classNames(
              'flex items-center justify-between shadow h-16 bg-coolGray-100 rounded-xl overflow-hidden',
              {
                'bg-blue-200': cardHover,
              }
            )}
          >
            <span className="px-4 text-2xl font-medium">{toner.code}</span>
            <div
              className={`w-16 h-16 p-1 flex items-center justify-center ${getColor(toner.color)}`}
            >
              <span className="text-2xl font-medium">{toner.amount}</span>
            </div>
          </div>
        </div>
      }
      buttonClass="h-full w-full"
    >
      <p className="text-2xl text-center ">Are you sure you want to use {toner.code}?</p>
    </Modal>
  );
};

export default Toner;
