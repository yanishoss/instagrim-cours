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

```
// Permet d'utiliser une date
scalar Date

// Utilisateur par défaut, avec obligatoirement un nom d'utilisateur, une email
type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post]
    feed(last: Int): [Post]
}

// Token (JWT) retourné à l'authentification
type Token {
    token: String!
    exp: Date!
}

// Publication par défaut, avec obligatoirement une image et un auteur (un auteur de type User)
type Post {
    id: ID!
    image: String!
    description: String
    author: User! 
}

type Query {
    // Retourne l'utilisateur ayant le nom d'utilisateur passé en paramètre
    // Ne retourne que l'email, le nom d'utilsateur et les publications si token est vide ou incorrect
    // Retourne le fil d'actualité si le token est passé en paramètre et est valide
    user(username: String!, token: String, last: Int): User
    
    // Retourne le post ayant l'ID passé en paramètre
    post(id: ID!): Post
}

type Mutation {
    // Permet de créer un utilisateur
    createUser(username: String!, email: String!, password: String!): User!
    
    // Permet d'authentifier un utilisateur avec son email et mot de passe, retourne un Token
    authenticateUser(email: String!, password: String!): Token
    
    // Créer une publication
    // Requière un Token (JWT) valide passé son forme de String
    // Requière une image
    createPost(description: String, image: String!, token: String!): Post
}
