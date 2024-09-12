document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    let currentIndex = 0;

    const updateClass = () => {
        elements.forEach((el, index) => {
            if (index === currentIndex) {
                el.classList.add('welement');
                const containerPrzyciski = el.querySelectorAll('.przycisk');
                containerPrzyciski.forEach((przycisk) => {
                    przycisk.classList.add('wykonany');
                });
            } else {
                el.classList.remove('welement');
                // Usuwamy klasę .wykonany z dzieci .containerPrzycisk, gdy element nie jest aktywny
                const containerPrzyciski = el.querySelectorAll('.przycisk');
                containerPrzyciski.forEach((przycisk) => {
                    przycisk.classList.remove('wykonany');
                });
            }
        });
    };

    const handleNavigation = (direction) => {
        if (direction === 'kolejny' && currentIndex < elements.length - 1) {
            currentIndex++;
        } else if (direction === 'poprzedni' && currentIndex > 0) {
            currentIndex--;
        }
        updateClass();
    };

    elements.forEach((element) => {
        const poprzedniBtn = element.querySelector('.poprzedni');
        const kolejnyBtn = element.querySelector('.kolejny');

        if (poprzedniBtn) {
            poprzedniBtn.addEventListener('click', () => handleNavigation('poprzedni'));
        }

        if (kolejnyBtn) {
            kolejnyBtn.addEventListener('click', () => handleNavigation('kolejny'));
        }
    });

    updateClass();


    const requiredInputs = document.querySelectorAll('#formularz [required]');

    console.log(requiredInputs.length)

    function validateEmail(input) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(input.value);
    }

    function validatePhone(input) {
        const phoneLength = input.value.replace(/\s/g, '').length;
        return phoneLength === 9 || phoneLength === 11;
    }

    function validateInput(input) {
        let isValid = true;
        
        if (input.tagName.toLowerCase() === 'select') {
            isValid = input.value !== '';
        
        } else if (input.type === 'email' && input.placeholder.includes('przyklad@poczta.pl')) {
            isValid = validateEmail(input);
        
        } else if (input.type === 'tel' && input.placeholder.includes('123 456 789')) {
            isValid = validatePhone(input);
        
        } else {
            isValid = input.value.trim() !== '';
        }

        if (isValid) {
            input.classList.remove('blad');
            input.closest('.element').querySelector('.kolejny').classList.add('wykonany');
        } else {
            input.classList.add('blad');
            input.closest('.element').querySelector('.kolejny').classList.remove('wykonany');
        }
    }

    requiredInputs.forEach(input => {
        // Obsługa zarówno zmiany wartości, jak i wpisywania w przypadku input/select
        input.addEventListener('input', function() {
            validateInput(input);
        });

        input.addEventListener('change', function() {
            validateInput(input);
        });
    });

    // Poprawne referencje do elementów
    const closeModalBtn = document.getElementById('closeModal');
    const openModalBtn = document.getElementById('openModal');

    function openModal() {
        const modal = document.getElementById('thxmodal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Wyłącza przewijanie strony
    }

    function closeModal() {
        const modal = document.getElementById('thxmodal');
        modal.style.display = 'none';
        document.body.style.overflow = 'visible'; // Włącza przewijanie strony
    }

    // Przypisanie funkcji do przycisków
    openModalBtn.onclick = openModal;
    closeModalBtn.onclick = closeModal;


    const inputFieldtel = document.getElementById('formularz-tel');

    inputFieldtel.addEventListener('input', function() {
        let value = inputFieldtel.value.replace(/-/g, ''); // Usuń wszystkie myślniki

        for (let i = 0; i < value.length; i++) {
            if (i === 3 || i === 7) {
                value = value.slice(0, i) + '-' + value.slice(i); // Dodaj "-" po 3 i 6 znaku
            }
        }

        inputFieldtel.value = value;

    });
    
    
    const inputFieldkod = document.getElementById('formularz-kodpocztowy');

    inputFieldkod.addEventListener('input', function() {
        let value = inputFieldkod.value.replace(/-/g, ''); // Usuń wszystkie myślniki
        for (let i = 0; i < value.length; i++) {
            if (i === 2 ) {
                value = value.slice(0, i) + '-' + value.slice(i); 
            }
        }

        inputFieldkod.value = value;

    });
    
    

});

