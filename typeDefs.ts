export const typeDefs = `#graphql
  type User {
    # uuid
    id: ID
    # フルネーム
    full_name: String
    # 年齢
    age: Int
  }
  input UserCreateInput {
    # フルネーム
    full_name: String
    # 年齢
    age: Int
  }
  input UserUpdateInput {
    # uuid
    id: ID
    # フルネーム
    full_name: String
    # 年齢
    age: Int
  }
  input UserDeleteInput {
    # uuid
    id: ID
  }
  input UserQueryInput {
    # uuidを直接指定できる引数
    id: ID
    # 「名前の一部分」を指定できる引数
    name_contains: String
    # 年齢の範囲を指定できる引数（最小値）
    age_gte: Int
    # 年齢の範囲を指定できる引数（最大値）
    age_lte: Int
  }
  type Query {
    # ユーザーを取得する
    users(input: UserQueryInput): [User]
  }
  type Mutation {
    # ユーザーを作成する
    createUser(input: UserCreateInput): User
    # ユーザーを更新する
    updateUser(input: UserUpdateInput): User
    # ユーザーを削除する
    deleteUser(input: UserDeleteInput): User
  }
`;