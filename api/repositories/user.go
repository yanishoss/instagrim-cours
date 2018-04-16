package repositories

import (
	"fmt"

	"../database"
	"../models"
	"github.com/asdine/storm"
	"github.com/asdine/storm/q"
	"github.com/google/uuid"
)

type UserRepository struct {
	DB *storm.DB
}

func (repo UserRepository) Close() error {
	return repo.DB.Close()
}

func (repo UserRepository) Save(user *models.PersistedUser) error {
	return repo.DB.Save(user)
}

func (repo UserRepository) FindOneByEmail(email string) (*models.PersistedUser, error) {
	fetchedUser := new(models.PersistedUser)
	err := repo.DB.One("Email", email, fetchedUser)

	if err != nil {
		return fetchedUser, err
	}

	return fetchedUser, err
}

func (repo UserRepository) FindOneByUsername(username string) (*models.PersistedUser, error) {
	fetchedUser := new(models.PersistedUser)
	err := repo.DB.One("Username", username, fetchedUser)

	if err != nil {
		return fetchedUser, err
	}
	return fetchedUser, err
}

func (repo UserRepository) FindOneById(id string) (*models.PersistedUser, error) {
	fetchedUser := new(models.PersistedUser)
	queryUUID, err := uuid.Parse(id)
	if err != nil {
		return fetchedUser, err
	}
	err = repo.DB.One("ID", queryUUID, fetchedUser)

	if err != nil {
		return fetchedUser, err
	}

	return fetchedUser, err
}

func (repo UserRepository) Exists(user *models.PersistedUser) (bool, error) {
	query := repo.DB.Select(q.Eq("Username", user.Username), q.Eq("Email", user.Email))
	count, err := query.Count(user)
	fmt.Println(count, err)
	return count > 0, err
}

func (repo UserRepository) Delete(user *models.PersistedUser) error {
	return repo.DB.DeleteStruct(user)
}

func NewUserRepository() (*UserRepository, error) {
	db, err := database.NewConnection("user.db")
	if err != nil {
		return nil, err
	}

	repo := &UserRepository{
		DB: db,
	}
	return repo, err
}
