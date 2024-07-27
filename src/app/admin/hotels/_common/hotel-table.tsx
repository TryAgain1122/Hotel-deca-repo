"use client";

import { HotelType } from "@/interfaces";
// import { Table } from 'antd'
import React, { useState } from "react";
import dayjs from "dayjs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

import { message, Table } from "antd";
import { useRouter } from "next/navigation";
import { DeleteHotel } from "@/server-actions/hotels";

interface HotelTableProps {
  hotels: HotelType[];
}

const HotelTable: React.FC<HotelTableProps> = ({ hotels }) => {
  const [loading = false, setLoading] = useState<boolean>(false);

  const router = useRouter()


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: HotelType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: HotelType) => (
        <div className="flex gap-5 items-center">
          <FaRegTrashAlt
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => onDelete(record._id)}
          />
          <FaEdit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
          />
          <FaRegPlusSquare
            size={18}
            className="cursor-pointer text-green-700"
          />
        </div>
      ),
    },
  ];

  const onDelete = async (hotelId: string) => {
    try {
      setLoading(true)
      const response = await DeleteHotel(hotelId)
      if (response.success) {
        message.success(response.message)
      }

      if (!response.success) {
        message.error(response.error)
      }
    } catch(error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mt-10">
      <Table loading={loading} dataSource={hotels} columns={columns} />

      {/* <Table>
        <TableCaption>List of Hotels Created</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow>
              <TableCell>{hotel.name}</TableCell>
              <TableCell>{hotel.owner}</TableCell>
              <TableCell>{hotel.email}</TableCell>
              <TableCell>{hotel.phone}</TableCell>
              <TableCell>{hotel.address}</TableCell>
              <TableCell>{hotel.createdAt}</TableCell>
             <TableCell> 
                <FaRegTrashAlt size={18} className="cursor-pointer text-red-700"/>
            </TableCell>
              <TableCell>
                <FaEdit className="cursor-pointer text-yellow-700" size={18} onClick={() => router.push(`admin/hotels/edit/${HotelType}` )}/>
              </TableCell>
              <TableCell>
             < FaRegPlusSquare className="cursor-pointer text-green-700" size={18}/>
              </TableCell>x
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
};

export default HotelTable;
