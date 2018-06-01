## Review Questions

#### What is Node.js?

 Node.js is a JS run-time environment, which means it includes everything you need to run a JS application. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. It uses npm, which is the largest package manager currently in use.

#### What is Express?

Express is a minimalist web framework for Node.js that is easily customizable with local or third-party middleware. It basically manages Node, making it easier to implement application backends quickly.

#### Mention two parts of Express that you learned about this week.

Express uses middelware to accomplish specific tasks, and it also uses routes and the request & response objects to implement application backend endpoints for an API.

#### What is Middleware?

Middleware, both local and global, adds specific functionality to the Node.js file.

#### What is a Resource?

A Resource is the full url of an API request.

#### What can the API return to help clients know if a request was successful?

An HTTP status code of 200, and/or a json status message of `success`.

#### How can we partition our application into sub-applications?

One can use Express router to divide the parts of the application.

#### What is CORS and why do we need it?

CORS allows the development of an API with a front-end framework such as React, by adding the necessary HTTP Headers.