/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { PlusCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { Loader2 } from "lucide-react";

import {
  ProductSchema,
  type TProductSchema,
} from "~/lib/validator/product-validator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

import { useRouter } from "next/navigation";
import { formAction } from "./action";

const CreateProductForm = ({}) => {
  // 1. Define your form.

  const form = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      category: "Templates",
      description: "",
      title: "",
      price: 0,
    },
  });

  const router = useRouter();

  const { mutate: createProduct, isPending } = api.product.create.useMutation({
    onSuccess: () => {
      form.resetField("image");
      form.resetField("price");
      form.reset();
      router.refresh();
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: TProductSchema) {
    const formData = new FormData();
    formData.append("image", values.image);
    const imageUrl = await formAction(formData);
    createProduct({ ...values, image: imageUrl ?? "" });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className=" mb-4 ml-auto w-fit gap-1">
          <PlusCircle className="size-5" />
          <span className="">Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Templates">Templates</SelectItem>
                        <SelectItem value="Wallpapers">Wallpapers</SelectItem>
                        <SelectItem value="Icons">Icons</SelectItem>
                        <SelectItem value="Fonts">Fonts</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Product Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Product Price"
                      {...fieldValues}
                      onChange={(e) => {
                        fieldValues.onChange(parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      placeholder="Upload Image"
                      accept="image/*"
                      onChange={(e) => {
                        const image = e.target.files?.[0];
                        fieldValues.onChange(image);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending || form.control._formState.isSubmitting}
              className="w-full"
              size={"lg"}
              type="submit"
            >
              Create Product
              {isPending || form.control._formState.isSubmitting ? (
                <Loader2 className="ml-1 size-5 animate-spin" />
              ) : null}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
