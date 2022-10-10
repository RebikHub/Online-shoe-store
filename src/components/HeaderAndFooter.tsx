import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function HeaderAndFooter(): ReactElement {
  const banner = require('../img/banner.jpg');
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
