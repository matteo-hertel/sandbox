package event

import (
	"time"
)

type Message interface {
	Key() string
}

type CarCreatedMessage struct {
	ID        string
	Body      string
	CreatedAt time.Time
}

func (m *CarCreatedMessage) Key() string {
	return "car.created"
}
