
# To-Do List

User can add, update, remove or complete to-do items.

## Getting Started

### Prerequisites

* Docker

### Installing
* (Windows only) Add "127.0.0.1 todolist" to hosts file under c:\Windows\System32\Drivers\etc\hosts, and change axios.defaults.baseURL inside file todolist.component.js to use http://todolist:8000.
* Start the container:
```
docker-compose up
```
* SSH into server container to sync db:
```
docker exec -i -t todolist_server_1 bash
// inside container
cd todolist.core
python manage.py migrate
```
* Open http://todolist:8001

## Running the tests

### Tests on Django

SSH into todolist_server_1 container and run the test

```
docker exec -i -t todolist_server_1 bash
// inside container
cd todolist.core
./manage.py test tests/
```