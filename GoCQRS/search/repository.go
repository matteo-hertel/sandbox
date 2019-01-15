package search

import (
	"context"

	"github.com/matteo-hertel/sandbox/goCQRS/schema"
)

type Repository interface {
	Close()
	InsertCar(ctx context.Context, car schema.Car) error
	SearchCars(ctx context.Context, query string, skip uint64, take uint64) ([]schema.Car, error)
}

var impl Repository

func SetRepository(repository Repository) {
	impl = repository
}

func Close() {
	impl.Close()
}

func InsertCar(ctx context.Context, car schema.Car) error {
	return impl.InsertCar(ctx, car)
}

func SearchCars(ctx context.Context, query string, skip uint64, take uint64) ([]schema.Car, error) {
	return impl.SearchCars(ctx, query, skip, take)
}
