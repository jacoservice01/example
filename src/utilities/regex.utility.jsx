const ok = "✔";

const validateName = /^[/:#()*'\"-.,;?¿!¡a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]{2,50}$/;
const validateDescription = /^[/:#()*'\"-.,;?¿!¡a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]{3,100}$/;
const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export {
    ok,
    validateName,
    validateDescription,
    validateEmail
    
}