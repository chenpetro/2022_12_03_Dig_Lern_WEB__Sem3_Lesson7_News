const searchControls = document.querySelector(".search-controls");
const searchInput = document.querySelector("#search-input");

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

function myHttpRequest({ method, url } = {}, cb) {
  try {
      // const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.addEventListener("load", () => {
    if (Math.floor(xhr.status / 100) !== 2) {
      return cb(`Error. Status code: ${xhr.status}`, xhr);
    }
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.log(`Error. Status code: ${xhr.status}`);
  });
  } catch (error) {
    cb(error)
  }
  
  
  xhr.send();
}

// myHttpRequest(
//   { method: "GET", url: "https://jsonplaceholder.typicode.com/posts" },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(res);
    
//   }
// );

function http(url, cb) {
  return {
    get(url, cb) { try {
      // const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener("load", () => {
    if (Math.floor(xhr.status / 100) !== 2) {
      return cb(`Error. Status code: ${xhr.status}`, xhr);
    }
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.log(`Error. Status code: ${xhr.status}`);
  });
  } catch (error) {
    cb(error)
  }
  
  
  xhr.send();},
}
}



// const http = customHttp();

// const newService = (function() {
//     const apiKey = '6ca821c6c34a44ab8249b5a27faa9929';
//     const apiUrl = 'https://newsapi.org/v2';

//     return{
//         topHeadlines(country = 'ua', cb){
//             http.get(`${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`);
//         },
//         everything(query, cb){
//             http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`);

//         }
//     }
// })()

// // base news function

// function loadNews(){
//     newService.topHeadlines('ua', onGetResponse);
//     }

// // get response function

// function onGetResponse(err, res){
// console.log(res);

// }

// // dom loaded
// document.addEventListener('DOMContentLoaded', function(){
//     loadNews();
// });

// // render new function

// function renderNews(){
//     const newsContainer = document.querySelector('news-section__container');
//     news.forEach(newsItem => {
//         const el = newsTemplate(newsItem);
//     });

// }

// function newsTemplate(news){

// }

// Web Angular 101 Lesson9 17 12
