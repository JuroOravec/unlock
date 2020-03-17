[
    {
      version: "1.0.0",
      versionDate: "2020-03-17",
      async script() {
        window.document.querySelector('#gateway-content').remove();
        const body = window.document.body;
        Array.from(body.childNodes)
            .slice(-2)
            .forEach(el => el.remove());
        const app = body.querySelector('#app');
        app.className = '';
        Array.from(app.childNodes)
          .map(el => {
             el.className = "";
             return Array.from(el.childNodes)
          })
          .flat()
          .map(el => {
             el.className = "";
             return Array.from(el.childNodes)
          })
          .flat()
          .forEach(el => el.className = "");
      } 
    }
  ]
  
