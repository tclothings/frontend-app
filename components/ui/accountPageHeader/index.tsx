import clsx from "clsx";

export default function AccountPageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
    return (
      <div className="flex flex-col lg:flex-row justify-between gap-y-6 md:pb-[11px] mb-4 md:mb-6">
        <h1
          className={clsx(
            "font-semibold md:font-medium text-xl md:text-[30px] text-grey-900 pb-[11px] md:pb-0",
            // testSohne.className,
            "antialiased"
          )}
        >
          {title}
        </h1>
        {children}
      </div>
    );
}