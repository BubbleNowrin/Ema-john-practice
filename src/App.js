
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layouts/Main';
import Shop from './components/shop/Shop'
import Orders from './components/Orders/Orders';
import About from './components/About/About';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartData } from './loaders/ProductsAndCartData';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import PrivateRoutes from './components/routes/PrivateRoutes';
import Shipping from './components/Shipping/Shipping';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Shop></Shop>
        },
        {
          path: '/orders',
          loader: productsAndCartData,
          element: <Orders></Orders>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/inventory',
          element: <PrivateRoutes><Inventory></Inventory></PrivateRoutes>
        },
        {
          path: '/shipping',
          element: <PrivateRoutes><Shipping></Shipping></PrivateRoutes>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        }
      ]
    }

  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
