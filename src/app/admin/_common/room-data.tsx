
import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-models";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

async function RoomsData() {
  const response = await RoomModel.find()
    .populate("hotel")
    .sort({ createdAt: -1 });
  const rooms = await JSON.parse(JSON.stringify(response));

  if (rooms.lengh === 0) {
    return (
      <div className="text-3xl w-full h-[100vh] flex justify-center items-center">
        No rooms Found
      </div>
    );
  }
  return (
    <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-7">
      {rooms.map((room: RoomType) => (
        <Link href={`book-room/${room._id}`} key={room._id}>
          <div className="flex flex-col gap-2 border-gray-200 border-solid border rounded-md hover:scale-[1.1] transition-all duration-300 shadow-md">
            <img
              src={room.media[0]}
              className="w-full h-64 object-cover rounded-lg"
            />

            <div className="px-3 py-2 flex flex-col text-sm gap-2">
              <span className="text-md font-semibold">{room.name}</span>
              <span className="text-slate-900 text-lg">
                {room.hotel.name} - {room.hotel.address}
              </span>
              <hr className="border-gray-200 border border-solid" />
              <div className="flex justify-between items-center">
                <span>
                  ₱ <strong> {room.rentPerDay}</strong> /Per Day
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {/* <Carousel>
        <CarouselContent className="w-full max-w-xs">
          {rooms.map((room: RoomType) => (
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <img
                      src={room.media[0]}
                      className="w-full h-64 object-cover rounded-md shadow-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
}

export default RoomsData;
