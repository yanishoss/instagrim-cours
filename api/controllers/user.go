package controllers

import (
	"../models"
	"../repositories"
	"github.com/labstack/echo"
)

func CreateUser(c echo.Context) error {
	postedUser := new(models.User)
	err := c.Bind(postedUser)

	if err != nil {
		return c.JSON(422, BAD_REQUEST_BODY)
	}
	err = c.Validate(postedUser)

	if err != nil {
		return c.JSON(422, BAD_REQUEST_INFO)
	}

	repo, err := repositories.NewUserRepository()
	defer repo.Close()

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	persistedUser, err := models.NewPersistedUser(postedUser)

	if err != nil {
		return c.JSON(500, CANNOT_HASH_PASSWORD)
	}

	doesUserExist, err := repo.Exists(persistedUser)

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	if doesUserExist {
		return c.JSON(409, RESOURCE_ALREADY_EXISTS)
	}

	err = repo.Save(persistedUser)

	if err != nil {
		return c.JSON(500, CANNOT_PERSIST_RESOURCE)
	}

	return c.JSON(201, &struct {
		ID string `json:"id"`
	}{
		persistedUser.ID.String(),
	})
}

func DeleteUser(c echo.Context) error {
	repo, err := repositories.NewUserRepository()
	defer repo.Close()

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	user := c.Get("user").(*models.PersistedUser)
	err = repo.DB.Drop(user)
	if err != nil {
		return c.JSON(404, RESOURCE_DOES_NOT_EXISTS)
	}

	return c.JSON(204, RESOURCE_DELETED)
}
