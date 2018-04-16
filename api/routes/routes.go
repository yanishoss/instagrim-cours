package routes

import (
	"../controllers"
	"../models"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func Route(e *echo.Echo) {
	e.Validator = models.NewValidator()

	e.Use(middleware.Logger())

	e.POST("/user/create", controllers.CreateUser)
	e.DELETE("/user/delete", controllers.DeleteUser, controllers.AuthenticateUser)
	e.POST("/profil/create", controllers.CreateProfil, controllers.AuthenticateUser)
	e.POST("/profil/update", controllers.UpdateProfil, controllers.AuthenticateUser)
	e.GET("/profil/id/:id", controllers.GetProfil)
	e.GET("/profil/username/:username", controllers.GetProfil)
	e.POST("/post/create", controllers.CreatePost, controllers.AuthenticateUser)
	e.GET("/post/id/:id", controllers.GetPost)
	e.POST("/authentication", controllers.Signin)
	e.GET("/protected", func(c echo.Context) error {
		return c.JSON(200, c.Get("user"))
	}, controllers.AuthenticateUser)
}
