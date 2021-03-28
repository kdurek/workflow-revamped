import {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Modal from '@/components/Modal';
import useTonerUpdate from '@/hooks/useTonerUpdate';

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

const Toner = ({toner}) => {
  const updateTonerMutation = useTonerUpdate();

  const [cardHover, setCardHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTonerUse = () => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateTonerMutation.mutate({id: toner._id, updatedToner});
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
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
      </button>

      <Modal open={modalOpen} setOpen={setModalOpen} onSubmit={handleTonerUse}>
        <Modal.Title>Use Toner</Modal.Title>
        <p className="text-2xl text-center ">
          Are you sure you want to use <span className="font-semibold">{toner.code}</span>?
        </p>
      </Modal>
    </>
  );
};

Toner.propTypes = {
  toner: PropTypes.object,
};

export default Toner;
