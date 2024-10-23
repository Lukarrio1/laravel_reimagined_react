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
  } = usePostDataLayer();

  useEffect(() => {
    if (fetchedPosts.length > 0) return;
    getPosts();
  }, []);

  return (
    <AnimationWrapper>
      <PermissionWrapper uuid={post_component_uuid}>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="col-sm-8"></div>
                <div className="col-sm-4">
                  Posts ({fetchedPosts?.length ?? 0})
                </div>
              </div>
            </div>
          </div>
          {gettingPosts() ? (
            <Loading></Loading>
          ) : (
            fetchedPosts &&
            fetchedPosts?.map((post) => {
              return <Post key={post.id} post={post}></Post>;
            })
          )}
        </div>
      </PermissionWrapper>
    </AnimationWrapper>
  );
}
