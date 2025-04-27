# publicフォルダ

## Nuxtのpublicフォルダの特徴
- publicフォルダは、ビルド時にそのままルートディレクトリにコピーされる
- publicフォルダ内のファイルは、URLでアクセスする際にpublicを含めない
- publicフォルダは静的アセット用の特別なフォルダとして扱われる

## フォルダ構造とパスの例

```markdown
your-project/
├── public/
│   └── images/
│       └── default-thumbnail.jpeg
└── ...
```


この時、
- 正しい参照方法<br />
`<img src="/images/default-thumbnail.jpeg" />` ⭕️
- 間違った参照方法<br />
`<img src="/public/images/default-thumbnail.jpeg" />` ❌
