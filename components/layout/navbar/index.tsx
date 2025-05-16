import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import { Menu } from 'app/lib/types';
import LogoSquare from 'app/components/logo-square';
import { navMenu } from 'app/lib/constants';
import CartModal from 'app/components/cart/modal';
import useAuthStore from 'app/store/authStore';

const { SITE_NAME } = process.env;

export function Navbar() {

  return (
    // <nav className="relative sticky top-0 z-50 bg-[var(--background)] flex items-center justify-between p-4 lg:px-6 shadow-lg">
    <nav className="relative sticky top-0 z-50 bg-[var(--background)/80] dark:bg-[var(--background)]  backdrop-blur-md dark:blur-none border-b  border-black/10 dark:border-none shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={navMenu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {navMenu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {navMenu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          {/* <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense> */}
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
