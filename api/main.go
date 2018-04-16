package main

import (
	"./server"
)

func main() {
	err := server.Start()

	if err != nil {
		panic(err)
	}
}
