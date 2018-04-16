package controllers

import (
	"../config"
	"../repositories"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func AuthenticateUser(next echo.HandlerFunc) echo.HandlerFunc {
	return middleware.JWTWithConfig(config.JWT_CONFIG)(func(c echo.Context) error {

		token := c.Get("user").(*jwt.Token)
		claims := token.Claims.(jwt.MapClaims)
		repo, err := repositories.NewUserRepository()
		defer repo.Close()
		if err != nil {
			return c.JSON(500, INTERNAL_ERROR)
		}
		user, err := repo.FindOneById(claims["id"].(string))
		if err != nil {
			return c.JSON(403, BAD_CREDENTIALS)
		}
		c.Set("user", user)
		return next(c)
	})
}
