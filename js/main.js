//check mood
let mood = "create";
let index;
// change theme dark & light //
let icon = document.getElementById("icon");
let toggle = document.getElementById("toggle");

icon.addEventListener("click", function () {
  icon.classList.toggle("fa-moon");
  toggle.classList.toggle("black");
});

// get value from input
let name = document.getElementById("name");
let job = document.getElementById("job");
let country = document.getElementById("country");
let age = document.getElementById("age");
let submit = document.getElementById("create");

//start create data //
let dataEmployees;

//check from data
if (localStorage.data_ != null) {
  dataEmployees = JSON.parse(localStorage.data_);
} else {
  dataEmployees = [];
}
// click button create data
submit.onclick = function () {
  let data_input = {
    name: name.value.toLowerCase(),
    job: job.value.toLowerCase(),
    country: country.value,
    age: age.value,
  };
  // send data to local storage
  if (name.value && job.value != "") {
    if (mood === "create") {
      dataEmployees.push(data_input);
    } else {
      dataEmployees[index] = data_input;
      mood = "create";
      submit.innerHTML = "create";
    }
    clearInput();
  }
  //send data to local storage
  localStorage.setItem("data_", JSON.stringify(dataEmployees));
  readDate();
};
// end create data //
// start clear input
function clearInput() {
  name.value = "";
  job.value = "";
  country.value = "";
  age.value = "";
}
// end clear input
//start  apply for data read //
function readDate() {
  let table = "";
  for (let i = 0; i < dataEmployees.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataEmployees[i].name}</td>
      <td>${dataEmployees[i].job}</td>
      <td>${dataEmployees[i].country}</td>
      <td>${dataEmployees[i].age}</td>
      <td id="edit">
      <button onclick="updateItem(${i})" id="update">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button onclick = "deleteItem(${i})" id="delete">
       <i class="fa-regular fa-trash-can"></i>
      </button>
      </td>
    </tr>
`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataEmployees.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All ( ${dataEmployees.length} )</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
readDate();
//end  apply for data read //
// start delete item/
function deleteItem(i) {
  dataEmployees.splice(i, 1);
  localStorage.data_ = JSON.stringify(dataEmployees);
  readDate();
}
// end delete item//
// start delete all //
function deleteAll() {
  localStorage.clear();
  dataEmployees.splice(0);
  readDate();
}
// end delete all //
//start update item//
function updateItem(i) {
  name.value = dataEmployees[i].name;
  job.value = dataEmployees[i].job;
  country.value = dataEmployees[i].country;
  age.value = dataEmployees[i].age;
  submit.innerHTML = "Update";
  mood = "update";
  index = i;
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
//end update item//

// Start search by mode//
let searchMode = "name";
function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchName") {
    searchMode = "Name";
  } else {
    searchMode = "Job";
  }
  search.placeholder = "Search By " + searchMode;
  search.focus();
  search.value = "";
  readDate();
}
// end search by mode//

//start search items//

function searchItem(value) {
  let table = "";
  for (let i = 0; i < dataEmployees.length; i++) {
    if (searchMode == "name") {
      if (dataEmployees[i].name.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataEmployees[i].name}</td>
          <td>${dataEmployees[i].job}</td>
          <td>${dataEmployees[i].country}</td>
          <td>${dataEmployees[i].age}</td>
          <td id="edit">
          <button onclick="updateItem(${i})" id="update">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button onclick = "deleteItem(${i})" id="delete">
           <i class="fa-regular fa-trash-can"></i>
          </button>
          </td>
        </tr>
    `;
      }
    } else {
      if (dataEmployees[i].job.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataEmployees[i].name}</td>
            <td>${dataEmployees[i].job}</td>
            <td>${dataEmployees[i].country}</td>
            <td>${dataEmployees[i].age}</td>
            <td id="edit">
            <button onclick="updateItem(${i})" id="update">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button onclick = "deleteItem(${i})" id="delete">
             <i class="fa-regular fa-trash-can"></i>
            </button>
            </td>
          </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
//end search items//
