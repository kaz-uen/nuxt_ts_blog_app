# ヘッダ情報
- ヘッダ情報を設定する場合は、script内に `useHead()` 関数を使用し、引数としてオブジェクトを渡し、そのプロパティとして設定したヘッダ情報を渡す。
- titleタグを設定する場合は、titleプロパティを指定する。

``` javascript
<script setup lang="ts">
import type { Member } from '@/interfaces';

const SITE_TITLE = "ヘッダ変更サンプル";

useHead({
  title: SITE_TITLE,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- メタ情報が設定できるmetaプロパティもあり、以下のようにmetaプロパティの値として配列を設定し、その中にオブジェクトでそれぞれのメタ情報を指定していく。

```javascript
useHead({
  title: SITE_TITLE,
  meta: [
    {name: "description", content: "サンプルアプリケーション"},
    {property: "og:image", content: "/image/ogp.png"},
  ]
});
```

- ヘッダ情報をページごとに設定する場合は、useHead()関数を使って、画面用コンポーネントごとに記述する。
