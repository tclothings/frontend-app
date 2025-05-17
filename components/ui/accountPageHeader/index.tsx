import clsx from "clsx";

export default function AccountPageHeader({
  title,
  children,
  btn,
}: {
  title: string;
  children?: React.ReactNode;
  btn?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row justify-between items-center py-2">
        <h1
          className={clsx(
            "font-semibold md:font-medium text-xl md:text-[30px] text-grey-900 pb-[11px] md:pb-0",
            // testSohne.className,
            "antialiased"
          )}
        >
          {title}
        </h1>
        {btn}
      </div>
      <div className="py-2"> {children}</div>
    </div>
  );
}