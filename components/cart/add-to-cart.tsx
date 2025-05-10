'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'app/components/cart/actions';
import { useProduct } from 'app/components/product/product-context';
import { Product, ProductVariant } from 'app/lib/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';
import useCartStore from 'app/store/cartStore';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  onClick
}: {
  availableForSale: boolean;
    selectedVariantId: string | undefined;
  onClick: any
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  // if (!selectedVariantId) {
  //   return (
  //     <button
  //       aria-label="Please select an option"
  //       disabled
  //       className={clsx(buttonClasses, disabledClasses)}
  //     >
  //       <div className="absolute left-0 ml-4">
  //         <PlusIcon className="h-5" />
  //       </div>
  //       Add To Cart
  //     </button>
  //   );
  // }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
      onClick={onClick}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const availableForSale = !!product.totalQuantity
    const addItem = useCartStore((state) => state.addItem);

  // const { variants, availableForSale } = product;
  // const { addCartItem } = useCart();
  // const { state } = useProduct();
  // const [message, formAction] = useActionState(addItem, null);

  // const variant = variants.find((variant: ProductVariant) =>
  //   variant.selectedOptions.every(
  //     (option) => option.value === state[option.name.toLowerCase()]
  //   )
  // );
  // const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  // const selectedVariantId = variant?.id || defaultVariantId;
  // const addItemAction = formAction.bind(null, selectedVariantId);
  // const finalVariant = variants.find(
  //   (variant) => variant.id === selectedVariantId
  // )!;
console.log(product.id, "id")
  return (
    // <form
    //   action={async () => {
    //     addItem(product);
    //   // addCartItem(finalVariant, product);
    //   // addItemAction();
    // }}
    // >
    <>
      <SubmitButton
        onClick={()=> addItem(product)
}
        // availableForSale={availableForSale}
        // selectedVariantId={selectedVariantId}
        availableForSale={availableForSale}
        selectedVariantId={""}
      />
      {/* <p aria-live="polite" className="sr-only" role="status">
        {message} 
      </p> */}
      </>
    // </form>
  );
}
