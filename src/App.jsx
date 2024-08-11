import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kid from './pages/Kid';
import Search from './pages/Search';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Error from './pages/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

const AppLayout = () => (
  <>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
  </>
);

const AppLayout2 = () => (
  <>
    <Header />
    <Admin />
  </>
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/men", element: <Men /> },
      { path: "/women", element: <Women /> },
      { path: "/kid", element: <Kid /> },
      { path: "/search", element: <Search /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/detail/:id", element: <ProductDetail /> },

    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <AppLayout2 /> },
  { path: "*", element: <Error /> }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
