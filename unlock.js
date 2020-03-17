(async (ctx) => {
  const mainURL = "https://raw.githubusercontent.com/JuroOravec/unlock/master/main.js";

  const res = await fetch(mainURL);
  if (!res.ok) {
    console.warn(`[Unlock] Could not load unlock/main.js`);
    return;
  }
  const textBody = await res.clone().text();
  const api = await eval(textBody);
  return api.unlock();

})(window)