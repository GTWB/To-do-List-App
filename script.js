"use strict";

//Select Element from HTML
const testo = document.getElementById("text");
const addButton = document.getElementById("add");
const errorMsg = document.querySelector(".errorMsg");
const listItemEl = document.querySelector(".listItem");
const containerEl = document.querySelector(".container");
let textInput;
const delBtn = document.getElementById("delete");
const startMsg = document.querySelector(".startMsg-container");

containerEl.classList.add("hidden");

//Array dove salvare gli elementi aggiunti alla lista
let arrEl = [];

// //Messaggio Iniziale
startMsg.addEventListener("click", function () {
  console.log("clicked");
  startMsg.classList.add("removeItems");
  removeElementAfterAnimation(startMsg);
  containerEl.classList.remove("hidden");
});

//funtion to allow to remove an element from HTML, after animation is finished
const removeElementAfterAnimation = function (elementToRemove) {
  Promise.all(
    elementToRemove.getAnimations().map((animation) => animation.finished)
  ).then(() => elementToRemove.remove());
};

//Create element of adding at the list
const createElementForTheList = function () {
  textInput = testo.value;

  //creo un element e gli associo una classe
  const listContainerEl = document.createElement("div");
  listContainerEl.className = "listContainer";
  const divParentListItem = document.createElement("div");
  divParentListItem.className = "listItem";
  const checkboxItem = document.createElement("input");
  checkboxItem.setAttribute("type", "checkbox");
  checkboxItem.className = "checkBoxItem";
  const paragraphItem = document.createElement("p");
  paragraphItem.className = "testoAggiunto";
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.className = "btn delete btn-primary";

  //gli do il valore preso dall'input di testo
  paragraphItem.textContent = textInput;

  //Aggiungo gli elementi creati alla pagina HTML
  containerEl.appendChild(listContainerEl);
  listContainerEl.appendChild(divParentListItem);
  divParentListItem.appendChild(checkboxItem);
  divParentListItem.appendChild(paragraphItem);
  divParentListItem.appendChild(btnDelete);

  testo.value = "";

  //Aggiungo all'array
  arrEl.push(textInput);
  console.log(arrEl);
  // saveToLocalStorage();
  //console.log(arrEl);
};

//Add element at List function
const addElementAtList = function () {
  textInput = testo.value;

  //Variabile d'appoggio per salvare l'eventuale duplicato già presente nella lista
  let elexist;

  //Se l'input è vuoto mostra il messaggio d'errore
  if (testo.value === "") {
    errorMsg.textContent = "To add something at the list, write some text!";
    errorMsg.classList.remove("hidden");
    testo.value = "";
  }
  //controllo se il testo inserito è già prensente
  else {
    for (let i = 0; i < arrEl.length; i++) {
      if (arrEl[i].toUpperCase() === textInput.toUpperCase()) {
        elexist = textInput;
      }
    }
    //Se il testo che si vuole inserire è già presente, compare un messaggio che blocca l'inserimento
    if (textInput === elexist) {
      //Messaggio d'errore
      errorMsg.textContent = "Text already exists!";
      errorMsg.classList.remove("hidden");
      testo.value = "";
    }
    //Se non è presente inserisci il testo
    else {
      errorMsg.classList.add("hidden");
      createElementForTheList();
    }
  }
};

// Add element at the list
addButton.addEventListener("click", function () {
  addElementAtList();
});

//Add Element at the list pressing keyboard "Enter" key
document.addEventListener("keydown", function (e) {
  const k = e.key === "Enter";
  if (k) {
    addElementAtList();
  }
});

//Mark the item as done
containerEl.addEventListener("click", function (e) {
  // Controllo se tra gli elementi aggiunti dinamicamente è presente un tag con la classe = checkboxItem
  const checkbox = e.target.classList.contains("checkBoxItem");

  //Se true, seleziono tutti gli elementi che mi interessano
  if (checkbox) {
    const c = document.querySelectorAll(".checkBoxItem");
    const p = document.querySelectorAll(".testoAggiunto");

    //Itero gli elementi selezionati
    for (let i = 0; i < c.length; i++) {
      //Se la checkbox è selezionata, aggiungo al tag "p" la classe "TaskDone"
      if (c[i].checked == true) {
        console.log("Clicked!");
        p[i].classList.add("taskDone");
      }
      //Se la checkboc non è selezionata, tolgo al tag "p" la classe "TaskDone"
      else {
        console.log("Unclicked!");
        p[i].classList.remove("taskDone");
      }
    }
  }
});

//Remove single Item clicking Delete Button
containerEl.addEventListener("click", function (e) {
  const btn = e.target.classList.contains("delete");

  if (btn) {
    console.log("btn clicked");
    const x = e.target.parentElement;

    // x.classList.add("removeItems");

    // Ottieni il valore del contenuto testuale (o di un attributo identificativo)
    const itemValue = x.querySelector("p").textContent.trim();

    //Elimino dall'array l'elemento
    for (const [index, value] of arrEl.entries()) {
      if (value === itemValue) {
        arrEl.splice(index, 1);
      }
    }
    console.log(`Item Removed: ${itemValue}`);

    console.log(arrEl);

    //Aspetto che l'animazione sia terminata prima di rimuovere listContainer
    removeElementAfterAnimation(x);
  }
});

//Remove all items
delBtn.addEventListener("click", () => {
  const listContEl = document.querySelectorAll(".listContainer");

  for (const i of listContEl) {
    i.classList.add("removeItems");

    //Aspetto che l'animazione sia terminata prima di rimuovere listContainer
    removeElementAfterAnimation(i);
  }
  arrEl = [];
  console.log(`All items have been removed`);
  console.log(arrEl);
});

// Load data from local storage on page load
// window.addEventListener("load", loadFromLocalStorage);
