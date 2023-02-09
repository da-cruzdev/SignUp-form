const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const toggle = document.getElementById("toggle");
const validateBtn = document.querySelector(".btn");
let parameters = {
  count: false,
  letters: false,
  numbers: false,
  special: false,
};

let strengthBar = document.getElementById("strength-bar");
let msg = document.getElementById("msg");

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

password.addEventListener("input", strengthChecker);
validateBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
