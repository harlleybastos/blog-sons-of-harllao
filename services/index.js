import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzgyMTcyOTksImF1ZCI6WyJodHRwczovL2FwaS1jYS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2Nrd2U3bDBwMTB1bG4wMXhwOHZudmRheXMvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzg2N2JkZGUtNTk0Yy00MjQ5LThhNmQtNTgzMzAwODQzYzg4IiwianRpIjoiY2t3bDRhNjFnMTNqOTAxemQxZTNlY3J3aCJ9.2oe17aGBFPtYAQJClgxZqbZl_RICywxRanNSM2pxqwaSkdGMMa6vRzNwE5HlB0PDaHTz71wcUev07nVKzeml2KSnAovZOqgpFHbvOOxx9mqTg6tThwqABzHdslgXh33XVtWiq1AXX_MzU1jz8lY8MjKqagP_1GLWh1KrKlppiyPSB1cE6s9jjapcyM4LIrmLvgEMj3X5jAzhG8tu_dEX21it9_5Z1nNt27Nb07aeAk7Vuhq_6lO0Sk8HyvM_XYe2p1kwstYgja-UdegIPPjrNPkSLzZukV3bu6PZzoaLzjKYYB70FufrlS1J9j7NNuYglfs5e-BqnAgjgyjGUomEdrmyAcKslmY3qiIXZmOlXoDVFfxmE0FcpfzP5Dp9B3yw0tYwxkKQf6aFDZoluKIo-Ygo4jOlTdGnn1lkcTnRLc9kpWhNyfMD6RqtogFZ4rjdahTW3uPlfXr6mBdfesWcGNNO95vkh1Zx8ZbdhVpZABfK99AJSRyExshg3BgGarXyBuGmSMRY_KoSo43UCUOHGp0vHCmX0wN8cRGU6sBQrjYko8-zxmZh4b4SxsjFQz5UscF-vLHjfz_ZE7Zeyyqla4waZxMj3UUpDSjwr1OyR-G3jgXDzcP1arQQrbSfiBPpzS8T-JvKGGx-6gjUPtxCnDVgLvDuPDAMB4uvbcRxyQU",
  },
});
export const getPosts = async () => {
  const query = gql`
    query {
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
  `;

  const result = await graphQLClient.request(query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
      query GetPostDetails(){
        posts(
          orderBy: createdAt_ASC
          last:3
          ){
            title
            featuredImage{
              url
            }
            createdAt
            slug
          }
      }
  `;

  const result = await graphQLClient.request(query);
  return result.posts;
};

export const getSimilarPost = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await graphQLClient.request(query,{categories, slug});
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await graphQLClient.request(query);
  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const result = await graphQLClient.request(query,{ slug });
  return result.post;
};
