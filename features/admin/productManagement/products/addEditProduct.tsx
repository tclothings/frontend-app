import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "app/api/admin/categories";
import { useProducts } from "app/api/admin/products";
import CustomCheck from "app/components/form/customCheck";
import ImageUpload from "app/components/form/imageUpload";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import ProductImageUploader from "app/components/form/productImageUploader";
import ProductVideoUploader from "app/components/form/productVideoUploader";
import Select from "app/components/form/select";
import SubmitButton from "app/components/form/submitButton";
import { uploadToS3 } from "app/lib/configs/s3Client";
import { productSchema } from "app/lib/schemas/product";
import { IMedia, IProduct } from "app/lib/types";
import { slugify } from "app/lib/utils";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import JoditEditor from "jodit-react"

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
    const editor = useRef(null);
    const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [imageItems, setImageItems] = useState<VideoItem[]>([]);

  const { addProduct, updateProduct } = useProducts();
  const [categoryList, setCategoryList] = useState([]);
  const { categories } = useCategories({ params: { limitless: true } });


// console.log(item, "item")
const initialValues = useMemo(
  () => ({
    name: item?.name ?? emptyValue,
    description: item?.description ?? emptyValue,
    price: item?.price ?? 0,
    quantity: item?.quantity ?? 0,
    salePrice: item?.salePrice ?? 0,
    materials: item?.materials ?? emptyValue,
    productImage: item?.productImage ?? emptyValue,
    isActive: item?.isActive ?? true,
    isFeatured: item?.isFeatured ?? false,
    category: item?.category?._id ?? emptyValue,
    size: item?.size ?? emptyValue,
    media: item?.media ?? [],
  }),
  [item]
  );
  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      isActive: true,
      media: [],
    },
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  const media = watch("media") ?? [];

useEffect(() => {
  if (!categories.data) return;

  const list = categories.data.categories.map((cat: IProduct) => ({
    label: cat.name,
    value: cat._id,
  }));

  setCategoryList(list);
  reset(initialValues); // Only reset after categories are ready
  if (item?.description) {
    setDescription(item?.description);
}
  if (item?.media?.length) {
    const videoMedia = item.media
      .filter((m) => m.mediaType === "video")
      .map((m) => ({
        file: null,
        previewUrl: m.url,
        s3Url: m.url,
        uploaded: true,
        altText: m.altText,
      }));
    const imageMedia = item.media
      .filter((m) => m.mediaType === "image")
      .map((m) => ({
        file: null,
        previewUrl: m.url,
        s3Url: m.url,
        uploaded: true,
        altText: m.altText,
      }));
    setVideos(videoMedia);
    setImageItems(imageMedia);
  }
}, [categories.data, item, reset]);

  
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
    if (categoryList.length) {
      reset(initialValues);
  }
  }, [categoryList])
  
  useEffect(() => {
    if (description) {
      setValue("description", description);
    }
  }, [description]);

 
  const onAddEditProduct = (data: any) => {
    let cleanedData = { ...data };
    delete cleanedData.image;
    cleanedData.slug = slugify(cleanedData.name);
    const editedImages = imageItems?.map((image) => ({ mediaType: "image", url: image.s3Url, altText: image.altText })) ?? []
    const editedVideos =
      videos?.map((image) => ({
        mediaType: "video",
        url: image.s3Url,
        altText: image.altText,
      })) ?? [];

    cleanedData.media = [...editedImages, ...editedVideos];
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

  const handleRemoveMedia = (urlToRemove: string) => {
    const updatedMedia = media.filter(
      (item: IMedia) => item.url !== urlToRemove
    );
    setValue("media", updatedMedia);
    setImageItems((prev) =>
      prev.filter((item) => item.previewUrl !== urlToRemove)
    );
    setVideos((prev) => prev.filter((item) => item.previewUrl !== urlToRemove));
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
        <div className="mb-7 bg-[var(--background)]">
          <JoditEditor
            ref={editor}
            value={description}
            config={{
              toolbar: true,
              ...({ placeholder: "Description" } as any),
              style: {
                background: "var(--background)", // light gray background
                color: "var(--foreground)", // dark text
                padding: "16px",
                borderRadius: "8px",
                // border: "1px solid #e5e7eb",
              },
            }}
            onBlur={(newContent) => setDescription(newContent)}
          />
        </div>

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
            disabled={categories.isPending}
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
        <div className="flex flex-col sm:flex-row justify-between gap-5">
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
        onRemove={handleRemoveMedia}
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
