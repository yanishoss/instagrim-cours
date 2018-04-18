# Comment lancer l'API ?
**En mode développement (avec hot-reloading):**

```npm run dev```

**En mode production:**

```npm start```

# Attention: MongoDB est requis!

# Documentation

**Cette API est une API GraphQL, pas de support pour REST!**

**Route GraphQL:** ```/graphql```

**Route GraphiQL (interface pour faire des requêtes GraphQL):** ```/graphiql```

**Types:**

```scalar Date

type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post]
    feed(last: Int): [Post]
}

type Token {
    token: String!
    exp: Date!
}

type Post {
    id: ID!
    image: String!
    description: String
    author: User! 
}

type Query {
    user(username: String!, token: String, last: Int): User
    post(id: ID!): Post
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    authenticateUser(email: String!, password: String!): Token
    createPost(description: String, image: String!, token: String!): Post
}
