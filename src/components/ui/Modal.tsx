'use client';

interface ModalProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  isOpen?: boolean;
  hasOverlay?: boolean;
  hasOutterBorder?: boolean;
  onCloseModal?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  header,
  body,
  footer,
  isOpen,
  hasOverlay = false,
  hasOutterBorder,
  onCloseModal,
  className = 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-min w-[587px]',
}) => {
  return (
    <>
      {isOpen && hasOverlay && (
        <div
          aria-hidden
          className="fixed inset-0 z-20 size-full bg-[#47598757]"
          onClick={onCloseModal}
        />
      )}
      {isOpen && (
        <div
          className={`z-20 shadow-[0px_4px_8px_0px_#9897BE1A] transition-all duration-500 ease-in-out ${className} ${hasOutterBorder ? 'rounded-3xl bg-[#DBD9FACC] p-3' : 'rounded-xl bg-white p-6'}`}
        >
          <div className={hasOutterBorder ? 'rounded-xl bg-white p-6' : ''}>
            {header}
            {body}
            {footer}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
