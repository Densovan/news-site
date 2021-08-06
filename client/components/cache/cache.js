import { InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
          fields: {
            get_all_news_by_type_news: offsetLimitPagination(),
          },
        },
    },
});