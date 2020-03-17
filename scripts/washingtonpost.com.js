[
  {
    version: "1.0.0",
    versionDate: "2020-03-17",
    async script() {
      const body = window.document.body;
      window.document.querySelector('html').style = "";
      body.style = "";
      Array.from(body.childNodes).slice(-6).forEach(el => el.remove());
      const res = await fetch(location.href);
      const b = await res.clone().text();
      const htmlDoc = new DOMParser().parseFromString(b, 'text/html');
      body.querySelector('main').replaceWith(htmlDoc.querySelector('main'));
    } 
  }
]
