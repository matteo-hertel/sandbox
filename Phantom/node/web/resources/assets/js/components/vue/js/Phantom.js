import Connection from "./Connection.js";

export default {
    data: () => {
        return {
            connection: new Connection(),
            connected: false,
            connectionClass: "",
            data: {
                url: "https://www.google.co.uk"
            }
        };
    },
    methods: {
        connect() {
            this.connection.connect();
        },
        send() {
            this.connection.send(this.data);
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
        },
    }
};
