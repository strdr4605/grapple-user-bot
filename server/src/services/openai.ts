import OpenAI from "openai";
import { getDealContext } from "./pipedrive";

// console.log(process.env["OPENAI_API_KEY"], process.env["PIPEDRIVE_KEY"]);

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

let completionId = undefined;

export async function initConversation(input: string) {
  const pipedriveData = await getDealContext();
  // console.log("pipedriveData: ", pipedriveData);

  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: `Here is the description of the case: ${pipedriveData}`,
      },
      { role: "user", content: input },
    ],
  });

  completionId = completion.id;

  return {
    completionId,
    response: completion.choices[0].message.content,
  };
}
