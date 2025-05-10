'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
// import { removeItem } from 'app/components/cart/actions';
import type { CartItem, Product } from 'app/lib/types';
import useCartStore from 'app/store/cartStore';
import { useActionState } from 'react';

export function DeleteItemButton({
  item,
  // optimisticUpdate
}: {
  item: Product;
  // optimisticUpdate: any;
  }) {
  const {deleteItem} = useCartStore((state)=> state)
  // const [message, formAction] = useActionState(removeItem, null);
  // const merchandiseId = item.merchandise.id;
  // const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    // <form
    //   action={async () => {
    //     removeItem(item, "delete");
    //     // optimisticUpdate(merchandiseId, 'delete');
    //     // removeItemAction();
    //   }}
    // >
    <>
      <button
        onClick={() => deleteItem(item)}
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      {/* <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p> */}
    </>
    // </form>
  );
}
