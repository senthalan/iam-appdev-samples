package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Person struct {
	Name    string `json: "name"`
	Role    string `json: "role"`
	Address string `json: "address"`
	Email   string `json: "email"`
}

var people = []Person{
	{Name: "John", Role: "customer", Address: "123 Main St", Email: "john@gmail.com"},
	{Name: "Jane", Role: "admin", Address: "123 Main St", Email: "jane@gmail.com"},
	{Name: "Bob", Role: "customer", Address: "123 Main St", Email: "bob@gmail.com"},
	{Name: "Mary", Role: "admin", Address: "123 Main St", Email: "mary@gmail.com"},
}

func AllCustomers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint hit: returnAllCustomers")
	customers := []Person{}
	for _, person := range people {
		if person.Role == "customer" {
			customers = append(customers, person)
		}
	}
	json.NewEncoder(w).Encode(customers)
}

func AllPersons(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint hit: returnAllPersons")
	json.NewEncoder(w).Encode(people)
}

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/people", AllPersons)
	router.HandleFunc("/customers", AllCustomers)
	log.Fatal(http.ListenAndServe(":10000", router))
}
