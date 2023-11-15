export default function RegisterForm () {
  function validateEmail (email) {
    const emailRegex = /^(.+)@(noroff\.no|stud\.noroff\.no)$/;
    const isValid = emailRegex.test(email);
    const errorMessage = document.getElementById("email-error-message");

    if (!isValid) {
      errorMessage.innerText =
        "Email must contain @stud.noroff.no";
      document.getElementById("submit-button").disabled = true;
    } else {
      errorMessage.innerText = "";
      document.getElementById("submit-button").disabled = false;
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    
    const { name, email, password, avatar } = event.target.elements;

    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value
    }

    try {
      const response = await fetch("")
    }
  }
}