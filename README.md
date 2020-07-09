# Create Today Schedule

> npm に公開する予定はありません。
> もし公開する場合は bin を作ります

毎朝の出勤の連絡を効率化したい人向けの CLI ツールです。
入力を済ませると、自動でクリップボードにコピーされます。

```bash
おはようございます。
作業開始します。
\`\`\`
- 日時: 10:25 ~
- 場所: 自宅
- 予定:
  - task1
  - task2

- その他予定
  - カレンダーURL 👉 https://calendar.google.com/calendar?cid=hogehogefugafuga
\`\`\`
```

- `日時` ... CLI 起動時間
- `場所` ... "自宅","会社","その他" "その他"の場合、具体的な場所を記述するコマンドが表示される
- `予定` ... 入力したやつ
- `カレンダーURL` ... env の`GOOGLE_CALENDAR_URL`を出力

## Usage

```bash
npm install

npm start
```

グーグルカレンダーの URL を使用するので、`env.sample`を見ながら`.env`を作成し、埋めてください。
