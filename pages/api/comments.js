import { GraphQLClient, gql } from "graphql-request";

const graphlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphlAPI, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $numberOfStars: Int!
      $userHasRated: Boolean!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          numberOfStars: $numberOfStars
          userHasRated: $userHasRated
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
  }

}
