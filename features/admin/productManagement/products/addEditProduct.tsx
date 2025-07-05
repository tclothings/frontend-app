import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "app/api/admin/categories";
import { useProducts } from "app/api/admin/products";
import CustomCheck from "app/components/form/customCheck";
import ImageUpload from "app/components/form/imageUpload";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import ProductImageUploader from "app/components/form/productImageUploader";
import ProductVideoUploader from "app/components/form/productVideoUploader";
import RichTextEditor from "app/components/form/richTextEditor";
import Select from "app/components/form/select";
import SubmitButton from "app/components/form/submitButton";
import { uploadToS3 } from "app/lib/configs/s3Client";
import { productSchema } from "app/lib/schemas/product";
import { IMedia, IProduct } from "app/lib/types";
import { slugify } from "app/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const emptyValue = "";
export interface VideoItem {
  file: File | null;
  previewUrl: string;
  s3Url?: string;
  uploaded: boolean;
  altText?: string;
}

export interface ImageItem extends VideoItem {
}

const addEditProduct = ({
  item,
  onSuccess,
  setSelectedItem,
}: {
  item?: IProduct;
  onSuccess: () => void;
  setSelectedItem: Dispatch<SetStateAction<any>>;
}) => {
  const [fileName, setFileName] = useState<string>("");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [imageItems, setImageItems] = useState<VideoItem[]>([]);

  const { addProduct, updateProduct, products } = useProducts();
  const [categoryList, setCategoryList] = useState([]);
  const { categories } = useCategories({ params: { limitless: true } });

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      isActive: true,
      media: [],
    },
  });

  const initialValues = {
    name: item?.name ?? emptyValue,
    description: item?.description ?? emptyValue,
    price: item?.price ?? 0,
    quantity: item?.quantity ?? 0,
    salePrice: item?.salePrice ?? 0,
    materials: item?.materials ?? emptyValue,
    productImage: item?.productImage ?? emptyValue,
    isActive: item?.isActive ?? true,
    isFeatured: item?.isFeatured ?? false,
    category: item?.category ?? emptyValue,
    size: item?.size ?? emptyValue,
    media: item?.media ?? [],
  };
  const { handleSubmit, reset, setValue, watch } = methods;

  const media = watch("media") ?? [];
const description = watch("description");
  useEffect(() => {
    if (item) {
      reset(initialValues);
      if (item.media?.length) {
        const existingVideos = item?.media
          .filter((item) => item.mediaType === "video")
          ?.map(({ mediaType, url, altText }) => ({
            mediaType,
            url,
            altText,
            s3Url: url,
            previewUrl: url,
            file: null,
            uploaded: true,
          }));
        if (existingVideos?.length) {
          setVideos(existingVideos);
        }
        const existingImages = item?.media
          .filter((item) => item.mediaType === "image")
          ?.map(({ mediaType, url, altText }) => ({
            mediaType,
            url,
            altText,
            s3Url: url,
            previewUrl: url,
            file: null,
            uploaded: true,
          }));
        if (existingImages?.length) {
          setImageItems(existingImages);
          
        }
      }
    }
  }, [item]);

  useEffect(() => {
    if (addProduct.isSuccess) {
      toast.success(addProduct?.data?.message);
      addProduct.reset();
      reset();
      onSuccess();
    }
  }, [addProduct.isSuccess]);

  useEffect(() => {
    if (updateProduct.isSuccess) {
      toast.success(updateProduct?.data?.message);
      updateProduct.reset();
      reset();
      onSuccess();
      setSelectedItem(null);
    }
  }, [updateProduct.isSuccess]);

  useEffect(() => {
    if (categories.data) {
      const categoriesList = categories.data?.categories;
      if (categoriesList?.length) {
        setCategoryList(
          categoriesList?.map((item: IProduct) => ({
            label: item.name,
            value: item._id,
          }))
        );
      }
    }
  }, [categories.isSuccess]);

  const onAddEditProduct = (data: any) => {
    let cleanedData = { ...data };
    delete cleanedData.image;
    cleanedData.slug = slugify(cleanedData.name);
    if (item) {
      updateProduct.mutate({ id: item._id, data: cleanedData });
    } else {
      addProduct.mutate(cleanedData);
    }
  };

  const handleFileChange = async (file: File) => {
    if (file) {
      try {
        const url = await uploadToS3(file, "productImage");
        setValue("productImage", url);
        setFileName(file.name);
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Image upload failed");
      }
    }
  };
  const onSaveVideos = (newMedia: IMedia[]) => {
    const mediaArray = [...media, ...newMedia];
    setValue("media", mediaArray);
  };
  const onSaveImages = (newMedia: IMedia[]) => {
    const mediaArray = [...media, ...newMedia];
    setValue("media", mediaArray);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5">
        <Input
          name="name"
          placeholder="Name"
          methods={methods}
          type="text"
          schema={productSchema}
        />

        <RichTextEditor
          value={description}
          onChange={(html) => setValue("description", html)}
        />
        {/* <Input
          name="description"
          placeholder="Description"
          methods={methods}
          type="text"
          schema={productSchema}
        /> */}
        <ImageUpload
          name="image"
          methods={methods}
          placeholder="Image (600 x 600)"
          handleFileChange={handleFileChange}
          fileNames={fileName}
          initialValue={item?.productImage}
        />
        <div className="flex flex-col md:flex-row gap-5">
          <Select
            name="category"
            placeholder="Category"
            methods={methods}
            options={categoryList}
          />
          <NumberInput
            name="quantity"
            placeholder="Quantity"
            methods={methods}
            schema={productSchema}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <NumberInput
            name="price"
            placeholder="Price"
            methods={methods}
            schema={productSchema}
          />
          <NumberInput
            name="salePrice"
            placeholder="Sales price"
            methods={methods}
            schema={productSchema}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <Input
            name="materials"
            placeholder="Materials"
            methods={methods}
            type="text"
            schema={productSchema}
          />
          <Input
            name="size"
            placeholder="Size"
            methods={methods}
            type="text"
            schema={productSchema}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <CustomCheck name="isActive" placeholder="Active" methods={methods} />
          <CustomCheck
            name="isFeatured"
            placeholder="Featured"
            methods={methods}
          />
        </div>
      </div>
      <ProductImageUploader
        imageItems={imageItems}
        setImageItems={setImageItems}
        onSave={onSaveImages}
      />
      <ProductVideoUploader
        videos={videos}
        setVideos={setVideos}
        onSave={onSaveVideos}
      />

      <div className="mt-10">
        <SubmitButton
          className="w-full"
          handleSubmit={handleSubmit(onAddEditProduct)}
          isLoading={addProduct.isPending || updateProduct.isPending}
          name={item ? "Save" : "Create"}
        />
      </div>
    </div>
  );
};

export default addEditProduct;
