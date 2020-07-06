# Create Today Schedule

> npm に公開する予定はありません。
> もし公開する場合は bin を作ります

毎朝の出勤の連絡を効率化したい人向けの CLI ツールです。
入力を済ませると、自動でクリップボードにコピーされます。

````bash
おはようございます。
作業開始します。
\`\`\`
- 日時: 10:25 ~
- 予定:
  - task1
  - task2

- その他予定
  - カレンダーURL 👉 https://calendar.google.com/calendar?cid=hogehogefugafuga
\`\`\`


## Usage

```bash
npm install

npm start
````

グーグルカレンダーの URL を使用するので、`env.sample`を見ながら`.env`を作成し、埋めてください。
