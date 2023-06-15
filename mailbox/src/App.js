import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Userdashboard } from './pages';

const App = () => {


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route path='*' element={<Login />} />
            <Route path='userdashboard' element={<Userdashboard/>} />
        </Routes>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      </BrowserRouter>
    </div>
  );
}

export default App;
