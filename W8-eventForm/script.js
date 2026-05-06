document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
});

const form = document.getElementById('eventForm');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    if (!form.checkValidity()) {
        e.stopPropagation();
    } else {
        alert("Registration Successful!");
        form.reset(); 
        form.classList.remove('was-validated'); 
        return;
    }
    form.classList.add('was-validated');
});