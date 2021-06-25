import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { FOLLOW, UNFOLLOW } from "../../graphql/mutation";
import { Button } from 'antd';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

const Follower = ({ articleUser }) => {
    const router = useRouter();
    const [state, setState] = useState(false);
    const [id, setId] = useState(null);
    const { loading, data: user } = useQuery(GET_USER);
    const [addFollow] = useMutation(FOLLOW);
    const [unfollow] = useMutation(UNFOLLOW);

    useEffect(() => {
        checkFollow();
    }, [])
    const checkFollow = () => {
        if (user.get_user !== null) {
            following.map((following) => {
                if (following.followingId === articleUser.id) {
                    setState(true)
                    setId(following.followingId)
                }
            })
        }
        if (following.length === 0 && user.get_user !== null) {
            setState(false)
        }
    }
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
            setId(articleUser.id);
        })
    }

    const handleUnFollow = (e, followingId) => {
        e.preventDefault();
        unfollow({ variables: { id: followingId } }).then(async (data) => {
            setState(false);
            setId(followingId);
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
            <div>
                <Button onClick={(e) => handleUnFollow(e, id)}>Following</Button>
            </div>
        )
    }
    if (state === false) {
        if (user.get_user === null) {
            follow.push(
                <div>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        router.push("/signin")
                    }}>Follow</Button>
                </div>)
        } else {
            follow.push(
                <div>
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