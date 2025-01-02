'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  middleNav?: React.ReactNode;
  rightNav?: React.ReactNode;
  footerMiddleNav?: React.ReactNode;
  footerRightNav?: React.ReactNode;
  // footerNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const t = useTranslations('Home');

  return (
    <div className="w-full text-gray-700 antialiased">
      <div className="mx-auto">
        <div
          className={`${pathname === '/' || pathname === '/en' || pathname === '/fr' || pathname === '/br' || pathname === '/pol' || pathname.includes('/course') || pathname.includes('/dashboard') || pathname.includes('privacy-policy') || pathname.includes('terms-conditions') ? 'mainBg' : pathname.includes('/about-ascent-u') ? 'bg-white' : 'bg-[#EFF6FE]'}`}
        >
          <div
            className={`${pathname === '/' || pathname === '/en' || pathname === '/fr' || pathname === '/br' || pathname === '/pol' || pathname.includes('/course') ? 'text-white' : pathname.includes('/terms-conditions') ? 'text-white' : pathname.includes('privacy-policy') ? 'text-white' : pathname === '/about' ? 'text-black' : 'text-black'} ${pathname.includes('/course') && 'min-h-[287px]'} ${pathname.includes('/terms-conditions') && 'min-h-[287px]'} ${pathname.includes('/privacy-policy') && 'min-h-[287px]'} relative ${pathname.includes('/course') ? '' : 'z-10'} px-[30px] pt-[30px]`}
          >
            <header className="mx-auto max-w-[2560px] font-bold">
              {/* <div className="pb-8 pt-16">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {AppConfig.name}
                  </h1>
                  <h2>{t('description')}</h2>
                </div>
              */}

              <div className="flex items-center justify-between">
                <nav className="flex w-[291px] flex-col justify-center">
                  <ul className="flex flex-wrap gap-x-5">{props.leftNav}</ul>
                </nav>

                <nav className="flex flex-col justify-center">
                  <ul className="flex flex-wrap gap-x-12">{props.middleNav}</ul>
                </nav>

                <nav>
                  <ul className="flex flex-wrap gap-x-5">{props.rightNav}</ul>
                </nav>
              </div>
            </header>

            {(pathname === '/' ||
              pathname === '/en' ||
              pathname === '/fr' ||
              pathname === '/br' ||
              pathname === '/pol') && (
              <h1 className="mx-auto pt-[143px] text-center text-5xl font-bold leading-[60px] text-[#101828]">
                {t('title_1')} <br /> {t('title_2')}
              </h1>
            )}
          </div>
        </div>

        <main className="">{props.children}</main>

        <footer className="relative z-0 mx-auto flex max-w-[2560px] items-center justify-between bg-[#F1F5F9] px-[44px] py-6 text-start text-sm">
          <p className="text-base">
            <span className="font-bold">{new Date().getFullYear()}</span>{' '}
            {t('all_right')}
          </p>

          <div>
            <ul className="footerNavMenu flex flex-wrap gap-x-3">
              {props.footerMiddleNav}
            </ul>
          </div>

          <nav className="footerNav text-base font-bold">
            <ul className="footerNavMenu flex flex-wrap gap-x-4">
              {props.footerRightNav}
            </ul>
          </nav>

          {/* <nav className="footerNav font-bold">
            <ul className="footerNavMenu flex flex-wrap gap-x-8">
              {props.footerNav}
            </ul>
          </nav> */}
        </footer>
      </div>
    </div>
  );
};

export { BaseTemplate };
