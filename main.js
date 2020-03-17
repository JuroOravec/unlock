((ctx) => {
  const scriptsURL = "https://raw.githubusercontent.com/JuroOravec/unlock/master/scripts"

  const scripts = _getScript();

  return {
    getLatest: getScriptVersionLatest,
    getByDate: getScriptVersionByDate,
    getByVersion: getScriptVersionByVersion,
    getBy: getScriptVersionsBy,
    getAll: async () => [...await scripts],
    unlock: async () => (await getScriptVersionLatest()).script()
  };

  ////////////

  function _getHost() {
    const host = ctx.location.host;
    return host.startsWith('www.') ?
      host.slice(4) :
      host;
  }

  async function _getScript() {
    const host = _getHost();
    const res = await fetch(`${scriptsURL}/${host}.js`);
    if (!res.ok) {
      console.warn(`[Unlock] No scripts found for host "${host}"`);
      return;
    }
    return eval(await res.clone().text());
  }

  async function getScriptVersionsBy(query = () => true) {
    const scripts_ = await scripts;
    // Async filter taken from https://stackoverflow.com/a/33362966/9788634
    const data = Array.from(scripts_);
    return Promise.all(
        data.map(
          (item, index) => query(item, index, data)
        )
      )
      .then(result => data.filter(
        (item, index) => result[index]
      ));
  }

  async function getScriptVersionByVersion(version) {
    const scripts_ = await getScriptVersionsBy(s => s.version == version);
    return scripts_.length ? scripts_[0] : undefined;
  }

  async function getScriptVersionByDate(date = new Date()) {
    const scripts_ = await scripts;
    return _sortScriptVersionsByDate(scripts_)
      .find((script, index, arr) => {
        return script._versionDateAsDate <= date &&
          (
            arr.length == index + 1 ||
            arr[index + 1] > date
          )
      })
  }

  async function getScriptVersionLatest() {
    const scripts_ = await scripts;
    const sorted = _sortScriptVersionsByDate(scripts_);
    return sorted[sorted.length - 1];
  }

  function _sortScriptVersionsByDate(scripts) {
    return scripts
      .map(
        (script => ({
          ...script,
          _versionDateAsDate: new Date(script.versionDate)
        }))
      )
      // Sorting taken from https://stackoverflow.com/a/10124053/9788634
      .sort(
        (scriptA, scriptB) => scriptB._versionDateAsDate - scriptA._versionDateAsDate
      )
  }

})(window)