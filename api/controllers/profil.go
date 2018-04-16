package controllers

import (
	"fmt"

	"../models"
	"../repositories"
	"github.com/labstack/echo"
)

func CreateProfil(c echo.Context) error {
	repo, err := repositories.NewProfilRepository()
	defer repo.Close()

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	postedProfil := &models.Profil{}

	if err = c.Bind(postedProfil); err != nil {
		return c.JSON(422, BAD_REQUEST_BODY)
	}

	postedProfil.Username = c.Get("user").(*models.PersistedUser).Username

	if err = c.Validate(postedProfil); err != nil {
		fmt.Println(err)
		return c.JSON(409, BAD_REQUEST_INFO)
	}

	persistedProfil := models.NewPersistedProfil(postedProfil)
	persistedProfil.UserID = c.Get("user").(*models.PersistedUser).ID
	postedProfil.ID = persistedProfil.ID
	if err = repo.Save(persistedProfil); err != nil {
		return c.JSON(409, RESOURCE_ALREADY_EXISTS)
	}

	return c.JSON(201, postedProfil)
}

func UpdateProfil(c echo.Context) error {
	repo, err := repositories.NewProfilRepository()
	defer repo.Close()

	if err != nil {
		return c.JSON(500, INTERNAL_ERROR)
	}

	postedProfil := &models.Profil{}

	if err = c.Bind(postedProfil); err != nil {
		return c.JSON(422, BAD_REQUEST_BODY)
	}

	if err = c.Validate(postedProfil); err != nil {
		fmt.Println(err)
		return c.JSON(409, BAD_REQUEST_INFO)
	}

	persistedProfil, err := repo.FindOneByUserId(c.Get("user").(*models.PersistedUser).ID.String())

	if err != nil {
		return c.JSON(404, RESOURCE_DOES_NOT_EXISTS)
	}

	persistedProfil = UpdateFields(postedProfil, persistedProfil)

	if err = repo.Update(persistedProfil); err != nil {
		return c.JSON(409, RESOURCE_ALREADY_EXISTS)
	}

	postedProfil.ID = persistedProfil.ID
	postedProfil.Username = persistedProfil.Username

	return c.JSON(201, postedProfil)
}

func GetProfil(c echo.Context) error {
	repo, err := repositories.NewProfilRepository()
	defer repo.Close()

	profilId := c.Param("id")
	profil := &models.PersistedProfil{}

	if profilId == "" {
		profilUsername := c.Param("username")
		profil, err = repo.FindOneByUsername(profilUsername)
	} else {
		profil, err = repo.FindOneById(profilId)
	}

	if err != nil {
		return c.JSON(404, RESOURCE_DOES_NOT_EXISTS)
	}

	returnedProfil := &models.Profil{}
	returnedProfil.ID = profil.ID
	returnedProfil.Avatar = profil.Avatar
	returnedProfil.Name = profil.Name
	returnedProfil.Username = profil.Username
	returnedProfil.Bio = profil.Bio

	return c.JSON(200, returnedProfil)
}

func UpdateFields(profil *models.Profil, persistedProfil *models.PersistedProfil) *models.PersistedProfil {
	if profil.Bio != persistedProfil.Bio {
		persistedProfil.Bio = profil.Bio
	}
	if profil.Name != persistedProfil.Name {
		persistedProfil.Name = profil.Name
	}
	if profil.Avatar != persistedProfil.Avatar {
		persistedProfil.Avatar = profil.Avatar
	}
	return persistedProfil
}
