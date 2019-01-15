package main

import (
	"time"
)

const (
	KindCarCreated = iota + 1
)

type CarCreatedMessage struct {
	Kind      uint32    `json:"kind"`
	ID        string    `json:"id"`
	Body      string    `json:"body"`
	CreatedAt time.Time `json:"created_at"`
}

func newCarCreatedMessage(id string, body string, createdAt time.Time) *CarCreatedMessage {
	return &CarCreatedMessage{
		Kind:      KindCarCreated,
		ID:        id,
		Body:      body,
		CreatedAt: createdAt,
	}
}
