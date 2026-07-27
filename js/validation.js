/* Client-side form validation — no backend, dummy submit handling */

function markInvalid(input, msg){
  input.classList.add("invalid");
  const err = input.closest(".field")?.querySelector(".error-msg");
  if(err){ err.textContent = msg; err.classList.add("show"); }
}
function clearInvalid(input){
  input.classList.remove("invalid");
  const err = input.closest(".field")?.querySelector(".error-msg");
  if(err){ err.classList.remove("show"); }
}
function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isPhone(v){ return /^[0-9+\-\s()]{7,15}$/.test(v); }

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Login form ---- */
  const loginForm = document.getElementById("login-form");
  if(loginForm){
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const email = document.getElementById("login-email");
      const pass = document.getElementById("login-password");
      clearInvalid(email); clearInvalid(pass);
      if(!isEmail(email.value)){ markInvalid(email, "Enter a valid email address."); valid = false; }
      if(pass.value.length < 6){ markInvalid(pass, "Password must be at least 6 characters."); valid = false; }
      if(valid){
        showToast("Welcome back! Redirecting to your dashboard…");
        setTimeout(() => window.location.href = "dashboard.html", 900);
      } else {
        showToast("Please fix the highlighted fields.", "error");
      }
    });
  }

  /* ---- Register form ---- */
  const registerForm = document.getElementById("register-form");
  if(registerForm){
    document.querySelectorAll(".radio-card").forEach(card => {
      card.addEventListener("click", () => {
        card.parentElement.querySelectorAll(".radio-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        card.querySelector("input").checked = true;
      });
    });

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const name = document.getElementById("reg-name");
      const email = document.getElementById("reg-email");
      const phone = document.getElementById("reg-phone");
      const age = document.getElementById("reg-age");
      const pass = document.getElementById("reg-password");
      const confirm = document.getElementById("reg-confirm");
      const terms = document.getElementById("reg-terms");

      [name, email, phone, age, pass, confirm].forEach(clearInvalid);

      if(name.value.trim().length < 2){ markInvalid(name, "Enter your full name."); valid = false; }
      if(!isEmail(email.value)){ markInvalid(email, "Enter a valid email address."); valid = false; }
      if(!isPhone(phone.value)){ markInvalid(phone, "Enter a valid phone number."); valid = false; }
      if(!age.value || age.value < 18 || age.value > 100){ markInvalid(age, "Age must be between 18 and 100."); valid = false; }
      if(pass.value.length < 6){ markInvalid(pass, "Password must be at least 6 characters."); valid = false; }
      if(confirm.value !== pass.value){ markInvalid(confirm, "Passwords do not match."); valid = false; }
      if(!terms.checked){ showToast("Please agree to the terms to continue.", "error"); valid = false; }

      if(valid){
        showToast("Registration successful! You can now log in.");
        setTimeout(() => window.location.href = "login.html", 1000);
      } else if (terms.checked) {
        showToast("Please fix the highlighted fields.", "error");
      }
    });
  }

  /* ---- Blood request form ---- */
  const requestForm = document.getElementById("request-form");
  if(requestForm){
    requestForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const patient = document.getElementById("req-patient");
      const hospital = document.getElementById("req-hospital");
      const contact = document.getElementById("req-contact");
      [patient, hospital, contact].forEach(clearInvalid);
      if(patient.value.trim().length < 2){ markInvalid(patient, "Enter patient name."); valid = false; }
      if(hospital.value.trim().length < 2){ markInvalid(hospital, "Enter hospital name."); valid = false; }
      if(!isPhone(contact.value)){ markInvalid(contact, "Enter a valid contact number."); valid = false; }
      if(valid){
        showToast("Blood request submitted. Nearby donors will be notified.");
        requestForm.reset();
        openModal("request-success-modal");
      } else {
        showToast("Please fix the highlighted fields.", "error");
      }
    });
  }

  /* ---- Contact form ---- */
  const contactForm = document.getElementById("contact-form");
  if(contactForm){
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const name = document.getElementById("contact-name");
      const email = document.getElementById("contact-email");
      const msg = document.getElementById("contact-message");
      [name, email, msg].forEach(clearInvalid);
      if(name.value.trim().length < 2){ markInvalid(name, "Enter your name."); valid = false; }
      if(!isEmail(email.value)){ markInvalid(email, "Enter a valid email address."); valid = false; }
      if(msg.value.trim().length < 10){ markInvalid(msg, "Message should be at least 10 characters."); valid = false; }
      if(valid){
        showToast("Message sent! We'll get back to you within 24 hours.");
        contactForm.reset();
      } else {
        showToast("Please fix the highlighted fields.", "error");
      }
    });
  }
});
