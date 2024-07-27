"use client";

import { Button } from 'antd'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { message, Upload } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { AddHotel, EditHotel } from "@/server-actions/hotels";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  owner: z.string().min(2, {
    message: "must be at least 2 characters ",
  }),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string(),
});

const HotelForm = ({ type = "add", initialData,}: { type: string, initialData?: any}) => {
  const [loading, setLoading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]) as any[];
  const [existingMedia = [], setExistingMedia] = useState(
    initialData?.media || []
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    form.reset({
      name: initialData?.name || "",
      owner: initialData?.owner || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
    });
  }, [initialData, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadFiles)
      values.media = [...existingMedia, ...newUrls]
      let response: any = null;
      if (type === "add") {
          response = await AddHotel(values)
      } else {
        response = await EditHotel({
          hotelId: initialData._id,
          payload: values
        })
      }

      if (response.success) {
        message.success("Hotel added successfully")
        router.push("/admin/hotels")
      }

      if (!response.success) {
        message.error(response.error)
      }
      console.log("success", values);
    } catch (error: any) {
      console.log(error)
      message.error(error.message);
      
    }
  };
  return (
    <div className="mt-14 gap-20 mb-3">
      <Form {...form} >
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter room name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter owner name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='col-span-3 flex flex-row gap-3'>
            <div className='flex gap-5 '>
              {existingMedia.map((media: any, index: number) => (
                <div className='flex flex-col border border-solid rounded-md p-3' key={index}>
                <img src={media} alt='media' className='h-20 w-20 object-cover' />
                <span className='underline text-sm cursor-pointer mt-3 text-center' onClick={() => {
                  setExistingMedia(
                    existingMedia.filter(
                      (item: string, i: number) => i !== index
                    )
                  )
                }}>Remove</span>
                </div>      
              ))}
            </div>
            <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setUploadFiles([...uploadFiles, file]);
              return false;
            }}
            multiple
          >
            <span className="text-xs text-gray-500 p-3">Upload Media</span>
          </Upload>
          </div>

          
 
          <div className="flex justify-start gap-5">
            <Button
              disabled={loading}
              onClick={() => router.push("/admin/hotels")}
            >
              Cancel
            </Button>
            <Button loading={loading} htmlType="submit" type='primary'>
              { type === 'add' ? "Add" : "update" }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HotelForm;
