import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { FOLLOW, UNFOLLOW } from "../../graphql/mutation";
import { Button } from 'antd';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

const Follower = ({ articleUser }) => {
    const router = useRouter();
    const [state, setState] = useState(false);
    const [followId, setFollowId] = useState(null);
    const { loading, data:user } = useQuery(GET_USER);

    const [addFollow] = useMutation(FOLLOW);
    const [unfollow] = useMutation(UNFOLLOW);

    useEffect(() => {
        if (user === undefined) {
            return
        }
        if (user.get_user !== null) {
            if (following.length === 0) {
                setState(false)
            }else{
                following.map((following) => {
                    if (following.followingId === articleUser.id) {
                        setState(true)
                        setFollowId(following.followingId)
                    }
                })
            }
        }
    }, [user])

    if (loading) return <div>loading...</div>;

    const handleFollow = (e) => {
        e.preventDefault();
        addFollow({
            variables: {
                id: articleUser.id,
                fullname: articleUser.fullname,
                email: articleUser.email,
                image: articleUser.image
            }
        }).then(async (data) => {
            setState(true);
        })
    }

    const handleUnFollow = (e, followingId) => {
        e.preventDefault();
        unfollow({ variables: { id: followingId } }).then(async (data) => {
            setState(false);
        })

    }
    const following = [];
    const follow = [];

    if (user.get_user !== null) {
        user.get_user.following.forEach(object => {
            following.push(object);
        });
    }
    if (state === true) {
        follow.push(
            <div key="1">
                <Button onClick={(e) => handleUnFollow(e, followId)}>Following</Button>
            </div>
        )
    }
    if (state === false) {
        if (user.get_user === null) {
            follow.push(
                <div key="1">
                    <Button onClick={(e) => {
                        e.preventDefault()
                        router.push("/signin")
                    }}>Follow</Button>
                </div>)
        } else {
            follow.push(
                <div key="1">
                    <Button type="primary" onClick={handleFollow}>Follow</Button>
                </div>
            )
        }
    }

    return (
        <div>
            {follow}
        </div>
    )
}

export default Follower;