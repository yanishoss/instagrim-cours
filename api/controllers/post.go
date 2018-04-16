package controllers

import (
	"../models"
	"../repositories"
	"github.com/google/uuid"
	"github.com/labstack/echo"
)

func CreatePost(c echo.Context) error {
	repo, err := repositories.NewPostRepository()
	defer repo.Close()

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	postedPost := &models.PersistedPost{}

	if err = c.Bind(postedPost); err != nil {
		return c.JSON(422, BAD_REQUEST_BODY)
	}

	if err = c.Validate(postedPost); err != nil {
		return c.JSON(409, BAD_REQUEST_INFO)
	}
	profilId, err := GetProfilFromUser(c.Get("user").(*models.PersistedUser))
	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}
	postedPost.ProfilID = profilId.ID
	postedPost.ID = uuid.New()
	if err = repo.Save(postedPost); err != nil {
		return c.JSON(409, RESOURCE_ALREADY_EXISTS)
	}

	return c.JSON(201, postedPost)
}

func GetPost(c echo.Context) error {
	repo, err := repositories.NewPostRepository()
	defer repo.Close()

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	postId := c.Param("id")
	post, err := repo.FindOneById(postId)

	if err != nil {
		return c.JSON(404, RESOURCE_DOES_NOT_EXISTS)
	}

	return c.JSON(200, post)
}

func GetProfilFromUser(user *models.PersistedUser) (*models.PersistedProfil, error) {
	repo, err := repositories.NewProfilRepository()
	if err != nil {
		return nil, err
	}
	profil, err := repo.FindOneByUserId(user.ID.String())
	return profil, err
}
