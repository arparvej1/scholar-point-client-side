import { useEffect, useState } from "react";
import CheckAdmin from "../isAdmin/CheckAdmin";
import CheckAgent from "./CheckAgent";

const CheckAgentOrAdmin = () => {
  const [isAgentOrAdmin, setIsAgentOrAdmin] = useState(false);
  const [agentOrAdminLoading, setAgentOrAdminLoading] = useState(true);

  const { isAdmin, adminLoading } = CheckAdmin();
  const { isAgent, agentLoading } = CheckAgent();

  useEffect(() => {
    if ((isAdmin && !adminLoading) || (isAgent && !agentLoading)) {
      setIsAgentOrAdmin(true);
      setAgentOrAdminLoading(false);
    }

    if (!adminLoading && !agentLoading) {
      setAgentOrAdminLoading(false);
    }
  }, [isAdmin, isAgent, adminLoading, agentLoading]);

  return { isAgentOrAdmin, agentOrAdminLoading };

};

export default CheckAgentOrAdmin;