<script setup lang="ts">
import { ChangeEvent } from "rollup";
import { typeDefs } from "~~/typeDefs";

const query = ref(`query {users { id full_name age }}`);
const result = ref("ここに結果が表示されるよ");
const execute = async () => {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.value,
    }),
  });
  result.value = JSON.stringify(await res.json(), null, 2);
};
const schema = typeDefs;
const showSchema = ref(false);

const sampleQueries = {
  全ユーザ取得Query: `query {
  users {
    id
    full_name
    age
  }
}`,
  ID指定Query: `query {
  users(input: { id: "660688c2-3b47-4de3-ad0e-af92a75731f9" }) {
    id
    full_name
    age
  }
}`,
  名前の部分一致Query: `query {
  users(input: { name_contains: "J" }) {
    id
    full_name
    age
  }
}`,
  年齢の範囲指定Query: `query {
  users(input: { age_gte: 25, age_lte: 30 }) {
    id
    full_name
    age
  }
}`,
  ユーザ作成Mutation: `mutation {
  createUser(input: { full_name: "John Smith", age: 20 }) {
    id
    full_name
    age
  }
}`,
  ユーザ更新Mutation: `mutation {
  updateUser(
    input: {
      id: "660688c2-3b47-4de3-ad0e-af92a75731f9"
      full_name: "John Smith"
      age: 20
    }
  ) {
    id
    full_name
    age
  }
}`,
  ユーザ削除Mutation: `mutation {
  deleteUser(input: { id: "660688c2-3b47-4de3-ad0e-af92a75731f9" }) {
    id
    full_name
    age
  }
}`,
}
</script>

<template>
  <div class="container mx-auto max-w-5xl">
    <div class="m-4 border-2 bg-emerald-100 p-4 grid gap-y-4">
      <h1 class="text-2xl font-bold text-gray-800">
        GraphQL Sandbox
      </h1>
      <h2 class="text-xl font-bold text-gray-800 border-l-8 border-l-emerald-400 pl-2">
        使い方
      </h2>
      <p>
        下のテキストエリアにGraphQLのクエリを書いて、実行ボタンを押すと、結果が表示されます。
      </p>
      <p>
        なおGraphQLサーバーのエンドポイントは Nuxt3 Server API Routes の
        <code class="text-sm font-bold text-gray-800">
          /api/graphql
        </code>
        です
      </p>
      <h2 class="text-xl font-bold text-gray-800 border-l-8 border-l-emerald-400 pl-2">
        クエリ
      </h2>
      <button
        class="text-sm font-bold text-gray-800 border-2 border-gray-800 rounded-md px-2 py-1 max-w-md bg-white hover:bg-gray-800 hover:text-white"
        @click="showSchema = true">
        スキーマを見る？
      </button>
      <teleport to="body">
        <div v-if="showSchema" @click="(event) => {
          // 子要素以外の場所をクリックしたら showSchema = false; にする
          if (event.target === event.currentTarget) {
            showSchema = false;
          }
        }" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen">
          <!-- 閉じるボタンをバツで表現する -->
          <button class="absolute top-0 right-0 m-6 text-5xl font-bold text-white hover:text-gray-200"
            @click="showSchema = false">
            ×
          </button>
          <div class="bg-white rounded-md p-4 w-4/5 h-4/5 overflow-auto">
            <pre class="text-sm font-mono text-gray-800">{{ schema }}</pre>
          </div>
        </div>
      </teleport>
      <!-- selectでsampleQueriesの中から一つ選び、queryに設定する -->
      <select
        class="text-sm font-bold text-gray-800 border-2 border-gray-800 rounded-md px-2 py-1 max-w-md hover:bg-gray-800 hover:text-white"
        @change="(e) => {
          query = (e.target as HTMLSelectElement | null)?.value ?? '';
        }">
        <option disabled selected>
          サンプルクエリを選択してください
        </option>
        <option v-for="(value, key) in sampleQueries" :value="value">{{ key }}</option>
      </select>
      <textarea v-model="query" rows="10" cols="100"
        class="border-2 border-gray-300 bg-gray-100 bg-opacity-70 rounded-md p-2 w-full">
      </textarea>
      <div>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          @click="execute">
          実行
        </button>
      </div>
      <!-- 下記にコードの実行結果を表示する -->
      <h2 class="text-xl font-bold text-gray-800 border-l-8 border-l-emerald-400 pl-2">
        実行結果
      </h2>
      <div class="border-2 border-gray-300 bg-gray-100 bg-opacity-70 rounded-md p-2 w-full overflow-x-auto">
        <!-- スクロール可能なpreタグ -->
        <pre class="overflow-x-auto">{{ result }}</pre>
      </div>
    </div>
  </div>
</template>
