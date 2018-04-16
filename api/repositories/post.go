package repositories

import (
	"../database"
	"../models"
	"github.com/asdine/storm"
	"github.com/google/uuid"
)

type PostRepository struct {
	DB *storm.DB
}

func (repo PostRepository) Close() error {
	return repo.DB.Close()
}

func (repo PostRepository) Save(post *models.PersistedPost) error {
	return repo.DB.Save(post)
}

func (repo PostRepository) FindByProfilID(id string) ([]*models.PersistedPost, error) {
	profilId, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}
	fetchedPosts := []*models.PersistedPost{}
	err = repo.DB.Find("ProfilID", profilId, fetchedPosts)

	if err != nil {
		return fetchedPosts, err
	}
	return fetchedPosts, err
}

func (repo PostRepository) FindOneById(id string) (*models.PersistedPost, error) {
	fetchedPost := new(models.PersistedPost)
	queryUUID, err := uuid.Parse(id)
	if err != nil {
		return fetchedPost, err
	}
	err = repo.DB.One("ID", queryUUID, fetchedPost)

	if err != nil {
		return fetchedPost, err
	}

	return fetchedPost, err
}

func (repo PostRepository) Delete(post *models.PersistedPost) error {
	return repo.DB.DeleteStruct(post)
}

func (repo PostRepository) Update(post *models.PersistedPost) error {
	return repo.DB.Update(post)
}

func NewPostRepository() (*PostRepository, error) {
	db, err := database.NewConnection("post.db")
	if err != nil {
		return nil, err
	}

	repo := &PostRepository{
		DB: db,
	}
	return repo, err
}
