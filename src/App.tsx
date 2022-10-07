import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Catalog from "./components/Catalog";
import Contacts from "./components/Contacts";
import ErrorPage from "./components/ErrorPage";
import FormSearch from "./components/FormSearch";
import HeaderAndFooter from "./components/HeaderAndFooter";
import Order from "./components/Order";
import TopSales from "./components/TopSales";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderAndFooter/>}>
        <Route index element={
          <>
            <TopSales/>
            <Catalog/>
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
