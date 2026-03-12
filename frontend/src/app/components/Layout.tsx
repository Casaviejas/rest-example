import { Outlet } from "react-router";
import { WavesBackground } from "./WavesBackground";

export function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <WavesBackground />
      <Outlet />
    </div>
  );
}
