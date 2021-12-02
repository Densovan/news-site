import { gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    get_users {
      bio
      fullname
      image
      email
      role
      accountId
      id
      gender
      createdAt
      news {
        title
      }
      following {
        id
        email
        fullname
        followingId
      }
      follower {
        id
        email
        fullname
        followerId
      }
    }
  }
`;
const GET_USER_BY_ID = gql`
  query ($id: ID!) {
    get_user_by_id(id: $id) {
      bio
      image
      fullname
      email
      role
      id
      gender
      accountId
      createdAt
      news {
        voteCount
        title
        createdAt
        id
        category
        thumnail
        type
        slug
        des
        user {
          fullname
          image
          id
          accountId
        }
        types {
          name
        }
        categories {
          name
        }
      }
      following {
        id
        email
        fullname
        followingId
      }
      follower {
        id
        email
        fullname
        followerId
      }
      following {
        id
        email
        fullname
        followingId
      }
      follower {
        id
        email
        fullname
        followerId
      }
    }
  }
`;

const GET_OWN_NEWS_BY_ID = gql`
  query ($id: ID!, $limit: Int!, $offset: Int!) {
    get_own_news_by_id(id: $id, limit: $limit, offset: $offset) {
      voteCount
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
        id
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_USER = gql`
  query {
    get_user {
      accountId
      image
      bio
      fullname
      email
      role
      id
      gender
      createdAt
      news {
        title
      }
      get_following {
        userFollowing {
          fullname
          image
          id
          email
        }
      }
      get_follower {
        userFollower {
          fullname
          image
          id
          email
        }
      }
      following {
        id
        email
        fullname
        followingId
        image
      }
      follower {
        id
        email
        fullname
        followerId
        image
      }
    }
  }
`;
const GET_CATEGORIES = gql`
  query {
    get_cats {
      name
      id
      createdAt
    }
  }
`;

const GET_TYPES = gql`
  query {
    get_types {
      name
      id
      createAt
    }
  }
`;

const GET_OWN_NEWS = gql`
  query ($limit: Int, $offset: Int) {
    get_own_news(limit: $limit, offset: $offset) {
      voteCount
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        accountId
        fullname
        image
        id
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS = gql`
  query ($id: ID!) {
    get_news(id: $id) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      message
      user {
        fullname
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS = gql`
  query ($limit: Int, $offset: Int) {
    get_all_news(limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      voteCount
      thumnail
      voteCount
      type
      des
      slug
      user {
        accountId
        fullname
        image
        id
        bio
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_TOP = gql`
  query ($limit: Int, $offset: Int) {
    get_all_news_top(limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      voteCount
      thumnail
      voteCount
      type
      des
      slug
      user {
        accountId
        fullname
        image
        id
        bio
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_TODAY = gql`
  query ($limit: Int, $offset: Int) {
    get_all_news_today(limit: $limit, offset: $offset) {
      voteCount
      title
      createdAt
      id
      category
      thumnail
      type
      des
      slug
      user {
        fullname
        image
        id
        bio
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;
const GET_NEWS_SEARCH = gql`
  query ($search: String) {
    search_news_title(search: $search) {
      voteCount
      title
      createdAt
      id
      category
      thumnail
      type
      des
      slug
      user {
        fullname
        image
        id
        bio
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_BY_TYPE_NEWS = gql`
  query ($limit: Int!, $offset: Int!) {
    get_all_news_by_type_news(limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
        id
        bio
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_BY_TYPE_LEARN = gql`
  query ($limit: Int!, $offset: Int!) {
    get_all_news_by_type_learn(limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
        id
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_ALL_NEWS_BY_TYPE_FEATURE = gql`
  query ($limit: Int!, $offset: Int!) {
    get_all_news_by_type_feature(limit: $limit, offset: $offset) {
      title
      slug
      createdAt
      id
      category
      thumnail
      type
      des
      user {
        fullname
        image
        id
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_BY_SLUG = gql`
  query ($slug: String) {
    get_news_by_slug(slug: $slug) {
      id
      title
      createdAt
      category
      thumnail
      type
      slug
      des
      user {
        bio
        id
        fullname
        image
        email
        createdAt
        accountId
      }
      types {
        name
      }
      categories {
        name
      }
      comment {
        createdAt
        id
        question
        user {
          accountId
          id
          fullname
          image
        }
        answerId
      }
      reply {
        id
        createdAt
        user {
          accountId
          id
          fullname
          image
        }
        postId
        answer
        questionId
      }
      like {
        userId
        postId
      }
      save {
        news_id
        userId
      }
    }
  }
`;
const GET_NEWS_BY_TITLE = gql`
  query ($title: String) {
    get_news_by_title(title: $title) {
      id
      title
      createdAt
      category
      thumnail
      type
      slug
      des
      user {
        bio
        id
        fullname
        image
        email
        createdAt
      }
      types {
        name
      }
      categories {
        name
      }
      comment {
        createdAt
        id
        question
        user {
          id
          fullname
          image
        }
        answerId
      }
      reply {
        id
        createdAt
        user {
          id
          fullname
          image
        }
        postId
        answer
        questionId
      }
      like {
        userId
        postId
      }
      save {
        news_id
        userId
      }
    }
  }
`;

const GET_NEWS_BY_CATS = gql`
  query ($id: ID!, $limit: Int!, $offset: Int!) {
    get_allnews_by_cat(id: $id, limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_LEARN_BY_CAT = gql`
  query ($id: ID, $limit: Int!, $offset: Int!) {
    get_allnews_type_by_cat_learn(id: $id, limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_NEWS_BY_CAT = gql`
  query ($id: ID, $limit: Int!, $offset: Int!) {
    get_allnews_type_by_cat_news(id: $id, limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NEWS_FEATURE_BY_CAT = gql`
  query ($id: ID, $limit: Int!, $offset: Int!) {
    get_allnews_type_by_cat_feature(id: $id, limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      slug
      des
      user {
        fullname
        image
      }
      types {
        name
      }
      categories {
        name
      }
    }
  }
`;

const GET_NOTIFICATION_BY_USER = gql`
  query {
    get_notification_by_user {
      postId
    }
  }
`;

const GET_NOTIFICATION_CHECK_BY_USER = gql`
  query ($limit: Int!, $offset: Int!) {
    get_notification_check_by_user(limit: $limit, offset: $offset) {
      id
      type
      user {
        fullname
        image
      }
      news {
        title
        slug
      }
      createdAt
    }
  }
`;

const GET_LIKE_COUNT_DOWN = gql`
  query {
    get_count_up_down {
      id
      userId
      postId
      type
      like_count
    }
  }
`;

const GET_VOTE_UP_DOWN = gql`
  query {
    get_vote_up_down {
      id
      postId
      count
      type
      ownerId
      userId
    }
  }
`;

const GET_ALL_VOTE_UP_DOWN = gql`
  query {
    get_all_vote_up_down {
      id
      postId
      count
      type
      ownerId
      userId
    }
  }
`;
const GET_FOLLOWS = gql`
  query {
    get_follows {
      id
      followTo
      followBy
      user {
        accountId
        id
      }
    }
  }
`;
const GET_SAVED = gql`
  query ($limit: Int!, $offset: Int!) {
    get_save_news_by_userId(limit: $limit, offset: $offset) {
      title
      createdAt
      id
      category
      thumnail
      type
      des
      slug
    }
  }
`;

const GET_FOLLOWS_BY_USER = gql`
  query ($limit: Int!, $offset: Int!) {
    get_follows_by_user(limit: $limit, offset: $offset) {
      user {
        accountId
        get_follower {
          userFollower {
            accountId
            fullname
            image
            id
          }
        }
        get_following {
          userFollowing {
            accountId
            fullname
            image
            id
          }
        }
      }
    }
  }
`;

const GET_CHAT = gql`
  query {
    get_chats {
      id
      body
    }
  }
`;

const GET_CHAT_S = gql`
  subscription {
    newChat {
      id
      body
    }
  }
`;

const GET_NOTIFICATION = gql`
  query {
    get_news_notification {
      follow {
        id
        user {
          id
          fullname
          image
          accountId
        }
        userFollower {
          id
          fullname
          image
          accountId
        }
        notifications {
          user {
            id
            accountId
            fullname
            image
          }
          id
          read
          hide
          count
        }
        type
        createdAt
      }
      news {
        id
        news {
          title
          thumnail
          slug
        }
        user {
          id
          fullname
          image
          accountId
        }
        notifications {
          user {
            id
            accountId
            fullname
            image
          }
          id
          read
          hide
          count
        }
        type
        createdAt
      }
      comment {
        id
        news {
          title
          thumnail
          slug
        }
        user {
          id
          fullname
          image
          accountId
        }
        notifications {
          user {
            id
            accountId
            fullname
            image
          }
          id
          read
          hide
          count
        }
        type
        createdAt
      }
      reply {
        id
        news {
          title
          thumnail
          slug
        }
        user {
          id
          fullname
          image
          accountId
        }
        userTo {
          id
          fullname
          image
          accountId
        }
        notifications {
          user {
            id
            accountId
            fullname
            image
          }
          id
          read
          hide
          count
        }
        type
        createdAt
      }
      vote {
        id
        news {
          title
          thumnail
          slug
        }
        user {
          id
          fullname
          image
          accountId
        }
        notifications {
          user {
            id
            accountId
            fullname
            image
          }
          id
          read
          hide
          count
        }
        count
        type
        createdAt
      }
    }
  }
`;

export {
  GET_CHAT_S,
  GET_CHAT,
  GET_OWN_NEWS_BY_ID,
  GET_FOLLOWS_BY_USER,
  GET_SAVED,
  GET_NEWS_SEARCH,
  GET_ALL_NEWS_TODAY,
  GET_ALL_NEWS_TOP,
  GET_USER_BY_ID,
  GET_NEWS_BY_TITLE,
  GET_NEWS_FEATURE_BY_CAT,
  GET_NEWS_NEWS_BY_CAT,
  GET_NEWS_LEARN_BY_CAT,
  GET_NEWS_BY_CATS,
  GET_NEWS_BY_SLUG,
  GET_USERS,
  GET_USER,
  GET_CATEGORIES,
  GET_TYPES,
  GET_OWN_NEWS,
  GET_NEWS,
  GET_ALL_NEWS,
  GET_ALL_NEWS_BY_TYPE_NEWS,
  GET_ALL_NEWS_BY_TYPE_LEARN,
  GET_ALL_NEWS_BY_TYPE_FEATURE,
  GET_NOTIFICATION_BY_USER,
  GET_NOTIFICATION_CHECK_BY_USER,
  GET_LIKE_COUNT_DOWN,
  GET_VOTE_UP_DOWN,
  GET_ALL_VOTE_UP_DOWN,
  GET_FOLLOWS,
  GET_NOTIFICATION,
};
