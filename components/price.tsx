
const Price = ({
  amount,
  className,
  currencyCode = 'NGN',
  // currencyCodeClassName
}: {
  amount: number;
  className?: string;
  currencyCode?: string;
  // currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  const hasKobo = amount % 1 !== 0;

  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: hasKobo ? 2 : 0, 
        maximumFractionDigits: 2,
      }).format(parseFloat(amount.toString()))}`}
      {/* <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span> */}
    </p>
  );
};

export default Price;

export const PriceSkeleton = () => {
  return (
    <p className="w-full h-2 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700"></p>
  );
}
