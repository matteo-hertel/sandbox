import Connection from "./Connection.js";

export default {
    data: () => {
        return {
            connection: new Connection(),
            connected: false,
            connectionClass: "",
            items: [],
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
        processMessage(msg) {
            if (!msg.key) {
                return;
            }


            this.items.push({
                key: msg.key,
                status: msg.status
            });

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
