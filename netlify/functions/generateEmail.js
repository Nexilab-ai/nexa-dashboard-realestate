exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const language = body.language === "english" ? "english" : "italian";

    let reply = "";

    if (language === "italian") {
      reply = `Oggetto: Visita esclusiva alla proprietà [Nome Proprietà]

Gentile [Nome Cliente],

La contatto per invitarla a scoprire di persona la proprietà [Nome Proprietà], che potrebbe rispondere pienamente alle sue esigenze.

Attualmente disponibile in [Stato disponibilità], questa soluzione offre caratteristiche uniche che meritano di essere vissute dal vivo.

Per organizzare una visita, può contattarmi direttamente al [Telefono] o rispondere a questa email indicando le sue preferenze di data e orario.

Resto a disposizione per qualsiasi ulteriore informazione.

Cordiali saluti,
[Nome Agenzia]`;
    } else {
      reply = `Subject: Exclusive Viewing of [Property Name]

Dear [Client Name],

I am reaching out to invite you to personally view the property [Property Name], which could perfectly match your needs.

Currently available in [Availability Status], this property offers unique features that deserve to be experienced in person.

To schedule a visit, you can contact me directly at [Phone Number] or reply to this email indicating your preferred date and time.

I remain at your disposal for any additional information.

Kind regards,
[Agency Name]`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Errore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
