/* eslint-disable jsx-a11y/control-has-associated-label */
import { toast } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

interface ToastProps {
  title: string;
  description: string;
  type: 'success' | 'error';
}

export const showToast = ({ title, description, type }: ToastProps) => {
  toast.dismiss();

  const toastId = toast.custom(
    (t) => (
      <div className="flex max-w-[350px] items-start gap-2 rounded-lg border bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-[#222223]">
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`font-bold ${
                type === 'success' ? 'text-[#30ad2c]' : 'text-[#CE0500]'
              }`}
            >
              {title}
            </h4>
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-full p-1 hover:bg-white/10 dark:text-white"
            >
              <IoClose className="size-4" />
            </button>
          </div>
          <p className="text-sm dark:text-gray-200">{description}</p>
        </div>
      </div>
    ),
    {
      duration: 3000,
      id: `toast-${Date.now()}`,
      position: 'top-right',
    },
  );

  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);

  return toastId;
};
