import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CheckAdmin from './CheckAdmin';
import { AuthContext } from '../../provider/AuthProvider';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isAdmin, adminLoading } = CheckAdmin();
  const location = useLocation();

  if (loading || adminLoading) {
    return (
      <div className='flex justify-center'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
 
  return <Navigate state={location.pathname} to='/login' replace></Navigate>;
};

AdminRoutes.propTypes = {
  children: PropTypes.node
}

export default AdminRoutes;