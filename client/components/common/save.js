import React, { useEffect, useState } from "react";
import { HiOutlineShare, HiOutlineBookmark } from "react-icons/hi";
import { useMutation } from "@apollo/client";
import { SAVE_NEWS } from "../../graphql/mutation";

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
      }).then(async (res) => {
        let check = res.data.save_news.message.split(" ");
        if (check[0] === "successful") {
          setSave(true);
        }
        if (check[0] === "delete") {
          setSave(false);
        }
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleSave}
        style={{ cursor: "pointer" }}
        // className="save-bg"
        className={saves ? "save-bg" : "no-save-bg"}
      >
        <HiOutlineBookmark className={saves ? "save" : "no-save"} size={23} />
      </button>
      <div className="tt_share">{save.length}</div>
    </div>
  );
};

export default save;
