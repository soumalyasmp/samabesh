import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AlumniDirectory from './pages/AlumniDirectory';
import SuccessStories from './pages/SuccessStories';
import Login from './pages/Login';
import RegistrationForm from './components/Registrationform';
import DonationForm from './components/DonationForm';
import EventList from './components/EventList';
import AlumniProfile from './pages/AlumniProfile';
import CurrentStudentRegistrationForm from './components/CurrentStudentRegistrationForm';
import CurrentStudentLogin from './pages/CurrentStudentLogin';
import CurrentStudentProfile from './pages/CurrentStudentProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import AdminEventListing from './pages/AdminEventListing';
import AdminJobList from './pages/AdminJobList';
import AdminAlumniDirectory from './pages/AdminAlumniDirectory';
import AdminStudent from './pages/AdminStudent';
import AboutUs from './components/AboutUs';
import AdminAlumniDonation from './pages/AdminAlumniDonation';
import JobList from './components/JobList';
import JobsPostedByAlumni from './components/JobPostedByAlumni';
import JobApplicants from './components/JobApplicants';
import CurrentStudentDirectory from './pages/CurrentStudentDirectory';
import LoginPage from './pages/LoginPage';
import ConnectionsList from './pages/ConnectionsList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={<AlumniDirectory />} />
        <Route path="/success" element={<SuccessStories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate/:projectID" element={<DonationForm />} />
        <Route path="/alumni-register" element={<RegistrationForm />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/alumni/:id" element={<AlumniProfile />} />
        <Route path="/student-register" element={<CurrentStudentRegistrationForm />} />
        <Route path="/student/login" element={<CurrentStudentLogin />} />
        <Route path="/student/:id" element={<CurrentStudentProfile />} />
        <Route path="/jobs-posted-by/:alumniName" element={<JobsPostedByAlumni />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/donations" element={<AdminAlumniDonation/>}/>
        <Route path="/alumni/:id/connections" element={<ConnectionsList/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/loginpage" element={<LoginPage/>}/>
        <Route path="/admin/students" element={<AdminStudent/>}/>
        <Route path="/admin/alumni" element={<AdminAlumniDirectory/>}/>
        <Route path="/student/directory" element={<CurrentStudentDirectory/>}/>
        <Route path="/admin/jobs" element={<AdminJobList/>}/>
        <Route path="/jobs/:jobId/applicants" element={<JobApplicants/>}/>
        <Route path="/admin/events" element={<AdminEventListing/>}/>
        <Route path="/jobs" element={<JobList/>}/>

 
      </Routes>
    </Router>
  );
};

export default App;
