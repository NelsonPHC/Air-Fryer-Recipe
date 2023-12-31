# Air Fryer Recipe API Documentation
The Air Fryer Recipe allows users to create/read/update/delete air fryer recipes.

## Create a recipe
**Request Format:** /recipes endpoint with POST parameters of `name`, `description`, `temperature`, `timer`, and `flip`

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Given a valid `name`, `description`, `temperature`, `timer`, and `flip` to send, the server will reply with a simple JSON message response indicating the recipe and if it is being created.


**Example Request:** /recipes with POST parameters of `name=chicken wing`, `description=This recipe puts frozen chicken wing straight to the air fryer unthawed.`, `temperature=400`, `timer=18`, and `flip=yes`

**Example Response:**
```json
{
  "message": "Created recipe for chicken wing"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all JSON):
  - If missing the recipe name, temperature, timer, or flip, an error is returned with the message: `{ "message": "Recipe validation failed: name: Path ${variable_name} is required."}`
  - If the recipe for the name already exists, an error is returned with the message: `{ "message": "Recipe for ${name} already exist."}`
- Possible 500 errors (all JSON):
  - If something else goes wrong on the server, returns an error with the message: `{ "message": "Something went wrong. Please try again later."}`

## Search for a recipe
**Request Format:** /recipes/:name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid recipe name, it returns a JSON of the recipe information.

**Example Request:** /recipes/chicken wing

**Example Response:**
```json
{
  "name": "chicken wing",
  "description": "This recipe puts frozen chicken wing straight to the air fryer unthawed.",
  "temperature": 400,
  "timer": 18,
  "flip": "yes"
}

```

**Error Handling:**
- Possible 400 (invalid request) errors (all JSON):
  - If cannot find the recipe for the given name, an error is returned with the message: `{ "message": "Cannot find recipe for ${name}"}`
- Possible 500 errors (all JSON):`
  - If something else goes wrong on the server, returns an error with the message: `{ "message": "something went wrong on the server"}`

## Update a recipe
**Request Format:** /recipes endpoint with PATCH parameters of `name`, `description`, `temperature`, `timer`, and `flip`

**Request Type:** PATCH

**Returned Data Format**: JSON

**Description:** Given a valid `name`, `description`, `temperature`, `timer`, and `flip` to send, the server will reply with a simple JSON message response indicating the recipe and if it is being updated.


**Example Request:** /recipes/chicken wing with PATCH parameters `description=This recipe puts frozen chicken wings straight to the air fryer unthawed.`

**Example Response:**
```json
{
  "message": "Updated recipe for chicken wing"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all JSON):
  - If cannot find the recipe for the given name, an error is returned with the message: `{ "message": "Cannot find recipe for ${name}"}`
- Possible 500 errors (all JSON):
  - If something else goes wrong on the server, returns an error with the message: `{ "message": "Something went wrong. Please try again later."}`


## Delete a recipe
**Request Format:** /recipes/:name

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Deletes the recipe given a valid recipe name `name`, it returns a plain text indicating if the recipe is deleted.

**Example Request:** /recipes/chicken wing

**Example Response:**
```json
{
  "message": "Deleted recipe for chicken wing"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors:
  - If cannot find the recipe for the given name, an error is returned with the message: `{ "message": "Cannot find recipe for ${name}"}`
- Possible 500 errors (all JSON):
  - If something else goes wrong on the server, returns an error with the message: `{ "message": "Something went wrong. Please try again later."}`