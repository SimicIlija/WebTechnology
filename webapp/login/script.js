class Model {
    constructor() {
        this.user = {};
        this.status = 0;
    }

    async submitUser() {
        var url = 'http://localhost:3000/login';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'same-origin',
            body: JSON.stringify(this.user)
        })
            .then(response => { this.status = response.status; return response.json(); })
            .then(data => {
                if (this.status === 200) {
                    toastr.options.progressBar = true;
                    toastr.options.onHidden = function() {window.location.replace("/arena/index.html"); }
                    toastr.success("Welcome " + data);
                    sessionStorage.setItem('user', data);
                } else { toastr.error(data); }
            })
            .catch(error => toastr.error(error));
    }
}

class View {
    constructor() {
        // The root element
        this.root = this.getElement('#root');

        // The title of the app
        this.title = this.createElement('h1');
        this.title.textContent = 'Login';

        this.form = this.createElement('form');
        this.formList = this.createElement('ul');

        this.li_username = this.createElement('li');
        this.username = this.createElement('input');
        this.username.type = 'text';
        this.username.placeholder = 'Username';
        this.username.name = 'username';
        this.username.setAttribute('required', 'true');
        this.li_username.append(this.username);

        this.li_password = this.createElement('li');
        this.password = this.createElement('input');
        this.password.type = 'password';
        this.password.placeholder = 'Password';
        this.password.name = 'password';
        this.password.setAttribute('required', 'true');
        this.li_password.append(this.password);

        this.submitButton = this.createElement('button');
        this.submitButton.type = 'submit';
        this.submitButton.innerText = 'Login';

        // The visual representation of the form
        this.formList.append(this.li_username, this.li_password, this.submitButton);
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
        return element;
    }

    bindSubmitForm(handler) {
        this.form.addEventListener('submit', handler);
    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindSubmitForm(this.handleSubmitUser);
    }

    handleSubmitUser = event => {
        event.preventDefault();
        var user = {};
        user.username = this.view.username.value;
        user.password = this.view.password.value;
        this.model.user = user;
        this.model.submitUser();
    }


}

const loginForm = new Controller(new Model(), new View());