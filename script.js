window.onload = function () {
  console.log(data);

  const input = document.getElementById("input");

  const btnSearch = document.getElementById("btn-search");
  const main = document.querySelector("main");
  btnSearch.addEventListener("click", function () {
    const keyword = input.value;
    let content = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Judul.toUpperCase() === keyword.toUpperCase()) {
        const html = `
          <div class="lyric-card animate__animated animate__jackInTheBox" id="lyric-card">
          <h2>${data[i].Judul}</h2>
          <p class="artist">${data[i].Artis}</p>
          <p class="album">${data[i].Album}</p>
          <p class="lyric">${data[i].Lirik}</p>
        </div>
          `;
        content += html;
      }
    }
    main.innerHTML = content;
  });
};
