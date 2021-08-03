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
const EDIT_CATEGORY = gql`
    mutation(
        $id: ID!
        $name:String!
    ){
        edit_cat(
            id: $id
            name: $name
        ){
            message
        }
    }
`
const DELETE_CATEGORY = gql`
    mutation($id: ID!){
        delete_cat(id: $id){
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
const EDIT_TYPE = gql`
    mutation(
        $id: ID!
        $name:String!
    ){
        edit_type(
            id: $id
            name: $name
        ){
            message
        }
    }
`
const DELETE_TYPE = gql`
    mutation($id: ID!){
        delete_type(id: $id){
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
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    EDIT_TYPE,
    DELETE_TYPE,
    ADD_TYPE,
    ADD_MEMBER
}