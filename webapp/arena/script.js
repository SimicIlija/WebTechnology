class Model {
    constructor() {
        var user = sessionStorage.getItem('user');
        if(!user){
            window.location.replace('/login/index.html');
        }
        this.user = user;
        this.onlineUsers = [];
    }
}

class View {
    constructor() {
        // The root element
        this.root = this.getElement('#root');

        // The title of the app
        this.title = this.createElement('h1');
        this.title.textContent = 'Online players';
        this.logoutButton = this.createElement('button');
        
        this.userList = this.createElement('ul');
        this.root.append(this.title, this.logoutButton, this.userList);
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

    bindLogout(handler){
        this.logoutButton.addEventListener('click', handler);

    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.logoutButton.textContent = this.model.user + '(logout)';
        this.view.bindLogout(this.logout);
        this.socketConnect();
    }

    logout = event => {
        sessionStorage.clear();
        window.location.replace('/login/index.html');
    }
    socketConnect(){
        const socket = new WebSocket('ws://localhost:9000');
        var username = this.model.user;
        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify(username));
        });
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
    }

}

const arena = new Controller(new Model(), new View());