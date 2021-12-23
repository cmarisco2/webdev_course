// ! JS For Adding Client-Side Validation Functionality to Form 
//* Idea: querySelectAll forms with class name "needs-validation" (add to form if not there)  
//* --ensure all fields needing client side validation have 'required' as an html property  
//* --ensure FORM has NOVALIDATE as a Property  
//* Idea: Loop through each form in forms array and add event listener for 'submit'  
//* Idea: add 'preventDefault' and stopPropagation methods, Then add 'was-validated' BootStrap Class 
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
