import { Route, Routes } from "react-router-dom";
import LayoutMain from "../pages/LayoutMain";
import TopSales from "../components/TopSales";
import Catalog from "../pages/catalog/Catalog";
import FormSearch from "../components/FormSearch";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import ErrorPage from "../pages/ErrorPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={
          <>
            <TopSales />
            <Catalog />
          </>
        } />
        <Route path="/catalog" element={
          <Catalog>
            <FormSearch />
          </Catalog>} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog/:id" element={<Order />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}