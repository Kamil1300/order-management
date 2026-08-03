import Image from "next/image";
import {Card} from "@/components/common/Card"

export default function Home() {
  return (
    <div>
      <div className="text-center pt-8 font-extrabold text-2xl">
    <h1>RaftLab's Special Canteen</h1>
    </div>
    <div className="flex m-30 font-sans">
     <Card/>
    </div>
    </div>
  );
}
