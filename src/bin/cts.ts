#!/usr/bin/env node
import { prompt } from "enquirer";
import clipboardy from "clipboardy";

import { GOOGLE_CALENDAR_URL } from "../lib";

type EnquirerQuestion = {
  place: { placeDetail?: string };
  task: string;
};

type Place = "自宅" | "会社" | "その他";

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
  const response = await prompt<EnquirerQuestion>([
    {
      type: "select",
      name: "place",
      message: "作業場所を選択してください",
      choices: ["自宅", "会社", "その他"],
      result(value: Place) {
        if (value !== "その他") return value;
        return prompt({
          type: "input",
          name: "placeDetail",
          message: "場所を書いてください",
        });
      },
    },
    {
      // eslint-disable-next-line
      // @ts-ignore
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
    },
  ]);

  return response;
};

const template = (
  time: ReturnType<typeof getTime>["time"],
  answer: EnquirerQuestion,
  calendarUrl: typeof process.env.GOOGLE_CALENDAR_URL
) => {
  const wrapTask = (task: EnquirerQuestion["task"]) =>
    task
      .trimRight()
      .split("\n")
      .map((line) => `  - ${line}`)
      .join("\n");

  const place = answer.place.placeDetail ?? answer.place;
  return `
おはようございます。
作業開始します。
\`\`\`
- 日時: ${time} ~
- 場所: ${place}
- 予定: ${wrapTask(answer.task)}
- その他予定
  - カレンダーURL: ${calendarUrl}
\`\`\`
`;
};

(async () => {
  const answer = await enquirerPrompt();

  const { time } = getTime();

  clipboardy.writeSync(template(time, answer, GOOGLE_CALENDAR_URL));
  clipboardy.readSync();

  console.log("-----------------");
  console.log(template(time, answer, GOOGLE_CALENDAR_URL));
  console.log("-----------------");

  console.log("コピーされました");
  console.log("");
})();
