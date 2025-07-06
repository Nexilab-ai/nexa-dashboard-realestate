const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const language = body.language === "english" ? "english" : "italian";

    console.log("Lingua selezionata:", language);

    let prompt = "";

    if (language === "italian") {
      prompt = `In [zona/quartiere/località], proponiamo in vendita [tipologia immobile] situato al [piano] di [descrizione stabile, es. “una palazzina di poche unità” / “un contesto condominiale tranquillo”]. La proprietà si sviluppa su una superficie di circa [metri quadri] mq e si compone di [numero locali e descrizione ambienti principali, es. “un soggiorno con cucina a vista, due camere da letto e un bagno finestrato”].

L’immobile si presenta in [stato manutentivo, es. “buone condizioni interne” / “stato originale” / “ottimo stato”] e si distingue per [caratteristiche di pregio o punti di forza, es. “la doppia esposizione” / “la luminosità degli ambienti” / “la disposizione funzionale degli spazi”], offrendo un ambiente confortevole e versatile.

Completano la proprietà [pertinenze/accessori, es. “un balcone e una cantina” / “un posto auto scoperto” / “un giardino privato di [mq] mq”], ideali per soddisfare le diverse esigenze abitative.

La posizione è strategica e comoda per raggiungere [servizi principali, es. “supermercati, scuole, fermate dei mezzi pubblici e negozi”], rendendo l’immobile adatto a [target, es. “famiglie” / “coppie” / “professionisti” / “investitori”].

L’abitazione è [stato disponibilità, es. “libera subito” / “disponibile al rogito”].

Prezzo richiesto: €[prezzo]

Per ulteriori informazioni o per fissare una visita, contattaci al [numero di telefono] oppure scrivi a [email].`;
    } else {
      prompt = `In the sought-after neighborhood of [area/district/location], we are pleased to present for sale a charming [property type] located on the [floor] of [building description, e.g. "a small building with few units" / "a quiet condominium setting"]. The property boasts a generous surface area of approximately [square meters] sqm and comprises [number of rooms and main room descriptions, e.g. "a living room with open kitchen, two bedrooms, and a bright bathroom"].

The property is [condition of the property, e.g. "in good internal condition" / "original state" / "excellent condition"] and stands out for its [notable features or strengths, e.g. "double exposure" / "bright rooms" / "functional layout"], offering a comfortable and versatile living space.

Included with the property are [pertinent features/accessories, e.g. "a balcony and a cellar" / "an uncovered parking space" / "a private garden measuring [sqm] sqm"], ideal for meeting various housing needs.

The location is strategic and convenient for accessing [key amenities, e.g. "supermarkets, schools, public transport, and shops"], making the property suitable for [target, e.g. "families" / "couples" / "professionals" / "investors"].

Available [availability status, e.g. "immediately" / "upon deed of sale"].

Asking price: €[price]

For more information or to schedule a visit, contact us at [phone number] or email [email].`;
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
