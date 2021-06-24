import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/query";
import { FOLLOW } from "../../graphql/mutation";
import { Button } from 'antd'; 

const Follower = ({ articleUser }) => {
    const { loading, data:user} = useQuery(GET_USER);
    const [addFollow] = useMutation(FOLLOW);
    if(loading) return <div>loading...</div>;
    const userFollow = user.get_user;
    const handleFollow = (e) => {
        e.preventDefault();
        addFollow({ variables: { id: articleUser.id, fullname: articleUser.fullname, email: articleUser.email, image: articleUser.image }});
        
    }
    return(
        <div>
            { articleUser.id === user.get_user.id ? (
                <Button>View Profile</Button>
            ):(
                <Button onClick={handleFollow} >Follow</Button>
            )} 
        </div>
    )
}

export default Follower;