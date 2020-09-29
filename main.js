if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/project-papa/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

const main = async () => {
  const data = await fetch("https://www.papajohns.by/api/stock/codes")
    .then((response) => response.json())
    .then((data) => data.codes);

  const getFrom = (description) => {
    const match = description.match(new RegExp("от (.*) руб", "i"));

    return (match && +match[1].replace(",", ".")) || null;
  };

  const mapCodes = (codes) => {
    return codes.map((code) => ({
      code: code.code,
      description: code.name,
      from: getFrom(code.name),
    }));
  };

  const codes = mapCodes(data)
    .filter((x) => x.from)
    .sort((a, b) => a.from - b.from);

  const root = document.getElementById("body");

  const render = (root, codes) => {
    root.innerHTML = `
      <h1 class="header">
        Папа Джонс пицца коды 🍕
      </h1>

      <ul class="list">
        ${codes
          .map((code) => {
            return `
              <li class="list-item">
                <div>💰 ${code.from}</div>
                <div>🔑 ${code.code}</div>
                <div>👨🏻‍🍳 ${code.description}</div>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  };

  render(root, codes);
};

main();
