const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const language = body.language === "english" ? "english" : "italian";

    let prompt = "";

    if (language === "italian") {
      prompt = `Oggetto: Visita esclusiva alla proprietà [Nome Proprietà]

Gentile [Nome Cliente],

La contatto per invitarla a scoprire di persona la proprietà [Nome Proprietà], che potrebbe rispondere pienamente alle sue esigenze.
Attualmente disponibile in [Stato disponibilità], si tratta di una soluzione che merita di essere valutata con una visita diretta, così da apprezzarne al meglio le caratteristiche e il contesto.

Per organizzare un appuntamento, può contattarmi direttamente al [Telefono] o rispondere a questa email indicando le sue preferenze di data e orario.

Resto a disposizione per qualsiasi ulteriore informazione.

Cordiali saluti,
[Nome Agenzia]
    } else {
      prompt = `Subject: Exclusive Viewing of [Property Name]

Dear [Client Name],

I am reaching out to invite you to personally discover the property [Property Name], which could fully meet your requirements.
Currently available [Availability Status], this solution deserves a direct visit to best appreciate its features and the surrounding context.

To arrange an appointment, please feel free to contact me directly at [Phone Number] or reply to this email indicating your preferred date and time.

I remain at your disposal for any further information.

Best regards,
[Agency Name]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: prompt }),
    };
  } catch (error) {
    console.error("Errore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
