package db

import (
	"context"
	"database/sql"

	_ "github.com/lib/pq"
	"github.com/matteo-hertel/sandbox/goCQRS/schema"
)

type PostgresRepository struct {
	db *sql.DB
}

func NewPostgres(url string) (*PostgresRepository, error) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}
	return &PostgresRepository{
		db,
	}, nil
}

func (r *PostgresRepository) Close() {
	r.db.Close()
}

func (r *PostgresRepository) InsertCar(ctx context.Context, car schema.Car) error {
	_, err := r.db.Exec("INSERT INTO cars(id, body, created_at) VALUES($1, $2, $3)", car.ID, car.Body, car.CreatedAt)
	return err
}

func (r *PostgresRepository) ListCars(ctx context.Context, skip uint64, take uint64) ([]schema.Car, error) {
	rows, err := r.db.Query("SELECT * FROM cars ORDER BY id DESC OFFSET $1 LIMIT $2", skip, take)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Parse all rows into an array of Cars
	cars := []schema.Car{}
	for rows.Next() {
		car := schema.Car{}
		if err = rows.Scan(&car.ID, &car.Body, &car.CreatedAt); err == nil {
			cars = append(cars, car)
		}
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return cars, nil
}
