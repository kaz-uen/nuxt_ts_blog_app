<script setup lang="ts">
async function createPost(id: string, title: string, content: string) {
  try {
    const currentDate = new Date().toISOString();
    const res = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        title,
        content,
        createdAt: currentDate,
      })
    });

    if (!res.ok) throw new Error('エラーが発生しました');

    const newPost = await res.json();
    return newPost;
  } catch(e) {
    console.error(e);
    alert('投稿の作成中にエラーが発生しました');
  }
}

const urlInput = ref<string>('');
const titleInput = ref<string>('');
const contentInput = ref<string>('');
const loading = ref<Boolean>(false);
const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;

  await createPost(urlInput.value, titleInput.value, contentInput.value);

  loading.value = false;
  router.push({ path: '/' });
}
</script>
<template>
  <div>
    <h2>ブログ新規作成</h2>
    <form action="">
      <div>
        <label htmlFor="">
          URL
        </label>
        <input
          type="text"
          name=""
          id=""
          v-model="urlInput"
          placeholder="id-1234"
        />
      </div>
      <div>
        <label htmlFor="">
          タイトル
        </label>
        <input
          type="text"
          name=""
          id=""
          v-model="titleInput"
        />
      </div>
      <div>
        <label htmlFor="">
          本文
        </label>
        <textarea
          name=""
          id=""
          v-model="contentInput"
        />
      </div>

      <button
        type="submit"
        v-on:click="handleSubmit"
        :disabled="loading"
      >
        投稿
      </button>
    </form>
  </div>
</template>
