import Connection from "./Connection.js";

export default {
    data: () => {
        return {
            connection: new Connection(),
            connected: false,
            connectionClass: "",
            started: [],
            completed: [],
            errors: [],
            output: [],
            data: {
                url: "https://www.google.co.uk"
            }
        };
    },
    methods: {
        connect() {
            this.connection.connect();
            this.connection.setEmitter(this.emitter.bind(this));
        },
        send() {
            this.connection.send(this.data);
        },
        checkKey(array, key) {
            return array.filter(function(value) {
                return value === key;
            }).length;
        },
        deleteFromArray(array, key) {
            let k = array.indexOf(key);
            if (k !== -1) {
                array.splice(k, 1);
            }
        },
        processMessage(msg) {
            if (!msg.key) {
                return;
            }

            switch (msg.status) {
                case "initializing":
                    this.started.push(msg.key);
                    break;
                case "success":
                    this.deleteFromArray(this.started, msg.key);
                    this.completed.push(msg.key);
                    break;


            }



            // else {
            //                 this.items[msg.key].status = msg.status;
            //             }
        },
        emitter(msg) {
            this.processMessage(msg);
        }

    },
    computed: {
        connectionStatus() {
            switch (this.connection.status) {
                case "Connected":
                    this.connectionClass = "text-success";
                    this.connected = true;
                    break;
                case "Connecting":
                    this.connectionClass = "text-warning";
                    this.connected = false;
                    break;
                case "Disconnected":
                case "Error":
                    this.connectionClass = "text-danger";
                    this.connected = false;
                    break;


            }
            return this.connection.status;
        }
    }
};
