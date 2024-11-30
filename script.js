 function sendMail(){
    let params = {
        email : document.getElementById("email").value
    }

    const serviceID = 'service_2wp0grj';
    const templateID = 'template_kj74ya6';

    emailjs.send(serviceID, templateID, params)
        .then(alert("¡Gracias por suscribirte!"))
 }
