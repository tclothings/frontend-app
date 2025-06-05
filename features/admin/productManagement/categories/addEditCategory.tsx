import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "app/api/admin/categories";
import CustomCheck from "app/components/form/customCheck";
import Input from "app/components/form/Input";
import SubmitButton from "app/components/form/submitButton";
import { emptyValue } from "app/lib/constants";
import { categorySchema } from "app/lib/schemas/product";
import { ICategory } from "app/lib/types";
import { slugify } from "app/lib/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddEditCategoryProps {
  item?: ICategory | undefined;
  onSuccess: () => void;
}
const AddEditCategory = ({ item, onSuccess }: AddEditCategoryProps) => {
  const { addCategory, updateCategory } = useCategories();
  
  const methods = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      is_active: true
    },
  });
  
  const initialValues = {
    name: item?.name ?? emptyValue,
    description: item?.description ?? emptyValue,
    is_active: item?.is_active ?? true,
  };


  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (item) {
      reset(initialValues);
    }
  }, [item]);

  useEffect(() => {
    if (addCategory.isSuccess) {
      console.log(addCategory?.data, "addCategory?.data");
      toast.success(addCategory?.data?.message);
      addCategory.reset();
      reset();
      onSuccess();
    }
  }, [addCategory.isSuccess]);

  useEffect(() => {
    if (updateCategory.isSuccess) {
      console.log(updateCategory?.data, "updateCategory?.data");
      toast.success(updateCategory?.data?.message);
      updateCategory.reset();
      reset();
      onSuccess();
    }
  }, [updateCategory.isSuccess]);

  const onAddNewCategory = (data: any) => {
    const cleanedData = { ...data };
    cleanedData.slug = slugify(cleanedData.name);
    if (item) {
      updateCategory.mutate(cleanedData);
    } else {
      addCategory.mutate(cleanedData);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <Input
          name="name"
          placeholder="Name"
          methods={methods}
          type="text"
          schema={categorySchema}
        />
        <Input
          name="description"
          placeholder="Description"
          methods={methods}
          type="text"
          schema={categorySchema}
        />
        <CustomCheck name="is_active" placeholder="Active" methods={methods} />
        <SubmitButton
          handleSubmit={handleSubmit(onAddNewCategory)}
          isLoading={addCategory.isPending}
          name={item ? "Save" : "Create"}
        />
      </div>
    </div>
  );
};

export default AddEditCategory;
