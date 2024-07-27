"use client";
import { Button as Button2} from "@/components/ui/button";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { AddHotel } from "@/server-actions/hotels";

const formSchema = z.object({
  HotelRoom: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  OwnerName: z.string().min(2, {
    message: "must be at least 2 characters ",
  }),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string(),
});

const HotelForm = ({
  type = "add",
  initialData, 
}: {
  type: string,
  initialData?: any
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]) as any[];
  const [existingMedia = [], setExistingMedia] = useState(
    initialData?.media || []
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      HotelRoom: "",
      OwnerName: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      values.media = await UploadImageToFirebaseAndReturnUrls(uploadFiles)
      let response: any = null;
      if (type === "add") {
          response = await AddHotel(values)
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
      message.error(error.message);
    }
  };
  return (
    <div className="mt-14 gap-20 mb-3">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="HotelRoom"
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
            name="OwnerName"
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

          <div className="flex justify-start gap-5">
            <Button2
              variant="destructive"
              disabled={loading}
              onClick={() => router.push("/admin/hotels")}
            >
              Cancel
            </Button2>
            <Button2 type="submit">Submit</Button2>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HotelForm;
