import React, { createElement, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

import { COMMENT } from '../../graphql/mutation';
import { GET_USER } from '../../graphql/query';
import InputComment from '../controls/inputComment';  

const FormCommentReply = ({ articleId }) => {
  
  const { loading:loading, data:user} = useQuery(GET_USER);
  const [addComment] = useMutation(COMMENT);

  const [value, setValue] = useState({
    submitting: false,
    comment: ''
  })

  if(loading) return (<div>Login...</div>)

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ variables: {
        userId: user.get_user.id,
        postId: articleId,
        question: value.comment
      }
    }).then(async (data) => {
      setValue({
        submitting: true
      })
      setTimeout(() => {
          setValue({
            submitting: false
          })
      }, 1000)
    })
  }

  return (
    <Comment
      // author={<a href="#">{user.get_user.fullname}</a>}
      avatar={<Avatar src={user.get_user.image} />}
      content={
        <InputComment
          onChange={(e) =>
            setValue({ ...value, ['comment']:e.target.value })
          }
          onSubmit={handleSubmit}
          submitting={value.submitting}
          value={value.comment}
        />
      }
    />
  );
};

export default FormCommentReply;
