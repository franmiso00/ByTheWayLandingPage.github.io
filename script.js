(function () {
    emailjs.init("TU_PUBLIC_KEY_DE_EMAILJS"); // Reemplaza con tu clave pública
  })();
  
  const subscribeForm = document.getElementById("subscribeForm");
  const responseMessage = document.getElementById("responseMessage");
  
  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío normal del formulario
  
    const email = document.getElementById("email").value;
  
    // Envía el correo usando EmailJS
    emailjs
      .send("TU_SERVICE_ID", "TU_TEMPLATE_ID", { email: email })
      .then(
        function () {
          responseMessage.textContent = "¡Gracias por suscribirte!";
          responseMessage.style.color = "green";
          responseMessage.style.display = "block";
        },
        function () {
          responseMessage.textContent =
            "Hubo un problema con tu suscripción. Intenta de nuevo.";
          responseMessage.style.color = "red";
          responseMessage.style.display = "block";
        }
      );
  });