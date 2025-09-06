// const { log } = require("handlebars");

// const searchControls = document.querySelector(".search-controls");
// const searchInput = document.querySelector("#search-input");

// function customHttp(){

//     return{
//         get(url, cb){
//                 const xhr = new XMLHttpRequest();
//                 xhr.open('GET', url);
//                 xhr.send();

//                 xhr.addEventListener('load', () => {
//                     const response = JSON.parse(xhr.responseText);
//                     cb(response);
//                 })
//                 }
//     }
// }

// function myHttpRequest({ method, url } = {}, cb) {
//   try {
//     // const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.addEventListener("load", () => {
//       if (Math.floor(xhr.status / 100) !== 2) {
//         return cb(`Error. Status code: ${xhr.status}`, xhr);
//       }
//       const response = JSON.parse(xhr.responseText);
//       cb(response);
//     });

//     xhr.addEventListener("error", () => {
//       console.log(`Error. Status code: ${xhr.status}`);
//     });
//   } catch (error) {
//     cb(error);
//   }

//   xhr.send();
// }

// myHttpRequest(
//   { method: "GET", url: "https://jsonplaceholder.typicode.com/posts" },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(res);

//   }
// );

// function http() {
//   return {
//     get(url, cb) {
//       try {
//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", url);
//         xhr.addEventListener("load", () => {
//           if (Math.floor(xhr.status / 100) !== 2) {
//             return cb(`Error. Status code: ${xhr.status}`, xhr);
//           }
//           const response = JSON.parse(xhr.responseText);
//           cb(null, response);
//         });

//         xhr.addEventListener("error", () => {
//           console.log(`Error. Status code: ${xhr.status}`);
//         });
//               xhr.send();
//       } catch (error) {
//         cb(error);
//       }

//     },
//   };
// }

// const myHttp = http();
// myHttp.get("https://jsonplaceholder.typicode.com/posts", (error, resp) => {

//     console.log(resp);
// })

// const http = customHttp();

const searchControls = document.querySelector("#country");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector("#search-form");
// const searchForm = document.querySelector("#search-form");

const countrySelect = form.elements["country"]; // Use the correct control name

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadNews();
});

function customHttp() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          console.log("Error");
        });
        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
  };
}

const http = customHttp();
//////////////////////////////////////////

// const newService = (function () {
//   const apiKey = "6ca821c6c34a44ab8249b5a27faa9929";
//   const apiUrl = "https://newsapi.org/v2";

//   return {
//     topHeadlines(country = "en", cb) {
//       http.get(
//         // `${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`,
//         // https://newsapi.org/v2/everything?q=tesla&from=2025-07-31At&apiKey=6ca821c6c34a44ab8249b5a27faa9929&language=en
//         `${apiUrl}/everything?q=tesla&apiKey=${apiKey}&language=${country}`, // &category=technology

//         cb
//       );
//     },
//     everything(query, cb) {
//       http.get(`${apiUrl}/everything?q=tesla&apiKey=${apiKey}&language=${country}`, cb);
//     },
//   };
// })();

const newService = (function () {
  const apiKey = "6ca821c6c34a44ab8249b5a27faa9929";
  const apiUrl = "https://newsapi.org/v2";

  return {
    topHeadlines(language = "en", cb) {
      const url = `${apiUrl}/everything?q=tesla&apiKey=${apiKey}&language=${language}`;
      http.get(url, cb);
    },
    everything(query, language = "en", cb) {
      const encodedQuery = encodeURIComponent(query);
      const url = `${apiUrl}/everything?q=${encodedQuery}&apiKey=${apiKey}&language=${language}`;
      http.get(url, cb);
    },
  };
})();
///////////////////////////////////////////////////////

// base news function

// function loadNews() {
//   const country = countrySelect.value;
//   const searchText = searchInput.value;
//   if (!searchText) {
//     newService.topHeadlines(country, onGetResponse);
//   } else {
//     newService.everything(searchText, onGetResponse);
//   }
//   console.log(country);
// }
/////////////////////////////////////////////////////////////

function loadNews() {
  const language = countrySelect.value || "en";
  const searchText = searchInput.value.trim();
  if (!searchText) {
    newService.topHeadlines(language, onGetResponse);
  } else {
    newService.everything(searchText, language, onGetResponse);
  }
  console.log("Selected language:", language);
}

/////////////////////////////////////////////////////////////

// get response function

function onGetResponse(err, res) {
  // console.log("dqwwdq");
  renderNews(res);
}

// dom loaded
document.addEventListener("DOMContentLoaded", function () {
  loadNews();
});

// render new function

function renderNews(news) {
  const newsContainer = document.querySelector(".news-section__container");
  // console.log(news);
  let fragment = "";
  news.articles.forEach((newsItem) => {
    const el = newsTemplate(newsItem);
    fragment += el;
  });
  newsContainer.insertAdjacentHTML("afterbegin", fragment);
}

function newsTemplate({ urlToImage, title, url, description }) {
  return `
<div class="card-news">
    <div class="card-news__img">
        <img src="${urlToImage}" alt="">
        </div>
        <div class="card-news__content">
        <div class="card-news__title">${title || ""}</div>
        <div class="card-news__desc">
        ${description || ""}
        </div>
        <a href="${url}" class="card-news__btn">View</a>
    </div>

</div>
    `;
}

// Web Angular 101 Lesson9 17 12 finished
// Web Angular 101 Lesson10 to start
