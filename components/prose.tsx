import clsx from 'clsx';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        'prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;

export function ProseSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse", // Base padding and pulse animation
        "max-w-7xl mx-auto", // Max width and vertical padding
        className // Allow custom classes to be passed in
      )}
    >
        {/* Description Heading */}
        <div
          className={clsx(
            "prose mx-auto text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline prose-a:hover:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white",
            "max-w-full" // Ensure prose content doesn't overflow container for skeleton
          )}
        >
          {/* Mimic paragraphs and lists */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded-md w-10/12"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>{" "}
            {/* Shorter line for variety */}
            {/* <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-9/12"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div> */}
            {/* Simulated list items */}
            {/* <div className="h-4 bg-gray-200 rounded-md w-3/4 ml-6"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3 ml-6"></div> */}
          </div>
        </div>
    </div>
  );
}