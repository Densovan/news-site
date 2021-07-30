import { gql } from '@apollo/client';

const GET_USERS = gql`
    query{
        get_users{
            id
            email
            fullname
            role
            ban
            image
        }
    }
`;

const GET_ALL_NEWS = gql`
    query{
        get_all_news{
            id
            title
            des
            thumnail
            category
            type
            user{
                fullname
            }
            createdAt
        }
    }

`

const GET_CATEGORIES = gql`
    query{
        get_categories{
            id
            name
            user{
                fullname
            }
        }
    }
`

const GET_TYPES = gql`
    query{
        get_types{
            id
            name
            user{
                fullname
            }
        }
    }
`

const GET_MEMBERS = gql`
    query{
        get_members{
            id
            name
            position
            image
            createdAt
        }
    }

`

export {
    GET_USERS,
    GET_ALL_NEWS,
    GET_CATEGORIES,
    GET_TYPES,
    GET_MEMBERS
}
