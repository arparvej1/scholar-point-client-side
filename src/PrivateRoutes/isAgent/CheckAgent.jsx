import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckAgent = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAgent, setIsAgent] = useState(false);
  const [agentLoading, setAgentLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && !loading) {
      axiosSecure.get(`/checkagent/${user?.email}`)
        .then(res => {
          console.log(res.data);
          setAgentLoading(false);
          if (res.data.agent) {
            setIsAgent(true);
          }
          // console.log('check agent hit');
        })
        .catch(error => {
          console.log(error);
          console.log('check agent not hit');
        });
      // console.log(user.email);
    }
  }, [user, loading]);

  return { isAgent, agentLoading };
};

export default CheckAgent;
