import { request, gql } from "graphql-request";


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
            node {
              author {
                bio
                name
                id
                photo {
                    url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
          }
        }
      }
    }

  `

  const { data } = await request(graphqlAPI, query);
  console.log(result);
  return data.postsConnection.edges;
};
