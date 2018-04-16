package models

import "github.com/google/uuid"

type PersistedPost struct {
	ID          uuid.UUID `storm:"unique,index" json:"id,omitempty"`
	ProfilID    uuid.UUID `storm:"unique,index" json:"-"`
	Image       string    `json:"image" validate:"required"`
	Description string    `json:"description"`
}
