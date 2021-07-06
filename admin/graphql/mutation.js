import { gql } from '@apollo/client';

const ADD_CATEGORY = gql`
    mutation(
        $name:String!
    ){
        add_cat(
            name: $name
        ){
            message
        }
    }
`

const ADD_TYPE = gql`
    mutation(
        $name:String!
    ){
        add_type(
            name: $name
        ){
            message
        }
    }
`

const ADD_MEMBER = gql`
    mutation(
        $name:String!
        $position:String!
        $image:String!
    ){
        add_member(
            name:$name
            position:$position
            image:$image
        ){
            message
        }
    }
`

export {
    ADD_CATEGORY,
    ADD_TYPE
}