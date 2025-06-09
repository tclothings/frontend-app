import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'NGN',
  currencyCodeClassName
}: {
  amount: number;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount.toString()))}`}
    {/* <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span> */}
  </p>
);

export default Price;

export const PriceSkeleton = () => {
  return (
    <p className="w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700"></p>
  );
}
