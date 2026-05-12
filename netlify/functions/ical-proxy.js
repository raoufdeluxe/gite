exports.handler = async function(event) {
  const url = event.queryStringParameters && event.queryStringParameters.url;

  if (!url) {
    return { statusCode: 400, body: 'Paramètre url manquant' };
  }

  // Sécurité : on n'accepte que les URLs Airbnb
  if (!url.startsWith('https://www.airbnb.fr/') && !url.startsWith('https://www.airbnb.com/')) {
    return { statusCode: 403, body: 'URL non autorisée' };
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur Airbnb : ' + response.status);
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=3600'
      },
      body: text
    };
  } catch(e) {
    return { statusCode: 500, body: 'Impossible de récupérer le calendrier : ' + e.message };
  }
};
