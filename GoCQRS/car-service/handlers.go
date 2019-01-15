package main

import (
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/matteo-hertel/sandbox/goCQRS/db"
	"github.com/matteo-hertel/sandbox/goCQRS/event"
	"github.com/matteo-hertel/sandbox/goCQRS/schema"
	"github.com/matteo-hertel/sandbox/goCQRS/util"
	"github.com/segmentio/ksuid"
)

func createCarHandler(w http.ResponseWriter, r *http.Request) {
	type response struct {
		ID string `json:"id"`
	}

	ctx := r.Context()

	// Read parameters
	body := template.HTMLEscapeString(r.FormValue("body"))
	if len(body) < 1 || len(body) > 140 {
		util.ResponseError(w, http.StatusBadRequest, "Invalid body")
		return
	}

	// Create car
	createdAt := time.Now().UTC()
	id, err := ksuid.NewRandomWithTime(createdAt)
	if err != nil {
		util.ResponseError(w, http.StatusInternalServerError, "Failed to create car")
		return
	}
	car := schema.Car{
		ID:        id.String(),
		Body:      body,
		CreatedAt: createdAt,
	}
	if err := db.InsertCar(ctx, car); err != nil {
		log.Println(err)
		util.ResponseError(w, http.StatusInternalServerError, "Failed to create car")
		return
	}

	// Publish event
	if err := event.PublishCarCreated(car); err != nil {
		log.Println(err)
	}

	// Return new car
	util.ResponseOk(w, response{ID: car.ID})
}
