package models

import "github.com/google/uuid"

type PersistedProfil struct {
	ID       uuid.UUID `storm:"index,unique"`
	UserID   uuid.UUID `storm:"index,unique"`
	Avatar   string
	Name     string `storm:"index"`
	Username string `storm:"index,unique"`
	Bio      string
}

type Profil struct {
	ID       uuid.UUID `json:"id,omitempty"`
	Avatar   string    `json:"avatar"`
	Name     string    `json:"name" validate:"required,gte=5,lte=12"`
	Username string    `json:"username"`
	Bio      string    `json:"bio" validate:"lte=500"`
}

func NewPersistedProfil(profil *Profil) *PersistedProfil {
	persisted := &PersistedProfil{
		ID:       uuid.New(),
		Avatar:   profil.Avatar,
		Name:     profil.Name,
		Username: profil.Username,
		Bio:      profil.Bio,
	}
	return persisted
}
