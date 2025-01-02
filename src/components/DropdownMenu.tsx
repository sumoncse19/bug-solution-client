/* eslint-disable react/button-has-type */

'use client';

import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface DropdownMenuProps {
  userName: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-2 text-left text-sm shadow-sm hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gray-200" />
          <span className="text-sm font-medium text-gray-900">{userName}</span>
        </div>
        {isOpen ? (
          <MdKeyboardArrowUp className="size-5 text-gray-500" />
        ) : (
          <MdKeyboardArrowDown className="size-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        <div className="absolute mt-1 w-full rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Account
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Orders
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Log out
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
