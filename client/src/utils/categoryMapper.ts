export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  childCategory?: Category[]; // for nesting
}

export default function mapCategories(categories: Category[]): Category[] {
  const categoryMap: Record<string, Category> = {};
  const result: Category[] = [];

  categories?.forEach((category) => {
    categoryMap[category?._id] = { ...category };
  });

  categories?.forEach((category) => {
    if (category?.parent && categoryMap[category?.parent]) {
      const parentCategory = categoryMap[category?.parent];
      if (!parentCategory?.childCategory) {
        parentCategory.childCategory = [];
      }
      parentCategory?.childCategory?.push(categoryMap[category?._id]);
    } else {
      result?.push(categoryMap[category?._id]);
    }
  });

  return result;
}
