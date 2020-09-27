window.addEventListener("DOMContentLoaded", async (event) => {
  const data = await fetch("https://www.papajohns.by/api/stock/codes")
    .then((response) => response.json())
    .then((data) => data.codes);

  const getFromPrice = (description) => {
    const match = description.match(new RegExp("От (.*) рублей", "i"));
    return (match && +match[1]) || null;
  };

  const mapCodes = (codes) => {
    return codes.map((code) => ({
      code: code.code,
      description: code.name,
      fromPrice: getFromPrice(code.name),
    }));
  };

  const codes = mapCodes(data);

  console.log(codes);

  const root = document.getElementById("root");

  const render = (root, codes) => {
    root.innerHTML = `
        ${codes.map((code) => {
          return `
                <div>
                    <div>${code.fromPrice}</div>
                    <div>${code.description}</div>
                </div>
            `;
        })}
    `;
  };

  render(root, codes);
});
