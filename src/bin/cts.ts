#!/usr/bin/env node
import { prompt } from "enquirer";
import clipboardy from "clipboardy";

import { GOOGLE_CALENDAR_URL } from "../lib";

type EnquirerQuestion = {
  task: string;
};

/**
 * cli起動した時間
 * @example 9:50
 */
const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const time = `${hour}:${minute}`;

  return { time };
};

const enquirerPrompt = async () => {
  const response = await prompt<EnquirerQuestion>({
    type: "input",
    name: "task",
    message: "今日の予定を書いてください（複数行書けます）",
    multiline: true,
    // eslint-disable-next-line
    // @ts-ignore
    footer: "\n(書き終わったら改行した後にEnter)",
    hint: `(最初はEnterで改行してください)
画面修正のタスクを終わらせる
packageのアップデートを行う`,
  });

  return response;
};

const template = (
  time: ReturnType<typeof getTime>["time"],
  task: EnquirerQuestion["task"],
  calendarUrl: typeof process.env.GOOGLE_CALENDAR_URL
) => {
  const wrapTask = (task: EnquirerQuestion["task"]) =>
    task
      .split("\n")
      .map((line) => `-  ${line}`)
      .join("\n");
  return `
おはようございます。
作業開始します。
\`\`\`
- 日時: ${time} ~
- 予定: ${wrapTask(task)}
- その他予定
  - カレンダーURL: ${calendarUrl}
\`\`\`
`;
};

(async () => {
  const answer = await enquirerPrompt();

  const { time } = getTime();

  clipboardy.writeSync(template(time, answer.task, GOOGLE_CALENDAR_URL));
  clipboardy.readSync();

  console.log("-----------------");
  console.log(template(time, answer.task, GOOGLE_CALENDAR_URL));
  console.log("-----------------");

  console.log("コピーされました");
  console.log("");
})();
