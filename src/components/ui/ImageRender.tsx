import Image from 'next/image';

import email_icon from '@/public/assets/icon/email.svg';
import green_bg_tick_icon from '@/public/assets/icon/greenBgTick.svg';
import payment_card_icon from '@/public/assets/icon/paymentCard.svg';
import stripe_logo from '@/public/assets/icon/stripeLogo.svg';

type IconProps = {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
};

export const ImageRender = ({
  name,
  width = 24,
  height = 24,
  className,
  alt = `wider ${name} icon`,
}: IconProps) => {
  const getIcon = () => {
    switch (name) {
      case 'email_icon':
        return email_icon;
      case 'green_bg_tick_icon':
        return green_bg_tick_icon;
      case 'payment_card_icon':
        return payment_card_icon;
      case 'stripe_logo':
        return stripe_logo;
      default:
        return null;
    }
  };

  const iconSrc = getIcon();

  if (!iconSrc) {
    return null;
  }

  return (
    <Image
      src={iconSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};
