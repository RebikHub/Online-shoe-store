import React from 'react';
import { Outlet } from 'react-router-dom';
import banner from '../img/banner.jpg';
import Footer from './Footer';
import Header from './Header';

export default function HeaderAndFooter() {
  return (
    <>
      <Header/>
        <main className="container">
          <div className="row">
            <div className="col">
              <div className="banner">
                <img src={banner} className="img-fluid" alt="К весне готовы!"/>
                <h2 className="banner-header">К весне готовы!</h2>
              </div>
              <Outlet/>
            </div>
          </div>
        </main>
      <Footer/>
    </>
  )
}
