import classNames from 'classnames';
import PropTypes from 'prop-types';

import {useToggle} from '@/common/hooks/useToggle';
import Button from '@/common/components/Button';
import getTonerColor from '@/modules/toners/utils/getTonerColor';
import useTonerUpdate from '@/modules/reactQuery/mutations/useUpdateToner';
import Modal from '@/common/components/Modal';

const Toner = ({toner}) => {
  const [open, toggle] = useToggle(false);
  const {mutate: updateToner} = useTonerUpdate();

  const handleTonerUse = () => {
    const updatedToner = {
      amount: toner.amount - 1,
    };
    updateToner({_id: toner._id, data: {updatedToner}});

    toggle();
  };

  return (
    <>
      <button type="button" onClick={toggle}>
        <div
          className={classNames(
            'flex hover:bg-blue-200 transition items-center justify-between shadow h-16 bg-gray-100 rounded-xl overflow-hidden'
          )}
        >
          <span className="px-4 text-2xl font-medium">{toner.code}</span>
          <div
            className={`w-16 h-16 p-1 flex items-center justify-center ${getTonerColor(
              toner.color
            )}`}
          >
            <span className="text-2xl font-medium">{toner.amount}</span>
          </div>
        </div>
      </button>
      <Modal open={open} setOpen={toggle} onSubmit={handleTonerUse}>
        <Modal.Title>Use Toner</Modal.Title>
        <p className="text-2xl text-center ">
          Are you sure you want to use <span className="font-semibold">{toner.code}</span>?
        </p>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
            Cancel
          </Button>
          <Button fullWidth variant="primary" onClick={handleTonerUse}>
            Submit
          </Button>
        </Modal.Buttons>
      </Modal>
    </>
  );
};

Toner.propTypes = {
  toner: PropTypes.shape({
    _id: PropTypes.string,
    amount: PropTypes.number,
    code: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default Toner;
