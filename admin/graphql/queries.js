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
            createBy
            slug
        }
    }

`

const GET_CATEGORIES = gql`
    query{
        get_categories{
            id
            name
            createBy
        }
    }
`

const GET_TYPES = gql`
    query{
        get_types{
            id
            name
            createBy
        }
    }
`

export {
    GET_USERS,
    GET_ALL_NEWS,
    GET_CATEGORIES,
    GET_TYPES
}
