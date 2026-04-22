import { Link, Outlet } from "react-router-dom";
import GymListFound from "./GymListFound";

export default function GymListPage() {
  return (
    <section className="page-placeholder">
      <h1>헬스장</h1>
      <h3>
        <GymListFound />
      </h3>
      <Outlet />
    </section>
  );
}
