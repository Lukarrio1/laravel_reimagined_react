import React from "react";
import { Constants } from "../../../AMT/Abstract/Constants";
import usePostDataLayer from "../../../AMT/Data-layer/usePostDataLayer";
import useVerbiage from "../../../AMT/Custom Hooks/useVerbiage";
import useNavigator from "../../../AMT/Custom Hooks/useNavigator";
const {
  uuids: {
    blog: { edit_post_link_uuid, post_component_uuid },
  },
} = Constants;

const Post = ({ post }) => {
  const { setNavProperties } = useNavigator(edit_post_link_uuid);
  const { deletePost, deletingPost } = usePostDataLayer();
  const { getVerbiage } = useVerbiage(post_component_uuid);

  return (
    <div className="col-sm-8 offset-sm-2 mt-3">
      <div className="card">
        <div className="card-header">
          {getVerbiage("post_title", { title: post?.title })}
        </div>
        <div className="card-body">
          <p>{getVerbiage("post_body", { body: post?.body })}</p>
          {post?.posts_owner && (
            <p>
              {getVerbiage("post_owner", { owner: post?.posts_owner?.name })}
            </p>
          )}
          <p>
            {getVerbiage("post_status", {
              status: post?.is_active ? "true" : "false",
            })}
          </p>
        </div>
        <div className="card-footer text-center bg-white">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setNavProperties({ params: { post: post?.id } })}
          >
            {getVerbiage("post_edit_btn")}
          </button>{" "}
          <button
            className="btn btn-sm btn-danger"
            disabled={deletingPost()}
            onClick={() => deletePost(post?.id)}
          >
            {getVerbiage("post_delete_btn")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Post;
