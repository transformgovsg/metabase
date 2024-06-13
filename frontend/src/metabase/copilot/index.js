export function registerEventListeners({ browserHistory }) {
  const navigate = path => {
    browserHistory.push(path);
  };

  function metabase_navigate(args, callback) {
    navigate(args.path);
    callback();
  }

  async function metabase_fetch(args, callback) {
    try {
      const response = fetch({
        method: args.method,
        url: args.url,
      });

      const data = (await response).json();
      callback(data);
    } catch (e) {
      callback({ error: e.toString() });
    }
  }

  window.addEventListener("chainlit-call-fn", async e => {
    const { name, args, callback } = e.detail;
    switch (name) {
      case "mb-navigate":
        metabase_navigate(args, callback);
        break;
      case "mb-fetch":
        await metabase_fetch(args, callback);
        break;
    }
  });
}
