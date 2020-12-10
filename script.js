import data from "./api.js";

window.onload = function () {
  const input = document.getElementById("input");
  const btnSearch = document.getElementById("btn-search");
  const main = document.querySelector("main");

  function searchKeyword() {
    const keyword = input.value;

    filterData(data, keyword)
      .then((results) => {
        main.innerHTML = "";

        results.forEach((result) => {
          const itemSong = document.createElement("div");
          itemSong.setAttribute(
            "class",
            "lyric-card animate__animated animate__fadeInUp"
          );
          itemSong.setAttribute("id", "lyric-card");

          itemSong.innerHTML = `
          <h2>${result.Judul}</h2>
          <p class="artist">${result.Artis}</p>
          <p class="album">${result.Album}</p>
          <p class="lyric">${result.Lirik}</p>
        `;
          main.appendChild(itemSong);
        });
      })
      .catch((message) => {
        main.innerHTML = message;
      });
  }

  btnSearch.addEventListener("click", searchKeyword);
  input.addEventListener("keyup", searchKeyword);
};

function filterData(data, keyword) {
  return new Promise((resolve, reject) => {
    let result = ["1"];
    result = data.filter(
      (e) =>
        bruteForce(e.Judul.toUpperCase(), keyword.toUpperCase()) ||
        bruteForce(e.Album.toUpperCase(), keyword.toUpperCase()) ||
        bruteForce(e.Lirik.toUpperCase(), keyword.toUpperCase())
    );

    if (result.length) {
      resolve(result);
    } else {
      reject(`${keyword} is not found`);
    }
  });
}

function bruteForce(text, keyword) {
  const arrText = text.split("");
  const arrKeyword = keyword.split("");

  for (let i = 0; i < arrText.length; i++) {
    let temp = [];
    for (let j = 0; j < arrKeyword.length; j++) {
      if (arrText[i + j] != arrKeyword[j]) {
        break;
      } else {
        temp.push(1);
      }
    }

    if (temp.length == arrKeyword.length) {
      return true;
    }
  }
  return false;
}
