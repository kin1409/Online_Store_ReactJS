import React from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom';
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
import Users from './components/Users';
import Carts from './components/Carts';
import Products from './components/Products';

const MainLayout = () => (
  <>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
  </>
);

const AdminLayout = () => (
  <>
    <Header />
    <Admin />
  </>
);


const router = createBrowserRouter([
  {
    path: "/Online_Store_ReactJS/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/Online_Store_ReactJS/", element: <Home /> },
      { path: "/Online_Store_ReactJS/dev", element: <Home /> },
      { path: "/Online_Store_ReactJS/men", element: <Men /> },
      { path: "/Online_Store_ReactJS/women", element: <Women /> },
      { path: "/Online_Store_ReactJS/kid", element: <Kid /> },
      { path: "/Online_Store_ReactJS/search", element: <Search /> },
      { path: "/Online_Store_ReactJS/checkout", element: <Checkout /> },
      { path: "/Online_Store_ReactJS/detail/:id", element: <ProductDetail /> },

    ],
  },
  { path: "/Online_Store_ReactJS/login", element: <Login /> },
  {
    path: "/Online_Store_ReactJS/admin", element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="products" /> },
      { path: "/Online_Store_ReactJS/admin/users", element: <Users />, index: true, },
      { path: "/Online_Store_ReactJS/admin/carts", element: <Carts /> },
      { path: '/Online_Store_ReactJS/admin/products', element: <Products /> }
    ]
  },
  { path: "*", element: <Error /> }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
