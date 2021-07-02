import { useEffect, useState } from "react";
import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { LIKE_ARTICLE } from "../../graphql/mutation";


const FormLike = ({ articleId, dataLike, myUser }) => {
    const [like, setLike] = useState(false);
    const [likeArticle] = useMutation(LIKE_ARTICLE);

    useEffect(() => {
        dataLike.map((like) => {
            if (like.userId === myUser.get_user.id) {
                setLike(true)
            }
        })
    },[myUser, dataLike])
    const handleLike = async () => {
        try{
            await likeArticle({
                variables: {postId: articleId}
            }).then(async (response) => {
                let check = response.data.like.message.split(" ");
                if (check[0] === "successful") {
                    setLike(true)
                }
                if (check[0] === "delete"){
                    setLike(false)
                }
            })
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div className="btn_box">
          <Button
            onClick={handleLike}
            style={{ borderColor: "transparent", boxShadow: "none", backgroundColor: like ? "#262e3c" : "transparent" }}
            shape="circle"
            icon={<HeartOutlined style={{ color: like ? "#fff" : "#000" }} />}
            size="large"
          />
          <div className="tt_like">{dataLike.length}</div>
        </div>
    )
}

export default FormLike;