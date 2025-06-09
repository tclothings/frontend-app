import clsx from 'clsx';
import Price from './price';

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
          "w-fit",
          {
            "lg:px-20 lg:pb-[35%]": position === "center",
          }
        )}
      >
        <div className='flex flex-col'>
          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
            <h3 className="w-fit mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
              {title}
            </h3>
            <div className="flex items-center">
              <Price
                className="flex-none rounded-full bg-blue-600 p-2 text-white"
                amount={salePrice ? salePrice : amount}
                currencyCode={currencyCode}
                currencyCodeClassName="hidden @[275px]/label:inline"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
            {salePrice && (
              <Price
                className="text-xs text-gray-500 line-through w-full"
                amount={amount}
                currencyCode={currencyCode}
                currencyCodeClassName="hidden @[275px]/label:inline"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Label;
