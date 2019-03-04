---
title: Booking App API

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - javascript

toc_footers:
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

# Appends different files from the includes/ dir
includes:
  - errors

search: true
---

# Introduction

Welcome to the booking app API. Since we hack together a lot of stuff we thought it best to create a nice doc.

# Employee

## Get a specific employee

Will return Employee objects. Returns a list of employee objects for
each organization the employee is employed.

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/employees?empId=foobar"
  -H "Content-Type: application/json"
```

```javascript
// todo
```

> Returns an employee in a list matching the empId, otherwise empty

```json
[
  {
    "empId": "1234",
    "orgId": "5678",
    "status": "fired ruthlessly"
  }
]
```

## Get all employees (person) of an org

Gets all employees of a specified organization.

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/employees/org?orgId=youtellme"
  -H "Content-Type: application/json"
```

```javascript
// todo
```

> Returns employees as a person object in a list matching the empId, otherwise empty

```json
[
  {
    "pId": "1234",
    "email": "horton@hearsawho.com",
    "username": "timmyb24df",
    "fname": "Horton",
    "lname": "Whoville"
  },
  {
    "pId": "1436",
    "email": "susieQ@hearsawho.com",
    "username": "jimmybuffetlover69",
    "fname": "Susie",
    "lname": "Que"
  }
]
```

## Save employees

Takes a list of employees, saves them.

> I would highly recommend placing your test requests in a file, this doc will use test.json

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/employees"
  -H "Content-Type: application/json" -d test.json
```

```javascript
// todo
```

# Kittens

## Get All Kittens

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require("kittn");

let api = kittn.authorize("meowmeowmeow");
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Max",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/api/kittens`

### Query Parameters

| Parameter    | Default | Description                                                                      |
| ------------ | ------- | -------------------------------------------------------------------------------- |
| include_cats | false   | If set to true, the result will also include cats.                               |
| available    | true    | If set to false, the result will include kittens that have already been adopted. |

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require("kittn");

let api = kittn.authorize("meowmeowmeow");
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

| Parameter | Description                      |
| --------- | -------------------------------- |
| ID        | The ID of the kitten to retrieve |

## Delete a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.delete(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -X DELETE
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require("kittn");

let api = kittn.authorize("meowmeowmeow");
let max = api.kittens.delete(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "deleted": ":("
}
```

This endpoint deletes a specific kitten.

### HTTP Request

`DELETE http://example.com/kittens/<ID>`

### URL Parameters

| Parameter | Description                    |
| --------- | ------------------------------ |
| ID        | The ID of the kitten to delete |
