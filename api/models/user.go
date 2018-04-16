package models

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type PersistedUser struct {
	ID           uuid.UUID `storm:"unique,index"`
	Email        string    `storm:"unique,index"`
	Username     string    `storm:"unique,index"`
	PasswordHash []byte
}

type User struct {
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required,gte=5,lte=14"`
	Password string `json:"password" validate:"required,gte=10,lte=60"`
}

func NewPersistedUser(user *User) (*PersistedUser, error) {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	persisted := &PersistedUser{
		ID:           uuid.New(),
		Email:        user.Email,
		Username:     user.Username,
		PasswordHash: passwordHash,
	}

	return persisted, err
}

func (persisted PersistedUser) CheckIfPasswordMatch(password string) bool {
	err := bcrypt.CompareHashAndPassword(persisted.PasswordHash, []byte(password))

	if err != nil {
		return false
	}

	return true
}
