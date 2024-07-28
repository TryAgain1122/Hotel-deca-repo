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
    <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
      {rooms.map((room: RoomType) => (
        <Link href={`book-room/${room._id}`} key={room._id}>
          <div className="flex flex-col gap-2">
            <img
              src={room.media[0]}
              className="w-full h-64 object-cover rounded-md shadow-md"
            />
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
