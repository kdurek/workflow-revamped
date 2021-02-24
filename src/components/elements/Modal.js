import {Transition} from '@headlessui/react';
import {useState, useRef} from 'react';
import Button from '@/elements/Button';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const Modal = ({submit, submitLabel, children, buttonClass, buttonLabel}) => {
  const [showModal, setShowModal] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div>
      {buttonClass ? (
        <button onClick={() => setShowModal(true)} className={buttonClass}>
          {buttonLabel}
        </button>
      ) : (
        <Button onClick={() => setShowModal(true)}>{buttonLabel}</Button>
      )}
      <Transition show={showModal}>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-40"
        >
          <div className="fixed inset-0 opacity-75 bg-coolGray-600" />
          <Transition.Child
            enter="transform transition-all duration-300 ease-out"
            enterFrom="opacity-0 translate-y-36 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transform transition-all ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-36 scale-95"
            className="flex items-center justify-center w-screen h-screen"
          >
            <div
              ref={ref}
              className="z-50 w-full max-w-xs text-left bg-white shadow-xl sm:max-w-xl rounded-xl"
            >
              <div className="p-4">{children}</div>
              <div className="flex flex-col gap-4 p-4 border-t sm:flex-row-reverse">
                <Button
                  fullWidth
                  primary
                  onClick={() => {
                    submit();
                    setShowModal(false);
                  }}
                >
                  {submitLabel || 'submit'}
                </Button>
                <Button fullWidth onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </Transition.Child>
      </Transition>
    </div>
  );
};

export default Modal;
