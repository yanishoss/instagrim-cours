package models

import "github.com/go-playground/validator"

type CustomValidator struct {
	validator *validator.Validate
}

func (val CustomValidator) Validate(v interface{}) error {
	return val.validator.Struct(v)
}

func NewValidator() *CustomValidator {
	return &CustomValidator{
		validator: validator.New(),
	}
}
