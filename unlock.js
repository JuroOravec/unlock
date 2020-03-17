(async (ctx) => {
  const mainURL = "https://raw.githubusercontent.com/JuroOravec/unlock/master/main.js";

  const res = await fetch(mainURL);
  if (!res.ok) {
    console.warn(`[Unlock] Could not load unlock/main.js`);
    return;
  }
  return eval(await res.clone().text()).unlock();

})(window)