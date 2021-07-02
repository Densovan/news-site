import { useEffect, useState } from "react";
import { Button } from "antd";
import { AiOutlineHeart } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { LIKE_ARTICLE } from "../../graphql/mutation";

const FormLike = ({ articleId, dataLike, myUser }) => {
  const [like, setLike] = useState(false);
  const [likeArticle] = useMutation(LIKE_ARTICLE);
  const [color, setColor] = useState(false);

  useEffect(() => {
    dataLike.map((like) => {
      if (like.userId === myUser.get_user.id) {
        setLike(true);
      }
    });
  }, [myUser, dataLike]);
  const handleLike = async () => {
    try {
      await likeArticle({
        variables: { postId: articleId },
      }).then(async (response) => {
        let check = response.data.like.message.split(" ");
        if (check[0] === "successful") {
          setLike(true);
        }
        if (check[0] === "delete") {
          setLike(false);
        }
        console.log(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="btn_box">
      <button
        onClick={handleLike}
        style={{ cursor: "pointer" }}
        className={like ? "like-bg" : "no-like-bg"}
      >
        <AiOutlineHeart className={like ? "like" : "no-like"} size={20} />
      </button>
      <div className="tt_like">{dataLike.length}</div>
    </div>
  );
};

export default FormLike;
