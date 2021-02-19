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
      <Transition
        show={showModal}
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 opacity-75 bg-coolGray-600"></div>
            </div>
            <Transition
              show={showModal}
              enter="duration-300 ease-out"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              className="flex flex-col items-center justify-center w-screen h-screen"
            >
              <div
                ref={ref}
                className="overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl rounded-xl sm:max-w-xl sm:w-full"
              >
                <div className="p-4">{children}</div>
                <div className="flex flex-col gap-4 p-4 sm:flex-row-reverse bg-coolGray-50">
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
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Modal;
