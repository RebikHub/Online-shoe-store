import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import Order from "./pages/Order";
import ErrorPage from "./pages/ErrorPage";
import FormSearch from "./components/FormSearch";
import HeaderAndFooter from "./pages/HeaderAndFooter";
import TopSales from "./components/TopSales";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderAndFooter/>}>
        <Route index element={
          <>
            <TopSales/>
            <Catalog children={null}/>
          </>
        }/>
        <Route path="/catalog" element={
          <Catalog>
            <FormSearch classStyle={null}/>
          </Catalog>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/catalog/:id" element={<Order/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Route>
    </Routes>
  );
}
