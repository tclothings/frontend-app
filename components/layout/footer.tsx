import Link from "next/link";
import FooterMenu from "app/components/layout/footer-menu";
import { Suspense } from "react";
import { companyName, navMenu } from "app/lib/constants";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import BrandIcon from "../icons/brand";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  // const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton =
    "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";

  return (
    <footer className="text-neutral-500 dark:text-neutral-400">
      <div className="flex max-w-(--breakpoint-2xl) m-auto px-4 ">
        <div className="flex w-full flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
          <div>
            <Link
              className="flex items-center gap-2 text-black md:pt-1 dark:text-white w-[100px] lg:w-[200px]"
              href="/"
            >
              <BrandIcon />
              {/* <LogoSquare size="sm" />
              <span className="uppercase">{companyName}</span> */}
            </Link>
          </div>
          <Suspense
            fallback={
              <div className="flex h-[188px] w-[200px] flex-col gap-2">
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
              </div>
            }
          >
            <FooterMenu menu={navMenu} />
          </Suspense>
          <div className="flex flex-col gap-6 md:ml-auto bg-white text-black dark:bg-transparent dark:text-white">
            <h2 className="text-2xl font-bold">Store Information</h2>

            <div className="flex items-center gap-2 font-medium">
              <FaMapMarkerAlt size={40} />
              <span>
                Shop 28 sallyman plaza, 1 Felly akuruwa street,
                <br /> Ago palace way, Okota, Lagos.
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-between gap-2">
                <a
                  href="https://wa.me/2347075081687"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={40} />
                </a>
                <a href="tel:+2347075081687">07075081687</a>
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href="https://www.instagram.com/thriftz_nation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={40} />
                </a>
                <a
                  href="https://www.instagram.com/thriftz_nation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Thriftz_nation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {currentYear} {companyName}
            {companyName.length && !companyName.endsWith(".") ? "." : ""}
            All rights reserved.
          </p>
          {/* <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" /> */}
          {/* <p>
            <a href="https://github.com/vercel/commerce">View the source</a>
          </p> */}
          {/* <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-black dark:text-white">
              Created by ▲ Vercel
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
