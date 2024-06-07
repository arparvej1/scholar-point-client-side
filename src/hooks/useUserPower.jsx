import CheckAdmin from '../PrivateRoutes/isAdmin/CheckAdmin';
import CheckAgent from '../PrivateRoutes/isAgent/CheckAgent';
import CheckAgentOrAdmin from '../PrivateRoutes/isAgent/CheckAgentOrAdmin';

const useUserPower = () => {
  const { isAdmin, adminLoading } = CheckAdmin();
  const { isAgent, agentLoading } = CheckAgent();
  const { isAgentOrAdmin, agentOrAdminLoading } = CheckAgentOrAdmin();

  return { isAdmin, adminLoading, isAgent, agentLoading, isAgentOrAdmin, agentOrAdminLoading };
};

export default useUserPower;