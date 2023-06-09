import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import TopNavBar from '../components/TopNavBar';
import CreateStudySession from '../pages/CreateStudySession';
import StudySessionList from '../pages/StudySessionList';
import Calendar from '../pages/Calendar';
import UserHome from '../pages/user/UserHome';
import CreateFeedback from '../pages/CreateFeedback';
import UserHomeSession from '../pages/user/UserHomeSession';
import FeedBacksList from '../pages/FeedBacksList';
import AdminHome from '../pages/admin/AdminHome';
import AdminHomeSession from '../pages/admin/AdminHomeSession';
import AdminHomeFeedback from '../pages/admin/AdminHomeFeedback';
import AdminHomeReport from '../pages/admin/AdminHomeReport';
import CreateReport from '../pages/CreateReport';
import EditReport from '../pages/EditReport';
import UserHomeJoin from '../pages/user/UserHomeJoin';
import FeatureGuide from '../pages/FeatureGuide';
import EditStudySession from '../pages/EditStudySession';
import Leaderboard from '../pages/Leaderboard';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <TopNavBar />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/create-study-session" element={<ProtectedRoute><CreateStudySession /></ProtectedRoute>} />
          <Route path="/study-session-list" element={<ProtectedRoute><StudySessionList /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/user-home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/user-home-session" element={<ProtectedRoute><UserHomeSession /></ProtectedRoute>} />
          <Route path="/user-home-join" element={<ProtectedRoute><UserHomeJoin /></ProtectedRoute>} />
          <Route path="/create-feedback" element={<CreateFeedback />} />
          <Route path="/feature-guide" element={<FeatureGuide />} />
          <Route path="/create-feedback" element={<ProtectedRoute><CreateFeedback /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/create-report" element={<ProtectedRoute><CreateReport /></ProtectedRoute>} />
          <Route path="/edit-study-session/:owner" element={<ProtectedRoute><EditStudySession /></ProtectedRoute>} />
          <Route path="/edit-report/:owner" element={<ProtectedRoute><EditReport /></ProtectedRoute>} />
          <Route path="/feedback-list" element={<AdminProtectedRoute ready={ready}><FeedBacksList /></AdminProtectedRoute>} />
          <Route path="/admin-home" element={<AdminProtectedRoute ready={ready}><AdminHome /></AdminProtectedRoute>} />
          <Route path="/admin-home-session" element={<AdminProtectedRoute ready={ready}><AdminHomeSession /></AdminProtectedRoute>} />
          <Route path="/admin-home-report" element={<AdminProtectedRoute ready={ready}><AdminHomeReport /></AdminProtectedRoute>} />
          <Route path="/admin-home-feedback" element={<AdminProtectedRoute ready={ready}><AdminHomeFeedback /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
