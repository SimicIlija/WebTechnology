class Model {
    constructor() {
        var user = sessionStorage.getItem('user');
        if (!user) {
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
        this.emptyElement = this.createElement('div');
        this.logoutButton = this.createElement('button');

        this.userList = this.createElement('ul');
        this.root.append(this.title, this.emptyElement, this.userList, this.logoutButton);
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

    bindLogout(handler) {
        this.logoutButton.addEventListener('click', handler);

    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.logoutButton.textContent = this.model.user + '(logout)';
        this.view.bindLogout(this.logout);
        this.socket = null;
        this.socketConnect();
    }

    logout = event => {
        sessionStorage.clear();
        window.location.replace('/login/index.html');
    }
    socketConnect() {
        this.socket = new WebSocket('ws://localhost:9000');
        var objectUsername = {};
        objectUsername.username = this.model.user;
        console.log(objectUsername);
        this.socket.addEventListener('open', event => {
            this.socket.send(JSON.stringify(objectUsername));
        });
        this.socket.addEventListener('message', event => {
            var object = JSON.parse(event.data);
            if (object.users) {
                this.model.onlineUsers = object.users;
                this.model.onlineUsers.splice(this.model.onlineUsers.indexOf(this.model.user), 1);
                this.redrawUsers();
            }
            if (object.opponent) {
                sessionStorage.setItem('opponent', object.opponent);
                toastr.options.progressBar = true;
                toastr.options.onHidden = function () { window.location.replace("/game/game.html"); }
                toastr.success("Playing against " + object.opponent);
            }
        });
    }
    redrawUsers() {
        console.log(this.model.onlineUsers);
        if (this.model.onlineUsers.length) {
            while (this.view.emptyElement.firstChild) {
                this.view.emptyElement.firstChild.remove();
            }
            while (this.view.userList.firstChild) {
                this.view.userList.firstChild.remove();
            }
            for (let user of this.model.onlineUsers) {

                var element = this.view.createElement('li');
                var label = this.view.createElement('label');
                label.textContent = user;
                var button = this.view.createElement('button');
                button.textContent = 'Play!';
                button.id = user;
                button.addEventListener('click', e => {
                    var startGame = {};
                    startGame.secondPlayer = e.target.id;
                    startGame.firstPlayer = this.model.user;
                    this.socket.send(JSON.stringify(startGame));
                })
                element.append(label, button);
                this.view.userList.append(element);
            }
        } else {
            while (this.view.userList.firstChild) {
                this.view.userList.firstChild.remove();
            }
            var onlyElemMessage = this.view.createElement('h3');
            onlyElemMessage.textContent = "You are only online player."
            this.view.emptyElement.append(onlyElemMessage);
        }
    }

}

const arena = new Controller(new Model(), new View());