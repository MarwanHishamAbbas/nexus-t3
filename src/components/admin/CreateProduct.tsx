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

const CreateProductForm = ({}) => {
  // 1. Define your form.

  const form = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      category: "Templates",
      description: "",
      title: "",
      price: "",
    },
  });

  const router = useRouter();
  const { mutate: createProduct, isPending } = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: TProductSchema) {
    createProduct(values);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Product Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              className="w-full"
              size={"lg"}
              type="submit"
            >
              Create Product
              {isPending && <Loader2 className="ml-1 size-5 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
