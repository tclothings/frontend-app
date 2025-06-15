import { capitalizeWord } from "app/lib/utils";

// app/api/server/categories.ts


export async function getCategories() {
    // const initialCategory = {
    //     handle: "",
    //     title: "All",
    //     description: "All products",
    //     seo: {
    //       title: "All",
    //       description: "All products",
    //     },
    //     path: "/category",
    // }
    
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
      ...(data?.data?.categories?.map((category) => ({
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