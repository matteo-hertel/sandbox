package event

import (
	"bytes"
	"encoding/gob"

	"github.com/matteo-hertel/sandbox/goCQRS/schema"
	"github.com/nats-io/go-nats"
)

type NatsEventStore struct {
	nc                     *nats.Conn
	carCreatedSubscription *nats.Subscription
	carCreatedChan         chan CarCreatedMessage
}

func NewNats(url string) (*NatsEventStore, error) {
	nc, err := nats.Connect(url)
	if err != nil {
		return nil, err
	}
	return &NatsEventStore{nc: nc}, nil
}

func (e *NatsEventStore) SubscribeCarCreated() (<-chan CarCreatedMessage, error) {
	m := CarCreatedMessage{}
	e.carCreatedChan = make(chan CarCreatedMessage, 64)
	ch := make(chan *nats.Msg, 64)
	var err error
	e.carCreatedSubscription, err = e.nc.ChanSubscribe(m.Key(), ch)
	if err != nil {
		return nil, err
	}
	// Decode message
	go func() {
		for {
			select {
			case msg := <-ch:
				e.readMessage(msg.Data, &m)
				e.carCreatedChan <- m
			}
		}
	}()
	return (<-chan CarCreatedMessage)(e.carCreatedChan), nil
}

func (e *NatsEventStore) OnCarCreated(f func(CarCreatedMessage)) (err error) {
	m := CarCreatedMessage{}
	e.carCreatedSubscription, err = e.nc.Subscribe(m.Key(), func(msg *nats.Msg) {
		e.readMessage(msg.Data, &m)
		f(m)
	})
	return
}

func (e *NatsEventStore) Close() {
	if e.nc != nil {
		e.nc.Close()
	}
	if e.carCreatedSubscription != nil {
		e.carCreatedSubscription.Unsubscribe()
	}
	close(e.carCreatedChan)
}

func (e *NatsEventStore) PublishCarCreated(car schema.Car) error {
	m := CarCreatedMessage{car.ID, car.Body, car.CreatedAt}
	data, err := e.writeMessage(&m)
	if err != nil {
		return err
	}
	return e.nc.Publish(m.Key(), data)
}

func (mq *NatsEventStore) writeMessage(m Message) ([]byte, error) {
	b := bytes.Buffer{}
	err := gob.NewEncoder(&b).Encode(m)
	if err != nil {
		return nil, err
	}
	return b.Bytes(), nil
}

func (mq *NatsEventStore) readMessage(data []byte, m interface{}) error {
	b := bytes.Buffer{}
	b.Write(data)
	return gob.NewDecoder(&b).Decode(m)
}
