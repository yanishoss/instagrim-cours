package database

import (
	"github.com/asdine/storm"
)

func NewConnection(name string) (*storm.DB, error) {
	return storm.Open(name, storm.Batch())
}
