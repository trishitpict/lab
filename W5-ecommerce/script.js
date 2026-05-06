document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('.card-subtitle').innerText;
            alert(productName + " added to cart!");
        });
    });
});