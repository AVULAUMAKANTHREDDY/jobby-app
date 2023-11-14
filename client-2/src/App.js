import {Routes, Route} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Jobs from './components/Jobs/Jobs';
import JobItemDetails from './components/JobItemDetails/JobItemDetails';
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
    <div className="App">
    <Routes>
    <Route exact path = "/auth" element={<Auth />}/>
    <Route exact path = "/" element={<Home/> }/>
    <Route exact path='/Jobs' element={<Jobs/>}/>
    <Route exact path ="/jobs/:id" element={<JobItemDetails />}/>
    <Route path ="*" element={<NotFound />}/>
    </Routes>
      
    </div>
  );
}

export default App;
