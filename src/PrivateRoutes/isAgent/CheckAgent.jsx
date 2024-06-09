import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckAgent = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAgent, setIsAgent] = useState(false);
  const [agentLoading, setAgentLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading) {
      if (user) {
        axiosSecure.get(`/checkAgent/${user.email}`)
          .then(res => {
            // console.log(res.data);
            if (res.data.agent) {
              setIsAgent(true);
            }
            setAgentLoading(false);
          })
          .catch(error => {
            console.log(error);
            setAgentLoading(false);
          });
      } else {
        setAgentLoading(false);
      }
    }
  }, [user, loading]);

  return { isAgent, agentLoading };
};

export default CheckAgent;
