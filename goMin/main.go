package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/arturovm/min"
)

func main() {
	m := min.New(nil)
	m.Use(logger)
	m.Use(printer)

	apiRouter := m.Group("/api")
	{
		apiRouter.Get("/", apiRoot)
		nameRouter := apiRouter.Group("/:name")
		{
			// Every request sent to routes defined on this sub-router will now
			// have a reference to a name in its context.
			// Useful for RESTful design.
			nameRouter.Use(nameExtractor)
			nameRouter.Use(papoiAdder)

			// GET /api/ignacio
			nameRouter.Get("/", greet)
			// GET /api/ignacio/goodbye
			nameRouter.Get("/goodbye", goodbye)
		}
	}

	http.ListenAndServe(":8080", m)
}

// -- Middleware --

// a simple logger
func logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("| %s %s", r.Method, r.URL)
		next.ServeHTTP(w, r)
	})
}

// a useless middleware that prints text
func printer(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("this prints some text")
		next.ServeHTTP(w, r)
	})
}

// extracts a name from the URL and injects it into the request's context
func papoiAdder(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		papoi := "Papoi, 🍌"
		ctx := context.WithValue(r.Context(), "papoi", papoi)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// extracts a name from the URL and injects it into the request's context
func nameExtractor(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		name := min.GetParam(r, "name")
		ctx := context.WithValue(r.Context(), "name", name)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// -- Handlers --

func apiRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "api root")
}

// greets the user with :name
func greet(w http.ResponseWriter, r *http.Request) {
	name := r.Context().Value("name").(string)
	papoi := r.Context().Value("papoi").(string)
	fmt.Fprintf(w, "hello %s! Additionally some papoi has been found: %s", name, papoi)
}

// says "bye" to the user with :name
func goodbye(w http.ResponseWriter, r *http.Request) {
	name := r.Context().Value("name").(string)
	fmt.Fprintf(w, "bye %s!", name)
}
