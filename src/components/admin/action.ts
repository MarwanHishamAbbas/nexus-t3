"use server";
import { put } from "@vercel/blob";
export async function formAction(formData: FormData) {
  // Parse the incoming form data

  // Get the file from the form data
  const image = formData.get("image") as File;
  console.log(image);
  if (image) {
    const { url } = await put(image.name, image, {
      access: "public",
      addRandomSuffix: false,
    });
    return url;
  }
  if (!image) return;
}
