import Nav from "../Nav/Nav";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Nav/>
      <Outlet/>
    </div>);
}