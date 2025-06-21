import { ICategory } from "app/lib/types";
import { capitalizeWord } from "app/lib/utils";

// app/api/server/categories.ts


export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}products/all/categories?limitless=true`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    const categories = [
      ...(data?.data?.categories?.map((category: ICategory) => ({
        handle: category.slug,
        title: category.name,
        description: category.description,
        seo: {
          title: category.name,
          description: category.description,
        },
        path: `/category/${category.slug}`,
      })) || []),
    ];
  return categories;
}

export async function getCategory(slug: string) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}products/category/${slug}`,
    {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data?.data;
}

// export async function getCategory(slug: string) {

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}products/all/categories?limitless=true`,
//     {
//       cache: "no-store",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch categories");
//   const data = await res.json();
//   const categories = [
//     initialCategory,
//     ...(data?.data?.categories?.map((category) => ({
//       handle: category.slug,
//       title: category.name,
//       description: category.description,
//       seo: {
//         title: category.name,
//         description: category.description,
//       },
//       path: `category/${category.slug}`,
//     })) || []),
//   ];
//   return categories;
// }