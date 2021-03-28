import {Dialog} from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Card from '@/components/Card';

const Title = ({children, className}) => {
  return (
    <Dialog.Title className={classNames('text-center font-semibold text-4xl', className)}>
      {children}
    </Dialog.Title>
  );
};

Title.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

const Description = ({children, className}) => {
  return (
    <Dialog.Description className={classNames('font-medium text-2xl', className)}>
      {children}
    </Dialog.Description>
  );
};

Description.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

const Modal = ({children, onCancel, onSubmit, open, setOpen}) => {
  return (
    <Dialog className="fixed inset-0" open={open} onClose={setOpen}>
      <Dialog.Overlay className="fixed inset-0 opacity-75 bg-coolGray-600" />
      <div className="flex items-center justify-center w-screen h-screen">
        <Card className="relative w-full max-w-xs p-4 space-y-4 sm:max-w-sm md:max-w-md">
          {children}

          <div className="flex gap-4">
            <Button fullWidth onClick={onCancel ? onCancel : () => setOpen(false)}>
              Cancel
            </Button>
            {onSubmit && (
              <Button fullWidth variant="primary" onClick={onSubmit}>
                Submit
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Dialog>
  );
};

Modal.Title = Title;
Modal.Description = Description;

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Modal;
