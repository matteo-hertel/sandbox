package main

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/matteo-hertel/sandbox/goCQRS/db"
	"github.com/matteo-hertel/sandbox/goCQRS/event"
	"github.com/matteo-hertel/sandbox/goCQRS/schema"
	"github.com/matteo-hertel/sandbox/goCQRS/search"
	"github.com/matteo-hertel/sandbox/goCQRS/util"
)

func onCarCreated(m event.CarCreatedMessage) {
	// Index car for searching
	car := schema.Car{
		ID:        m.ID,
		Body:      m.Body,
		CreatedAt: m.CreatedAt,
	}
	if err := search.InsertCar(context.Background(), car); err != nil {
		log.Println(err)
	}
}

func listCarsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var err error

	// Read parameters
	skip := uint64(0)
	skipStr := r.FormValue("skip")
	take := uint64(100)
	takeStr := r.FormValue("take")
	if len(skipStr) != 0 {
		skip, err = strconv.ParseUint(skipStr, 10, 64)
		if err != nil {
			util.ResponseError(w, http.StatusBadRequest, "Invalid skip parameter")
			return
		}
	}
	if len(takeStr) != 0 {
		take, err = strconv.ParseUint(takeStr, 10, 64)
		if err != nil {
			util.ResponseError(w, http.StatusBadRequest, "Invalid take parameter")
			return
		}
	}

	// Fetch cars
	cars, err := db.ListCars(ctx, skip, take)
	if err != nil {
		log.Println(err)
		util.ResponseError(w, http.StatusInternalServerError, "Could not fetch cars")
		return
	}

	util.ResponseOk(w, cars)
}

func searchCarsHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	ctx := r.Context()

	// Read parameters
	query := r.FormValue("query")
	if len(query) == 0 {
		util.ResponseError(w, http.StatusBadRequest, "Missing query parameter")
		return
	}
	skip := uint64(0)
	skipStr := r.FormValue("skip")
	take := uint64(100)
	takeStr := r.FormValue("take")
	if len(skipStr) != 0 {
		skip, err = strconv.ParseUint(skipStr, 10, 64)
		if err != nil {
			util.ResponseError(w, http.StatusBadRequest, "Invalid skip parameter")
			return
		}
	}
	if len(takeStr) != 0 {
		take, err = strconv.ParseUint(takeStr, 10, 64)
		if err != nil {
			util.ResponseError(w, http.StatusBadRequest, "Invalid take parameter")
			return
		}
	}

	// Search cars
	cars, err := search.SearchCars(ctx, query, skip, take)
	if err != nil {
		log.Println(err)
		util.ResponseOk(w, []schema.Car{})
		return
	}

	util.ResponseOk(w, cars)
}
