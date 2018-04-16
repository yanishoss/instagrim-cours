package server

import (
	"os"

	"../routes"
	"github.com/labstack/echo"
)

var PORT = func() string {
	if os.Getenv("PORT") != "" {
		return ":" + os.Getenv("PORT")
	} else {
		return ":443"
	}
}()

func Start() error {
	e := echo.New()

	routes.Route(e)

	if os.Getenv("ENV") == "production" {
		return e.StartAutoTLS(PORT)
	} else {
		return e.Start(":3001")
	}

	return nil
}
