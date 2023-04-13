// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ListDisponibilitiesPage from './Pages/ListDisponibilitiesPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AddDisponibility from './Pages/AddDisponibilityPage';
import AddDisponibilityPage from './Pages/AddDisponibilityPage';
import AuthProtectedRoute from './Components/AuthProtectedRoute';
import EditProfilePage from './Pages/EditProfilePage';
import UserProtectedRoute from './Components/UserProtectedRoute';
import ListUserReservationsPage from './Pages/ListUserReservationsPage';
// import ListProjectsPage from './Pages/ListProjectsPage';
// import AddProjectPage from './Pages/AddProjectPage';
// import ListTasksPage from './Pages/ListTasksPage';
// import AddTaskPage from './Pages/AddTaskPage';
// import ListHistoriesPage from './Pages/ListHistoriesPage';
// import AdminProtectedRoute from './Components/AdminProtectedRoute';
// import AuthProtectedRoute from './Components/AuthProtectedRoute';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <main>
        {/* <Container> */}
      <Routes>
      <Route path='/' element={<ListDisponibilitiesPage/>} /> 
      <Route path='/AddDisponibility' element={<AddDisponibilityPage/>} /> 
      <Route element={<AuthProtectedRoute/>}>
      <Route path='/EditProfile' element={<EditProfilePage/>} /> 
      </Route>
      <Route element={<UserProtectedRoute/>}>
      <Route path='/ListUserReservations' element={<ListUserReservationsPage/>} /> 
      </Route>
       {/* defining protected routes  */}
       {/* <Route element={<AdminProtectedRoute/>}>
      <Route path='/AddProject' element={<AddProjectPage/>} /> 
      </Route>
      <Route element={<AuthProtectedRoute/>}>
      <Route path='/AddTask' element={<AddTaskPage/>} /> 
      <Route path='/History' element={<ListHistoriesPage/>} /> 
      </Route> */}
      {/*  */}
      {/* <Route path='/Tasks' element={<ListTasksPage/>} />  */}
      <Route path='/Login' element={<LoginPage/>} /> 
      <Route path='/Register' element={<RegisterPage/>} /> 
      </Routes>
      {/* </Container> */}
      </main> 
      <Footer className='mt-5'/> 
    </div>
  );
}


export default App;
