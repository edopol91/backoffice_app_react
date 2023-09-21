import React, {useMemo} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginForm} from "./pages/Login";
import {Dashboard} from "./pages/Dashboard";
import API from "./api";
import {TitleProvider} from "./context/titleContext";


function App() {
    const [title, setTitle] = React.useState('');

    const getTitle = () => {
        API.get('/stores').then(
            res => {
                setTitle(res.data[0].data.name);
            }
        );
    }
    useMemo(() => {
        getTitle()
    }, []);

  return (
      <TitleProvider value={title}>
          <BrowserRouter>
              <Routes>
                  <Route path="/login" element={<LoginForm/>}/>
                  <Route path="/dashboard/*" element={<Dashboard/>}/>
                  <Route path={'*'} element={<LoginForm/>}></Route>
              </Routes>
          </BrowserRouter>
      </TitleProvider>
  );
}

export default App;
