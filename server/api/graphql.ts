import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { v4 as uuidv4 } from "uuid";
import { typeDefs } from "~~/typeDefs";

type User = {
  id: string;
  full_name: string;
  age: number;
};
type UserCreateInput = {
  full_name: string;
  age: number;
};
type UserUpdateInput = {
  id: string;
  full_name: string;
  age: number;
};
type UserDeleteInput = {
  id: string;
};
type UserQueryInput = {
  id?: string;
  name_contains?: string;
  age_gte?: number;
  age_lte?: number;
};

const users: User[] = [
  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      // 動作確認用に１つだけuuidを固定させている
      id: i === 0 ? "660688c2-3b47-4de3-ad0e-af92a75731f9" : uuidv4(),
      full_name: `${
        ["John", "Mike", "Tom", "Bob"][
          // ランダムに選ぶ
          Math.floor(Math.random() * 4)
        ]
      } ${
        ["Smith", "Brown", "Johnson", "Williams"][
          // ランダムに選ぶ
          Math.floor(Math.random() * 4)
        ]
      }`,
      age: 20 + i,
    })),
];

const resolvers = {
  Query: {
    users: (_: unknown, { input }: { input?: UserQueryInput }) => {
      return users.filter((user) => {
        return (
          !input ||
          ((!input.id || user.id === input.id) &&
            (!input.name_contains ||
              user.full_name.includes(input.name_contains)) &&
            (!input.age_gte || user.age >= input.age_gte) &&
            (!input.age_lte || user.age <= input.age_lte))
        );
      });
    },
  },
  Mutation: {
    createUser: (_: unknown, { input }: { input: UserCreateInput }) => {
      const user = {
        id: uuidv4(),
        full_name: input.full_name,
        age: input.age,
      };
      users.push(user);
      return user;
    },
    updateUser: (_: unknown, { input }: { input: UserUpdateInput }) => {
      const user = users.find((user) => user.id === input.id);
      if (!user) throw new Error("User not found");
      user.full_name = input.full_name;
      user.age = input.age;
      return user;
    },
    deleteUser: (_: unknown, { input }: { input: UserDeleteInput }) => {
      const user = users.find((user) => user.id === input.id);
      if (!user) throw new Error("User not found");
      users.splice(users.indexOf(user), 1);
      return user;
    },
  },
};
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

/**
 * ## 各クエリのcurl実行例
 *
 * ```
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"{ users(input: {}) { id full_name age } }"}' http://localhost:3000/api/graphql
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"{ users(input: { id: \"660688c2-3b47-4de3-ad0e-af92a75731f9\" }) { id full_name age } }"}' http://localhost:3000/api/graphql
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"{ users(input: { name_contains: \"J\" }) { id full_name age } }"}' http://localhost:3000/api/graphql
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"{ users(input: { age_gte: 25, age_lte: 30 }) { id full_name age } }"}' http://localhost:3000/api/graphql
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { createUser(input: { full_name: \"John Smith\", age: 20 }) { id full_name age } }"}' http://localhost:3000/api/graphql
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { updateUser(input: { id: \"660688c2-3b47-4de3-ad0e-af92a75731f9\", full_name: \"John Smith\", age: 20 }) { id full_name age } }"}' http://localhost:3000/api/graphql
 * curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { deleteUser(input: { id: \"660688c2-3b47-4de3-ad0e-af92a75731f9\" }) { id full_name age } }"}' http://localhost:3000/api/graphql
 * ```
 *
 */
export default startServerAndCreateH3Handler(apollo);
