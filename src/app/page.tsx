
import classes from "./page.module.css";
import Maintenance from "@/components/maintenance/Maintenance";
import HomeLayout from "@/components/home/HomeLayout";

const maintenance = process.env.MAINTENANCE === "true";
const showViewport = process.env.SHOW_VIEWPORT === "true";

export default function Home() {

  if (maintenance) {
    return <Maintenance/>
  }

  return (
    <div className={classes.appShell}>
      <HomeLayout />

      {showViewport &&
          <p style={{ position: "fixed", bottom: 8, left: 8, fontSize: 12, opacity: 0.7 }}>
            {window.innerWidth} x {window.innerHeight}
          </p>
      }
    </div>
  );
}
