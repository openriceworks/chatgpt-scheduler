import { Configuration, OpenAIApi } from "openai";

export function createAsk(apiKey: string) {
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  return async function ask(content: string, model = "gpt-3.5-turbo-0301") {
    const response = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: content }],
    });
    console.debug(response.data.choices[0])
    return response.data.choices[0].message?.content;
  }
}
