package controllers

import (
	"../models"
)

var (
	BAD_REQUEST_BODY = &models.Status{
		Code:    "BAD_REQUEST_BODY",
		Message: "The body of your request cannot be parsed.",
	}
	BAD_REQUEST_INFO = &models.Status{
		Code:    "BAD_REQUEST_INFO",
		Message: "The informations provided are bad.",
	}
	BAD_CREDENTIALS = &models.Status{
		Code:    "BAD_CREDENTIALS",
		Message: "The credentials provided are wrong.",
	}
	INTERNAL_ERROR = &models.Status{
		Code:    "INTERNAL_ERROR",
		Message: "Just an internal error, retry later.",
	}
	CANNOT_HASH_PASSWORD = &models.Status{
		Code:    "CANNOT_HASH_PASSWORD",
		Message: "We cannot hash the password provided, therefore we cannot persist it.",
	}
	CANNOT_PERSIST_RESOURCE = &models.Status{
		Code:    "CANNOT_PERSIST_RESOURCE",
		Message: "We cannot persist the resource you sent us.",
	}
	RESOURCE_ALREADY_EXISTS = &models.Status{
		Code:    "RESOURCE_ALREADY_EXISTS",
		Message: "The resource provided already exists.",
	}
	RESOURCE_DOES_NOT_EXISTS = &models.Status{
		Code:    "RESOURCE_DOES_NOT_EXISTS",
		Message: "The resource provided doesn't exist at all.",
	}
	RESOURCE_DELETED = &models.Status{
		Code:    "RESOURCE_DELETED",
		Message: "The resource was sucessfully deleted.",
	}
)
