import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import banner from '../../media/img/banner.jpg'

export default function LayoutMain(): ReactElement {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
