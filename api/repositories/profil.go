package repositories

import (
	"../database"
	"../models"
	"github.com/asdine/storm"
	"github.com/asdine/storm/q"
	"github.com/google/uuid"
)

type ProfilRepository struct {
	DB *storm.DB
}

func (repo ProfilRepository) Close() error {
	return repo.DB.Close()
}

func (repo ProfilRepository) Save(profil *models.PersistedProfil) error {
	return repo.DB.Save(profil)
}

func (repo ProfilRepository) FindOneByUsername(username string) (*models.PersistedProfil, error) {
	fetchedProfil := new(models.PersistedProfil)
	err := repo.DB.One("Username", username, fetchedProfil)

	if err != nil {
		return fetchedProfil, err
	}
	return fetchedProfil, err
}

func (repo ProfilRepository) FindOneById(id string) (*models.PersistedProfil, error) {
	fetchedProfil := new(models.PersistedProfil)
	queryUUID, err := uuid.Parse(id)
	if err != nil {
		return fetchedProfil, err
	}
	err = repo.DB.One("ID", queryUUID, fetchedProfil)

	if err != nil {
		return fetchedProfil, err
	}

	return fetchedProfil, err
}

func (repo ProfilRepository) FindOneByUserId(userId string) (*models.PersistedProfil, error) {
	fetchedProfil := new(models.PersistedProfil)
	queryUUID, err := uuid.Parse(userId)
	if err != nil {
		return fetchedProfil, err
	}
	err = repo.DB.One("UserID", queryUUID, fetchedProfil)

	if err != nil {
		return fetchedProfil, err
	}

	return fetchedProfil, err
}

func (repo ProfilRepository) Exists(profil *models.PersistedProfil) (bool, error) {
	query := repo.DB.Select(q.Eq("Username", profil.Username))
	count, err := query.Count(profil)
	return count > 0, err
}

func (repo ProfilRepository) Delete(profil *models.PersistedProfil) error {
	return repo.DB.DeleteStruct(profil)
}

func (repo ProfilRepository) Update(profil *models.PersistedProfil) error {
	return repo.DB.Update(profil)
}

func NewProfilRepository() (*ProfilRepository, error) {
	db, err := database.NewConnection("profil.db")
	if err != nil {
		return nil, err
	}

	repo := &ProfilRepository{
		DB: db,
	}
	return repo, err
}
