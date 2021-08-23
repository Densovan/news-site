import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { FOLLOW, UNFOLLOW } from "../../graphql/mutation";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Follow = ({ articleUser, follows }) => {
  const [state, setState] = useState({
    loading: false,
    follow: false,
  })
  const [follow]  = useMutation(FOLLOW);
  useEffect(() => {
    follows.get_follows.map((follow) => {
      if (follow.followTo === articleUser.id) {
        setState({
          follow: true,
        })
      }
    })
  },[follows])
  const handleFollow = async () => {
    try{
      if (state.follow == false) {
        setState({
            loading: true,
            follow: true
        })
        follow({
            variables: {
                followTo: articleUser.id
            }
        }).then((response) => {
          console.log(response);
        })
        setTimeout(() => {
            setState({
              loading: false,
              follow: true
            })
        }, 1000);        
      }else{
        setState({
            loading: true,
            follow: false
        })
        setTimeout(() => {
            setState({
              loading: false,
              follow: false
            })
        }, 1000);
      }
    }catch(e){
      console.log("error");
    }
  }
  console.log(state.follow);
  return (
    <div key="1">
      <button className="btn-follow" onClick={handleFollow}>{state.loading ? (state.follow ? "Follow..." : "Following...") :  (state.follow ? "Following" : "Follow")}</button>
    </div>
    );
};

export default Follow;
