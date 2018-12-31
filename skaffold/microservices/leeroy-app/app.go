package main

import (
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "leeroooooy JENKINS!!\n")
}

func main() {
	log.Print("Alright, let's do this leeroy app server ready")
	http.HandleFunc("/", handler)
	http.ListenAndServe(":50051", nil)
}
