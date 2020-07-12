# Posts Service

Install & run it:

```bash
$ yarn
$ yarn start
```

The server will start listening on port 4000.
It will expose an API with 2 endpoints:

- `get /posts`
- `post /posts`

To test it:

```bash
# get
$ curl -i -XGET 'http://localhost:4000/posts'
{}
```

````bash
# post
$ curl -i -XPOST -H "Content-type: application/json" -d '{ "title": "Lorem ipsum" }' 'http://localhost:4000/posts'
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-e9XJPZ87cTTdPEWde8hzdkhQU3M"
Date: Fri, 10 Jul 2020 14:41:17 GMT
Connection: keep-alive

{"id":"a0a82687","title":"Lorem ipsum"}```
````
