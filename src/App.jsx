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
    path: "/",
    element: <MainLayout />,
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
  {
    path: "/admin", element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="products" /> },
      { path: "users", element: <Users />, index: true, },
      { path: "carts", element: <Carts /> },
      { path: 'products', element: <Products /> }
    ]
  },
  { path: "*", element: <Error /> }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
