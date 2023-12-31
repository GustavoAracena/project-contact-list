import validator from "validator";

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        console.log(this.form);
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('Invalid email');
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            alert('Password must be bewteen 3 and 50 characters');
            error = true;
        }

        if(!error) el.submit();
    }
}
