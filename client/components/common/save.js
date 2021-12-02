import React, { useEffect, useState } from 'react';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { useMutation } from '@apollo/client';
import { SAVE_NEWS } from '../../graphql/mutation';
import { GET_NEWS_BY_SLUG } from '../../graphql/query';

const save = ({
  news_id,
  title,
  des,
  category,
  createBy,
  type,
  thumnail,
  slug,
  save,
  myUser,
  refetch
}) => {
  const [save_news] = useMutation(SAVE_NEWS);
  const [saves, setSave] = useState(false);

  useEffect(() => {
    save.map((saves) => {
      if (saves.userId === myUser.get_user.accountId) {
        setSave(true);
      }
    });
  }, [myUser, save]);

  const handleSave = async () => {
    try {
      await save_news({
        variables: {
          news_id,
          title,
          des,
          category,
          createBy,
          type,
          thumnail,
          slug,
        },
        refetchQueries: [{ query: GET_NEWS_BY_SLUG, variables:{slug} }],
      }).then(async (res) => {
        let check = res.data.save_news.message.split(' ');
        console.log(check);
        // refetch({variables: slug})
        if (check[0] === 'Successfully') {
          setSave(true);
        }
        if (check[0] === 'delete') {
          setSave(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="boxSave">
        {saves ? 
            <><li onClick={handleSave} className="save-icon-save">
              <MdBookmark
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: ' translate(-50%,-50%)',
                }}
              />
            </li>
            <li style={{ paddingTop: '4px', width: '48px' }}>
              <span>{save.length}</span>
            </li></>
          : 
            <><li onClick={handleSave} className="icon-save">
              <MdBookmarkBorder
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: ' translate(-50%,-50%)',
                }}
              />
            </li>
            <li style={{ paddingTop: '4px', width: '48px' }}>
              <span>{save.length}</span>
            </li></>
        }
      </div>
  );
};

export default save;
