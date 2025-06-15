import clsx from 'clsx';
import Price, { PriceSkeleton } from './price';

const Label = ({
  title,
  amount,
  salePrice,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: number;
    salePrice: number;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <>
      <div
        className={clsx(
          "absolute bottom-0 left-0 inline-flex px-4 pb-4 @container/label",
          "w-full",
          {
            "lg:px-20 lg:pb-[35%]": position === "center",
          }
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
            <h3 className="w-fit mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
              {title}
            </h3>
            <div className="flex items-center">
              <Price
                className="flex rounded-full bg-blue-600 p-2 text-white"
                amount={salePrice ? salePrice : amount}
                currencyCode={currencyCode}
                currencyCodeClassName="hidden @[275px]/label:inline"
              />
            </div>
          </div>
          {salePrice && (
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-[var(--grey-100)] mt-2">
              <Price
                className="flex text-xs line-through w-full"
                amount={amount}
                currencyCode={currencyCode}
                currencyCodeClassName="hidden @[275px]/label:inline"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Label;

export const LabelSkeleton = () => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 inline-flex px-4 pb-4 @container/label animate-pulse",
        "w-fit"
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="w-fit mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight w-4 h-4 animate-pulse"></h3>
          <div className="flex items-center">
            <PriceSkeleton />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <PriceSkeleton />
        </div>
      </div>
    </div>
  );
}