export default {
  async fetch(request: Request, env: any): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("EasyQueue Bot is running");
    }

    const update = await request.json();

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      if (text === "/start") {
        await sendMessage(env.BOT_TOKEN, chatId, "🌍 Выберите язык:", {
          inline_keyboard: [
            [
              { text: "🇺🇿 O'zbekcha", callback_data: "lang_uz" },
              { text: "🇷🇺 Русский", callback_data: "lang_ru" }
            ]
          ]
        });
      }
    }

    if (update.callback_query) {
      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;

      if (data === "lang_uz") {
        await sendMessage(env.BOT_TOKEN, chatId, "Til tanlandi 🇺🇿");
      }

      if (data === "lang_ru") {
        await sendMessage(env.BOT_TOKEN, chatId, "Язык выбран 🇷🇺");
      }
    }

    return new Response("ok");
  }
};

async function sendMessage(
  token: string,
  chatId: number,
  text: string,
  keyboard?: any
) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      reply_markup: keyboard
    })
  });
}
