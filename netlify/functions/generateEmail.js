const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const lang = body.language || "english";

    let prompt = "";

    if (lang === "english") {
      prompt = `Write a polite professional email template to invite the client to schedule a property viewing. Use placeholders like [Client Name], [Property Name], [Availability Status], [Phone], [Agency Name].`;
    } else {
      prompt = `Scrivi un'email cortese e professionale per invitare il cliente a fissare una visita all'immobile. Utilizza segnaposto come [Nome Cliente], [Nome Proprietà], [Stato disponibilità], [Telefono], [Nome Agenzia].`;
    }

    const apiKey = process.env.NEXA_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional real estate copywriter." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 500
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiMessage }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
