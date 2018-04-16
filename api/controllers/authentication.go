package controllers

import (
	"fmt"
	"time"

	"../config"
	"../models"
	"../repositories"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

type Token struct {
	Token string `json:"token"`
}

func Signin(c echo.Context) error {
	repo, err := repositories.NewUserRepository()
	defer repo.Close()

	if err != nil {
		fmt.Println("1")
		return c.JSON(500, INTERNAL_ERROR)
	}

	user := new(models.User)

	if err = c.Bind(user); err != nil {
		return c.JSON(409, BAD_REQUEST_BODY)
	}

	if user.Email != "" && user.Password != "" {
		dbUser, err := repo.FindOneByEmail(user.Email)

		if err != nil {
			return c.JSON(404, INTERNAL_ERROR)
		}

		passwordsMatch := dbUser.CheckIfPasswordMatch(user.Password)

		if passwordsMatch {
			token, err := CreateToken(dbUser)

			if err != nil {
				fmt.Println("2")
				return c.JSON(500, INTERNAL_ERROR)
			}

			return c.JSON(200, &Token{
				token,
			})
		}

	}

	return c.JSON(409, BAD_REQUEST_INFO)
}

func CreateToken(user *models.PersistedUser) (string, error) {
	claims := make(jwt.MapClaims)
	claims["id"] = user.ID
	claims["email"] = user.Email
	claims["username"] = user.Username
	claims["exp"] = time.Now().Add(config.JWT_TOKEN_EXP).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	encodedToken, err := token.SignedString([]byte(config.SECRET_KEY))
	if err != nil {
		return encodedToken, err
	}
	return encodedToken, err
}
