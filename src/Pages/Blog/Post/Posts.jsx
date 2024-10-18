import React, { useEffect } from "react";
import AnimationWrapper from "../../../AMT/Wrappers/AnimationWrapper";
import usePostDataLayer from "../../../AMT/Data-layer/usePostDataLayer";
import Post from "../Components/Post";
import Loading from "../../Components/Loading";
import { Constants } from "../../../AMT/Abstract/Constants";
import PermissionWrapper from "../../../AMT/Wrappers/PermissionWrapper";
const {
  uuids: {
    blog: { post_component_uuid },
  },
} = Constants;
export default function Posts() {
  const {
    gettingPosts,
    getPosts,
    fetchedData: { fetchedPosts },
    deletingPost,
  } = usePostDataLayer();

  useEffect(() => {
    if (!deletingPost()) return;
    getPosts();
  }, []);

  useEffect(() => {
    if (deletingPost()) return;
    getPosts();
  }, [deletingPost()]);

  return gettingPosts() ? (
    <Loading></Loading>
  ) : (
    <AnimationWrapper>
      <PermissionWrapper uuid={post_component_uuid}>
        <div className="row">
          {fetchedPosts &&
            fetchedPosts?.map((post) => {
              return <Post key={post.id} post={post}></Post>;
            })}
        </div>
      </PermissionWrapper>
    </AnimationWrapper>
  );
}
