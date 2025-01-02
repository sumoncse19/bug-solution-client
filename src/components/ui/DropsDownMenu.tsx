'use client';

import Image from 'next/image';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useClickAway } from 'react-use';

// Define a custom type for the ref to include the showMenu and setShowMenu
interface DropsDownMenuHandle {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropsDownMenuProps {
  sectionTitle?: string;
  selectedItemClass?: string;
  className?: string;
  selectedItem: React.ReactNode;
  children?: React.ReactNode;
}

const DropsDownMenu = forwardRef<DropsDownMenuHandle, DropsDownMenuProps>(
  (
    {
      sectionTitle,
      selectedItem,
      selectedItemClass = 'shadow-5xl flex items-center justify-between rounded-[6px] px-3 py-2',
      children,
      className = 'w-full top-full left-0 mt-2',
    },
    ref,
  ) => {
    const menu = useRef<HTMLDivElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    // Expose showMenu and setShowMenu via the custom ref
    useImperativeHandle(ref, () => ({
      showMenu,
      setShowMenu,
    }));

    useClickAway(menu, () => {
      setShowMenu(false);
    });

    return (
      <div className="flex flex-col gap-2 px-1">
        {sectionTitle && (
          <p className="text-sm font-medium text-[#36394A]">{sectionTitle}</p>
        )}
        <div ref={menu} className="relative">
          <div
            className={selectedItemClass}
            onClick={() => setShowMenu(!showMenu)}
          >
            {selectedItem}
            <Image
              src="/assets/icon/downArrow.svg"
              width={12}
              height={6}
              alt="down-arrow-icon"
            />
          </div>
          {showMenu && (
            <div
              className={`shadow-5xl absolute z-[1] flex flex-col whitespace-nowrap rounded-[10px] border border-[#DFE1E7] bg-white p-1 ${className}`}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    );
  },
);

DropsDownMenu.displayName = 'DropsDownMenu';

export { DropsDownMenu };
