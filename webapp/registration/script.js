class Model {
    constructor() {
        this.user = {};
    }

    submitUser() {
        alert(this.user);
    }
}

class View {
    constructor() {
        // The root element
        this.root = this.getElement('#root');

        // The title of the app
        this.title = this.createElement('h1');
        this.title.textContent = 'Register';

        this.form = this.createElement('form');
        this.formList = this.createElement('ul');

        this.li_username = this.createElement('li');
        this.username = this.createElement('input');
        this.username.type = 'text';
        this.username.placeholder = 'Username';
        this.username.name = 'username';
        this.username.setAttribute('required', 'true');
        this.li_username.append(this.username);

        this.li_email = this.createElement('li');
        this.email = this.createElement('input');
        this.email.type = 'email';
        this.email.placeholder = 'Email';
        this.email.name = 'email';
        this.email.setAttribute('required', 'true');
        this.li_email.append(this.email);

        this.li_password = this.createElement('li');
        this.password = this.createElement('input');
        this.password.type = 'password';
        this.password.placeholder = 'Password';
        this.password.name = 'password';
        this.password.setAttribute('required', 'true');
        this.li_password.append(this.password);

        this.li_repeatPassword = this.createElement('li');
        this.repeatPassword = this.createElement('input');
        this.repeatPassword.type = 'password';
        this.repeatPassword.placeholder = 'Confirm password';
        this.repeatPassword.name = 'repeatPassword';
        this.repeatPassword.setAttribute('required', 'true');
        this.li_repeatPassword.append(this.repeatPassword);

        this.submitButton = this.createElement('button');
        this.submitButton.type = 'submit';
        this.submitButton.innerText = 'Register';

        // The visual representation of the form
        this.formList.append(this.li_username, this.li_email, this.li_password, this.li_repeatPassword, this.submitButton);
        // Append list
        this.form.append(this.formList);

        // Append the title and form
        this.root.append(this.title, this.form);
    }
    // create element with custom css element
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector);
        console.log(element);

        return element;
    }

    bindCheckPasswords(handler) {
        this.repeatPassword.addEventListener('input', handler);
    }

    bindSubmitForm(handler) {
        this.form.addEventListener('submit', handler);
    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindCheckPasswords(this.checkPasswords);
        this.view.bindSubmitForm(this.handleSubmitUser);
    }

    checkPasswords = event => {
        if (this.view.password.value !== this.view.repeatPassword.value) {
            this.view.repeatPassword.setCustomValidity('Passwords do not match');
        }
        else {
            this.view.repeatPassword.setCustomValidity('');
        }
    }

    handleSubmitUser = event => {
        var user = {};
        user.username = this.view.username.value;
        user.email = this.view.email.value;
        user.password = this.view.password.value;
        user.repeatPassword = this.view.repeatPassword.value;
        this.model.user = user;
        this.model.submitUser();
    }


}

const registrationForm = new Controller(new Model(), new View());