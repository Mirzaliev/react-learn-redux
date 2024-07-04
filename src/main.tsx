import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./store/store";
import {fetchUsers} from "./modules/users/model/fetch-users";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";

store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={routes}/>
      </Provider>
  </React.StrictMode>,
)
