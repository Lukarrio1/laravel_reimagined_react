import React from "react";
import useNavigator from "../../../AMT/Custom Hooks/useNavigator";
import { Constants } from "../../../AMT/Abstract/Constants";
import usePostDataLayer from "../../../AMT/Data-layer/usePostDataLayer";
import PermissionWrapper from "../../../AMT/Wrappers/PermissionWrapper";
import useVerbiage from "../../../AMT/Custom Hooks/useVerbiage";
const {
  uuids: {
    blog: { edit_post_link_uuid, post_component_uuid },
  },
} = Constants;

export default function Post({ post }) {
  const { setNavProperties } = useNavigator(edit_post_link_uuid);
  const { deletePost } = usePostDataLayer();
  const { getVerbiage } = useVerbiage(post_component_uuid);

  return (
    <div className="col-sm-8 offset-sm-2 mt-3">
      <div className="card">
        <div className="card-header">
          {getVerbiage("post_title", { title: post?.title })}
        </div>
        <div className="card-body">
          <p>{getVerbiage("post_body", { body: post?.body })}</p>
          {post?.posts_owner && <p>Post Owner:{post?.posts_owner?.name}</p>}
          <p>
            {getVerbiage("post_status", {
              status: post?.is_active ? "true" : "false",
            })}
          </p>
        </div>
        <div className="card-footer text-center bg-white">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => setNavProperties({ ready: true, post: post?.id })}
          >
            {getVerbiage("post_edit_btn")}
          </button>{" "}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deletePost(post?.id)}
          >
            {getVerbiage("post_delete_btn")}
          </button>
        </div>
      </div>
    </div>
  );
}
