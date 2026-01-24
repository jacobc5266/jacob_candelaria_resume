import Maintenance from "@/components/maintenance/Maintenance";
import HomeLayout from "@/components/home/HomeLayout";

const maintenance = process.env.MAINTENANCE === "true";


export default function Home() {

  if (maintenance) {
    return <Maintenance/>
  }

  return (
      <HomeLayout />
  );
}
