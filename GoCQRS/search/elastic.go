package search

import (
	"context"
	"encoding/json"
	"log"

	"github.com/matteo-hertel/sandbox/goCQRS/schema"
	"github.com/olivere/elastic"
)

type ElasticRepository struct {
	client *elastic.Client
}

func NewElastic(url string) (*ElasticRepository, error) {
	client, err := elastic.NewClient(
		elastic.SetURL(url),
		elastic.SetSniff(false),
	)
	if err != nil {
		return nil, err
	}
	return &ElasticRepository{client}, nil
}

func (r *ElasticRepository) Close() {
}

func (r *ElasticRepository) InsertCar(ctx context.Context, car schema.Car) error {
	_, err := r.client.Index().
		Index("cars").
		Type("car").
		Id(car.ID).
		BodyJson(car).
		Refresh("wait_for").
		Do(ctx)
	return err
}

func (r *ElasticRepository) SearchCars(ctx context.Context, query string, skip uint64, take uint64) ([]schema.Car, error) {
	result, err := r.client.Search().
		Index("cars").
		Query(
			elastic.NewMultiMatchQuery(query, "body").
				Fuzziness("3").
				PrefixLength(1).
				CutoffFrequency(0.0001),
		).
		From(int(skip)).
		Size(int(take)).
		Do(ctx)
	if err != nil {
		return nil, err
	}
	cars := []schema.Car{}
	for _, hit := range result.Hits.Hits {
		var car schema.Car
		if err = json.Unmarshal(*hit.Source, &car); err != nil {
			log.Println(err)
		}
		cars = append(cars, car)
	}
	return cars, nil
}
