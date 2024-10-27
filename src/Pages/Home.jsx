import React, { useEffect, useState } from "react";
import PermissionWrapper from "../AMT/Wrappers/PermissionWrapper";
import useVerbiage from "../AMT/Custom Hooks/useVerbiage";
import AnimationWrapper from "../AMT/Wrappers/AnimationWrapper";
import useSettings from "../AMT/Custom Hooks/useSettings";
import useAuthUser from "../AMT/Custom Hooks/useAuthUser";
import { Constants } from "../AMT/Abstract/Constants";
import useNavigator from "../AMT/Custom Hooks/useNavigator";
import Loading from "./Components/Loading";
import useRest from "../AMT/Custom Hooks/useRest";
import { restClient } from "../AMT/Abstract/restClient";

const {
  uuids: {
    home_page: { welcome_component_uuid, home_page_uuid },
    auth_uuids: { login_page_link_uuid },
  },
} = Constants;
const styles = {
  welcomeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
};
const Home = () => {
  const user = useAuthUser();
  const { getVerbiage } = useVerbiage(home_page_uuid);
  const { getSetting } = useSettings();

  const { setNavProperties } = useNavigator(login_page_link_uuid);

  const LoginPageLink = setNavProperties({
    params: {},
    queryParams: { name: "jason" },
  });

  const [posts, setPosts] = useState();

  const getPosts = async () => {
    const response = await restClient(
      "dPxd1N1My1Ny3vyBJeBs2ARXJbXhCnQeJnlBPTuB7FOGjOYROH"
    );
    if (response == null) return;
    const { data } = response;
    setPosts(data);
  };

  useEffect(() => {
    console.log(LoginPageLink.node);
    getPosts();
  }, []);

  return (
    <AnimationWrapper>
      <div
        className="container-fluid text-center"
        style={styles.welcomeSection}
      >
        <PermissionWrapper uuid={welcome_component_uuid}>
          <h1>
            {getVerbiage("title", { app_name: getSetting("client_app_name") })}
          </h1>
          <p className="lead">
            {getVerbiage("welcome_message", { user_name: user?.name })}
          </p>
        </PermissionWrapper>

        {posts &&
          posts?.map((post) => {
            return (
              <>
                <div className="">{post?.title}</div>
                <div className="">{post?.body}</div>
              </>
            );
          })}
      </div>
    </AnimationWrapper>
  );
};
export default Home;
