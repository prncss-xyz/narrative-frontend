const key = import.meta.env.VITE_NARRATIVE_API_KEY;
if (!key)
  throw "VITE_NARRATIVE_API_KEY env variable must be defined to use mock API.";

export const apiURL = `https://${key}.mockapi.io/maritime/`;
