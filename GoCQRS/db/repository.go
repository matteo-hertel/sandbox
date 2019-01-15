package db

import (
	"context"

	"github.com/matteo-hertel/sandbox/goCQRS/schema"
)

type Repository interface {
	Close()
	InsertCar(ctx context.Context, car schema.Car) error
	ListCars(ctx context.Context, skip uint64, take uint64) ([]schema.Car, error)
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

func ListCars(ctx context.Context, skip uint64, take uint64) ([]schema.Car, error) {
	return impl.ListCars(ctx, skip, take)
}
