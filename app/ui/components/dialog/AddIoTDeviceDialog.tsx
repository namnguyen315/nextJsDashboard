import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiSquarePlus } from "react-icons/ci";

export default function AddIoTDeviceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex border-[0px] flex-row w-[95%] h-[40px] bottom-0 p-[5px_10px] absolute bg-[#252836] rounded-md items-center hover:bg-slate-500 transition duration-[0.5s] ease-[ease]"
          variant="outline"
        >
          <CiSquarePlus size="30px" color="#FEFBF6" />
          <p className="w-[calc(100%_-_30px)] flex justify-center items-center text-[14px] font-bold text-slate-200">
            Add IoT device
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add IoT Device</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="example: Smart Tivi"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Id Device
            </Label>
            <Input
              id="username"
              placeholder="example: 123456789"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">ADD</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
