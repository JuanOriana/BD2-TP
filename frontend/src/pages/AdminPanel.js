import AdminCard from "../components/AdminCard";
import {Center, Grid} from "@chakra-ui/react";
import {FiUsers} from "react-icons/fi";
import {AiOutlineUnorderedList} from "react-icons/ai";
import {BsCashCoin} from "react-icons/bs";

function AdminPanel() {
  return (<Center py={12}><Grid templateColumns='repeat(3, 1fr)' gap={6}>
    <AdminCard icon={FiUsers} title="Users" description="See all users"/>
    <AdminCard icon={AiOutlineUnorderedList} title="Links" description="See all available links at the moment"/>
    <AdminCard icon={BsCashCoin} title="Plans" description="See current plans and subscribers"/>

  </Grid></Center>);
}

export default AdminPanel;