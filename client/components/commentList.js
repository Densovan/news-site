import React,{ useState, createElement } from 'react';
import { List, Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import FormComment from '../components/common/comment';

const CommentList = ({ comments, articleId, reply }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [userId, setUserId] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={e => {console.log(comments)}}>Reply</span>,
  ];

  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={comments => <Comment 
        actions={[
          <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
              {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
              <span className="comment-action">{likes}</span>
            </span>
          </Tooltip>,
          <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
              {React.createElement(
                action === 'disliked' ? DislikeFilled : DislikeOutlined,
              )}
              <span className="comment-action">{dislikes}</span>
            </span>
          </Tooltip>,
          <span key="comment-basic-reply-to" onClick={() => {setUserId(comments.id)}}>Reply</span>,
        ]}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          }
          content={comments.question} 
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        >
          { comments.id === userId && <FormComment articleId={articleId} commentId={comments.id} />}
          {reply.map((reply) => {
            return(
              <div key={reply.id}>{comments.id === reply.questionId && <Comment
                actions={
                  [
                    <Tooltip key="comment-basic-like" title="Like">
                      <span onClick={like}>
                        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                        <span className="comment-action">{likes}</span>
                      </span>
                    </Tooltip>,
                    <Tooltip key="comment-basic-dislike" title="Dislike">
                      <span onClick={dislike}>
                        {React.createElement(
                          action === 'disliked' ? DislikeFilled : DislikeOutlined,
                        )}
                        <span className="comment-action">{dislikes}</span>
                      </span>
                    </Tooltip>,
                    <span key="comment-basic-reply-to" onClick={() => {setUserId(comments.id)}}>Reply</span>,
                  ]
                }
                author={<a>Han Solo</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <p>
                    {reply.answer}
                  </p>
                }
              >
              </Comment>}</div>
            )
          })}
        </Comment>
      }
    />
  )
}

export default CommentList;