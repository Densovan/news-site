import React, { useState, createElement } from "react";
import { List, Comment, Tooltip, Avatar, Dropdown, Menu } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  MoreOutlined,
} from "@ant-design/icons";
import FormComment from "../components/common/comment";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/query";
import { DELETE_COMMENT, DELETE_REPLY } from "../graphql/mutation";

const CommentList = ({ comments, articleId, reply, fullname }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [answer, setAnswer] = useState({
    typeReplyComment: null,
    replyAnswer: null,
    replyComment: null
  })
  const [idEditCm, setIdEditCm] = useState(null);
  const [idEditQ, setIdEditQ] = useState(null);

  const { data: user, loading } = useQuery(GET_USER, {
    pollInterval: 500,
  });
  const [deleteQuestion] = useMutation(DELETE_COMMENT);
  const [deleteAnswer] = useMutation(DELETE_REPLY);

  if (loading) return <div>loading...</div>;

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const handleDelete = (key, id) => {
    if (key === "question") {
      deleteQuestion({ variables: { id: id } });
    }
    if (key === "answer") {
      deleteAnswer({ variables: { id: id } });
    }
  };
  const handleEdit = (key, id) => {
    if (key === "question") {
      setIdEditCm(id);
    }
    if (key == "answer") {
      setIdEditQ(id);
    }
  };

  const getCheck = (key, item) => {
    if (key === "answer") {
      setIdEditQ(item);
    }
    if (key === "question") {
      setIdEditCm(item);
    }
    if (key === "answerType") {
      setAnswer({
        replyAnswer: null
      })
    }
  };

  const doReset = (key, item) => {
    if (key === "editReplyQuestion") {
      setIdEditCm(item)
    }
    if (key === "editReplyAnswer") {
      setIdEditQ(item)
    }
    if (key === "replyComment") {
      setAnswer({
        typeReplyComment: item,
      })
    }
    if (key === "replyAnswer") {
      setAnswer({
        replyAnswer: item,
      })
    }
  }
  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(comments) => (
        <div>
          <div>
            {idEditCm !== comments.id && (
              <Comment
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                }}
                actions={[
                  <Tooltip key="comment-basic-like" title="Like">
                    <span onClick={like}>
                      {createElement(
                        action === "liked" ? LikeFilled : LikeOutlined
                      )}
                      <span className="comment-action">{likes}</span>
                    </span>
                  </Tooltip>,
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                    <span onClick={dislike}>
                      {React.createElement(
                        action === "disliked" ? DislikeFilled : DislikeOutlined
                      )}
                      <span className="comment-action">{dislikes}</span>
                    </span>
                  </Tooltip>,
                  <span
                    key="comment-basic-reply-to"
                    onClick={() => {
                      setAnswer({
                        typeReplyComment: comments.id
                      })
                    }}
                  >
                    Reply
                  </span>
                ]}
                author={<div>{comments.user.fullname}</div>}
                avatar={
                  <Avatar
                    src={comments.user.image}
                    alt={comments.user.fullname}
                  />
                }
                content={comments.question}
                datetime={
                  <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                    <span>
                      {moment(parseInt(comments.createdAt)).fromNow()}
                    </span>
                  </Tooltip>
                }
              >
                <div>
                  <Dropdown.Button
                    overlay={
                      <Menu style={{ width: "120px" }}>
                        {comments.user.id === user.get_user.id && (
                          <Menu.Item key="0">
                            <a
                              onClick={() =>
                                handleEdit("question", comments.id)
                              }
                            >
                              Edit
                            </a>
                          </Menu.Item>
                        )}
                        {comments.user.id === user.get_user.id && (
                          <Menu.Item key="1">
                            <a
                              onClick={() =>
                                handleDelete("question", comments.id)
                              }
                            >
                              Delete
                            </a>
                          </Menu.Item>
                        )}
                        <Menu.Item key="3">Report</Menu.Item>
                      </Menu>
                    }
                    icon={<MoreOutlined />}
                    trigger={["click"]}
                  />
                </div>
              </Comment>
            )}
          </div>
          <div style={{ marginLeft: 30 }}>
            {comments.id === answer.typeReplyComment && (
              <FormComment
                articleId={articleId}
                commentId={comments.id}
                getCheck={getCheck}
                check="answerType"
                keyBtn="replyComment"
                getName={comments.user.fullname}
                doReset={doReset}
              />
            )}
          </div>
          {idEditCm === comments.id && (
            <FormComment
              articleId={articleId}
              object={comments}
              check="Question"
              keyBtn="editReplyQuestion"
              getCheck={getCheck}
              doReset={doReset}
            />
          )}
          {reply.map((reply) => {
            return (
              <div key={reply.id}>
                {comments.id === reply.questionId && idEditQ !== reply.id && (
                  <Comment
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: 30,
                    }}
                    actions={[
                      <Tooltip key="comment-basic-like" title="Like">
                        <span onClick={like}>
                          {createElement(
                            action === "liked" ? LikeFilled : LikeOutlined
                          )}
                          <span className="comment-action">{likes}</span>
                        </span>
                      </Tooltip>,
                      <Tooltip key="comment-basic-dislike" title="Dislike">
                        <span onClick={dislike}>
                          {React.createElement(
                            action === "disliked"
                              ? DislikeFilled
                              : DislikeOutlined
                          )}
                          <span className="comment-action">{dislikes}</span>
                        </span>
                      </Tooltip>,
                      <span
                        key="comment-basic-reply-to"
                        onClick={() => {
                          setAnswer({
                            replyAnswer: reply.id,
                            replyComment: comments.id
                          });
                        }}
                      >
                        Reply
                      </span>,
                      <span
                        key="comment-basic-reply-to"
                        onClick={() => {
                          setAnswer({
                            replyAnswer: '',
                            replyComment: ''
                          })
                        }}
                      >
                      </span>,
                    ]}
                    author={<a>{reply.user.fullname}</a>}
                    avatar={
                      <Avatar
                        src={reply.user.image}
                        alt={reply.user.fullname}
                      />
                    }
                    content={<p>{reply.answer}</p>}
                    datetime={
                      <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                        <span>
                          {moment(parseInt(reply.createdAt)).fromNow()}
                        </span>
                      </Tooltip>
                    }
                  >
                    <div>
                      <Dropdown.Button
                        style={{
                          borderColor: "transparent",
                          boxShadow: "none",
                        }}
                        overlay={
                          <Menu style={{ width: "120px" }}>
                            {reply.user.id === user.get_user.id && (
                              <Menu.Item key="0">
                                <a
                                  onClick={() => handleEdit("answer", reply.id)}
                                >
                                  Edit
                                </a>
                              </Menu.Item>
                            )}
                            {reply.user.id === user.get_user.id && (
                              <Menu.Item key="1">
                                <a
                                  onClick={() =>
                                    handleDelete("answer", reply.id)
                                  }
                                >
                                  Delete
                                </a>
                              </Menu.Item>
                            )}
                            <Menu.Item key="3">Report</Menu.Item>
                          </Menu>
                        }
                        icon={<MoreOutlined />}
                        trigger={["click"]}
                      />
                    </div>
                  </Comment>
                )}
                <div style={{ marginLeft: 30 }}>
                  {comments.id === reply.questionId && idEditQ === reply.id && (
                    <FormComment
                      articleId={articleId}
                      object={reply}
                      check="Answer"
                      getCheck={getCheck}
                      keyBtn="editReplyAnswer"
                      doReset={doReset}
                    />
                  )}
                </div>
                <div style={{ marginLeft: 30 }}>
                  {reply.id === answer.replyAnswer && comments.id === reply.questionId && (
                    <FormComment 
                      articleId={articleId}
                      getCheck={getCheck}
                      commentId={comments.id}
                      check="answerType"
                      keyBtn="replyAnswer"
                      getName={reply.user.fullname}
                      doReset={doReset}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    />
  );
};

export default CommentList;
