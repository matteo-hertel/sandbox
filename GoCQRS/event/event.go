package event

import "github.com/matteo-hertel/sandbox/goCQRS/schema"

type EventStore interface {
	Close()
	PublishCarCreated(car schema.Car) error
	SubscribeCarCreated() (<-chan CarCreatedMessage, error)
	OnCarCreated(f func(CarCreatedMessage)) error
}

var impl EventStore

func SetEventStore(es EventStore) {
	impl = es
}

func Close() {
	impl.Close()
}

func PublishCarCreated(car schema.Car) error {
	return impl.PublishCarCreated(car)
}

func SubscribeCarCreated() (<-chan CarCreatedMessage, error) {
	return impl.SubscribeCarCreated()
}

func OnCarCreated(f func(CarCreatedMessage)) error {
	return impl.OnCarCreated(f)
}
