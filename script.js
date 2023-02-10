const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const toggle = document.getElementById("toggle");
const validateBtn = document.querySelector(".btn");
const form = document.querySelector("#form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");

let strengthBar = document.getElementById("strength-bar");
let msg = document.getElementById("msg");
let parameters = {
  count: false,
  letters: false,
  numbers: false,
  special: false,
};

function showHidePassword() {
  if (password.type == "password") {
    password.setAttribute("type", "text");
    password2.setAttribute("type", "text");
    toggle.classList.add("fa-eye-slash");
  } else {
    password.setAttribute("type", "password");
    password2.setAttribute("type", "password");
    toggle.classList.remove("fa-eye-slash");
  }
}

toggle.addEventListener("click", showHidePassword);

function strengthChecker() {
  let password = document.getElementById("password").value;

  parameters.letters = /[A-Za-z]+/.test(password) ? true : false;
  parameters.numbers = /[0-9]+/.test(password) ? true : false;
  parameters.special = /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)
    ? true
    : false;

  let barlength = Object.values(parameters).filter((value) => value);
  /*console.log(Object.values(parameters), barlength); */

  strengthBar.innerHTML = "";
  for (let i in barlength) {
    let span = document.createElement("span");
    span.classList.add("strength");
    strengthBar.appendChild(span);
  }

  let spanRef = document.getElementsByClassName("strength");
  for (let i = 0; i < spanRef.length; i++) {
    switch (spanRef.length - 1) {
      case 0:
        spanRef[i].style.background = "#ff3e36";
        msg.textContent = "Mot de passe très faible!!";
        break;
      case 1:
        spanRef[i].style.background = "#ff691f";
        msg.textContent = "Mot de passe faible!!";
        break;
      case 2:
        spanRef[i].style.background = "#ffda36";
        msg.textContent = "Mot de passe moyen!!";
        break;
      case 3:
        spanRef[i].style.background = "#0be881";
        msg.textContent = "Mot de passe fort!!";
        break;
    }
  }
}

/*password.addEventListener("input", strengthChecker);*/

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();
});

function formValidation() {
  const userValue = username.value.trim();
  const emailValue = email.value.trim();
  const passValue = password.value.trim();
  const pass2Value = password2.value.trim();

  if (userValue === "") {
    let message = "Username ne peut pas être vide";

    setError(username, message);
  } else if (!userValue.match(/^[a-zA-Z]/)) {
    let message = "Username doit commencer par une lettre";
    setError(username, message);
  } else {
    let valueLength = userValue.length;
    if (valueLength < 3) {
      let message = "Username doit avoir au moins 3 caractères";
      setError(username, message);
    } else {
      setSucces(username);
    }
  }

  /* Verification de l'email */
  if (emailValue === "") {
    let message = "Email ne peut pas être vide";
    setError(email, message);
  } else if (!emailVerify(emailValue)) {
    let message = "Email non valide";
    setError(email, message);
  } else {
    setSucces(email);
  }

  /* Verification du mot de passe */
  if (passValue === "") {
    let message = "Password ne peut pas être vide";
    setError(password, message);
  } else if (!passwordVerify(passValue)) {
    let message = "Password trop faible(8 à 12 caractères)";
    setError(password, message);
  } else if (passValue !== pass2Value) {
    let message = "Les mots de passe ne correspondent pas";
    setError(password, message);
  } else {
    setSucces(password);
  }

  if (pass2Value === "") {
    let message = "Veuillez confirmer le mot de passe";
    setError(password2, message);
  } else if (pass2Value !== passValue) {
    let message = "Les mots de passe ne correspondent pas";
    setError(password2, message);
  } else {
    setSucces(password2);
  }
}

function setError(element, message) {
  const control = element.nextElementSibling;
  const small = control.querySelector("small");
  console.log(control);

  small.innerText = message;
  control.className = "control error";
}

function setSucces(element) {
  const control = element.nextElementSibling;
  control.className = "control success";
}

function emailVerify(email) {
  const reg = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  return reg.test(email);
}

function passwordVerify(password) {
  const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;
  const reg2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[^a-zA-Z\d@$!%*?&]).{8,}$/;
  return reg2.test(password);
}
