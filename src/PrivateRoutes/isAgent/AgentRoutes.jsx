import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../provider/AuthProvider';
import CheckAgentOrAdmin from './CheckAgentOrAdmin';

const AgentRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isAgentOrAdmin, agentOrAdminLoading } = CheckAgentOrAdmin();
  const location = useLocation();

  if (loading || agentOrAdminLoading) {
    return (
      <div className='flex justify-center'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAgentOrAdmin) {
    return children;
  }

  return <Navigate state={location.pathname} to='/login' replace></Navigate>;
};

AgentRoutes.propTypes = {
  children: PropTypes.node
}

export default AgentRoutes;