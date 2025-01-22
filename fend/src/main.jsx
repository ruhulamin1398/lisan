import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router";
import router from './router.jsx';
import { TransactionsProvider } from './context/TransactionContext.jsx';

createRoot(document.getElementById('root')).render(

  <TransactionsProvider>
    <RouterProvider router={router}>


    </RouterProvider>
  </TransactionsProvider>
)
