const faker = require("faker");
let users = JSON.parse(window.localStorage.getItem("users"));
let userDetails = JSON.parse(window.localStorage.getItem("userDetails"));
const favorites = [];

if(!users || !userDetails){
  users = new Array(5).fill("").map(_ => faker.name.firstName());
  window.localStorage.setItem("users", JSON.stringify(users));

  userDetails = users.reduce((acc, user) => {
    acc[user] = new Array(1).fill("").map(_ => faker.name.jobTitle());
    return acc
  }, {});

  window.localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

const userList = document.querySelector("#user-list");
const favoritesList = document.querySelector("#favorites-list");

let curr = window.location.hash.slice(1) * 1;

const render = () => {
  renderFaves()
  const html = `
    ${users.map((u, idx) => `<li id="${idx}"> <a href="#${idx + 1}">${u}</a> <button>*</button>
      ${curr === (idx + 1) ? `<ul>${userDetails[u].map(detail => `<li>${detail}</li>`).join("")}</ul>`
        : ``}
    </li>`).join("")}
  `

  userList.innerHTML = html;
};

const renderFaves = () => {
  const html = `
  ${favorites.map(fav => `<li>${fav}</li>`).join("")}
  `

  favoritesList.innerHTML = html;
}

render();

window.addEventListener("hashchange", () => {
  curr = window.location.hash.slice(1) * 1
  render();
})

window.addEventListener("click", (e) => {
  if(e.target.tagName === "A"){
    if(curr === (window.location.hash.slice(1) * 1)){
      curr = 0;
    }else{
      curr = window.location.hash.slice(1) * 1
    }

    render();
  }

  if(e.target.tagName === "BUTTON"){
    const id = e.target.parentNode.id;
    if(!favorites.includes(users[id])){
      favorites.push(users[id]);
    }

    render()
  }
})
