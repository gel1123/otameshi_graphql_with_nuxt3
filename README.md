# otameshi_graphql_with_nuxt3

## これはなに？

GraphQL初学者の学習サポートのつもりで、

- モックとして動作するGraphQLサーバと
- テキストエリアに入力して自由にクエリを投げられる砂場

を構築したよ。

構築にはNuxt3を使っていて、前者を `server/api/graphql.ts` で、後者を `app.vue` で実装したよ。

## 使い方

1. まずこのリポジトリを git clone する
2. クローンしたこのリポジトリのルートディレクトリに移動する
3. `npm run dev` で開発サーバを起動する
4. 完了！

上記手順で、`http://localhost:3000/api/graphql` にGraphQLサーバが、
`http://localhost:3000/` にクエリ発行用の砂場が立ち上がるよ。

Flutterなど何かしら学習中のフレームワーク等があるなら、それらのフレームワークからこのリポジトリのGraphQLサーバにクエリを投げて学習することもできるし、そもそもGraphQLについての感触を知りたければ上記の『砂場』でクエリをいじってみるといいよ。

## 補足

簡単な砂場だから、あえてGraphQLスキーマとTypeScriptの型の変換を行ってくれるようなツールの類は使っていないよ。

また、GraphQLスキーマは `typeDefs.ts` に定義しているよ。
