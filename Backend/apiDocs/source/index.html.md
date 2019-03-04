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

### HTTP Request

`GET http://cs309-pp-7.misc.iastate.edu:8080/employees?eId=<ID>`

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

### HTTP Request

`GET http://cs309-pp-7.misc.iastate.edu:8080/employees/org?orgId=<ID>`

## Save employees

Takes a list of employees, saves them.

> I would highly recommend placing your test requests in a file, this doc will use test.json, windows parses escape characters wierdly

> Example request json

```json
[
  {
    "empId": "123",
    "orgId": "9494",
    "status": "nothing lol"
  },
  {
    "empId": "123",
    "orgId": "73629",
    "status": "nothing lol"
  }
]
```

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/employees"
  -H "Content-Type: application/json" -d test.json
```

```javascript
// todo
```

> The response will return the list of employees entered

> Example response json

```json
[
  {
    "empId": "123",
    "orgId": "9494",
    "status": "nothing lol"
  },
  {
    "empId": "123",
    "orgId": "73629",
    "status": "nothing lol"
  }
]
```

### HTTP Request

`POST http://cs309-pp-7.misc.iastate.edu:8080/employees`

# Person

## Get a person

Getting a speceified person by their ID.

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/person?pid=guccimane"
  -H "Content-Type: application/json"
```

```javascript
// todo
```

> The response will be a single person found, or nothing

```json
{
  "pId": "1436",
  "email": "susieQ@hearsawho.com",
  "username": "jimmybuffetlover69",
  "fname": "Susie",
  "lname": "Que"
}
```

### HTTP Request

`GET http://cs309-pp-7.misc.iastate.edu:8080/person?pid=<ID>`

## Save a person

Only God can do that. Jk here's an example lol.

> Example request (test.json)

```json
{
  "pId": "1436",
  "email": "susieQ@hearsawho.com",
  "username": "jimmybuffetlover69",
  "fname": "Susie",
  "lname": "Que"
}
```

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/person"
  -H "Content-Type: application/json" -d test.json
```

```javascript
// todo
```

> The response will be the person

```json
{
  "pId": "1436",
  "email": "susieQ@hearsawho.com",
  "username": "jimmybuffetlover69",
  "fname": "Susie",
  "lname": "Que"
}
```

### HTTP Request

`POST http://cs309-pp-7.misc.iastate.edu:8080/person`

# Organization

## Get an org

Get an org based on its orgId.

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/org?orgId=fugazzi"
  -H "Content-Type: application/json"
```

```javascript
// todo
```

> Returns an org if found, or nothing

```json
{
  "orgId": "temptMe420",
  "serviceType": "You know ;)",
  "address": "Your place",
  "description": "Its illegal so no cops",
  "adminId": "foo-bar-baz-pimp"
}
```

### HTTP Request

`GET http://cs309-pp-7.misc.iastate.edu:8080/org?orgId=<ID>`

## Save an org

Save an org.

> Example request body (test.json)

```json
{
  "orgId": "temptMe420",
  "serviceType": "You know ;)",
  "address": "Your place",
  "description": "Its illegal so no cops",
  "adminId": "foo-bar-baz-pimp"
}
```

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/org"
  -H "Content-Type: application/json" -d test.json
```

```javascript
// todo
```

> Returns the saved org

```json
{
  "orgId": "temptMe420",
  "serviceType": "You know ;)",
  "address": "Your place",
  "description": "Its illegal so no cops",
  "adminId": "foo-bar-baz-pimp"
}
```

### HTTP Request

`POST http://cs309-pp-7.misc.iastate.edu:8080/org`

## Get all orgs for admin

Given an adminId get all orgs connected to it.

```shell
# With shell, you can just pass the correct header with each request
curl "http://cs309-pp-7.misc.iastate.edu:8080/org/admin?adminId=snoopD0gg"
  -H "Content-Type: application/json"
```

```javascript
// todo
```

> Returns an array of all associated orgs, or empty

```json
[
  {
    "orgId": "temptMe420",
    "serviceType": "You know ;)",
    "address": "Your place",
    "description": "Its illegal so no cops",
    "adminId": "foo-bar-baz-pimp"
  }
]
```

### HTTP Request

`GET http://cs309-pp-7.misc.iastate.edu:8080/org/admin?adminId=<ID>`
