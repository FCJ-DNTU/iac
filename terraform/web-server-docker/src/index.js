const http = require("http");
const express = require("express");
const cors = require("cors");

// Import utils
const Utils = require("./utils");

// Import data
const Data = require("./db.json");

const app = express();
const server = http.createServer(app);

// Add global middleware
app.use(cors({
  origin: "*"
}));

// Create router
const router = express.Router();

// Create some APIs
app.get("/", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    o.data = "Welcome to my app";
    return o;
  });
});

// Get users
app.get("/users", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { name, username, email, company } = req.query;

    const nameRegExp = new RegExp(name, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(name || username || email || company);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (name && nameRegExp.test(Data.users[i].name)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (username && Data.users[i].username === username) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (email && Data.users[i].email === email) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (company && Data.users[i].company.name === company) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.users.length) {
          N += 1;
        }
      } else if(Data.users[i])
        result.push(Data.users[i]);
    }

    o.data = result;
    o.success.message = "Query users successfully";

    return o;
  });
});

// Get user
app.get("/users/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.params;

    o.data = Data.users.find(user => user.id == id);
    o.success.message = "Query user successfully";

    return o;
  });
});

// Get albums
app.get("/albums", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { title } = req.query;

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.albums[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.albums.length) {
          N += 1;
        }
      }
    }

    o.data = result;
    o.success.message = "Query albums successfully";

    return o;
  });
});

// Get album
app.get("/albums/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.query;

    o.data = Data.albums.find(album => album.id == id);
    o.success.message = "Query album successfully";

    return o;
  });
});

// Get posts
app.get("/posts", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { title } = req.query;

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.posts[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.posts.length) {
          N += 1;
        }
      }
    }

    o.data = result;
    o.success.message = "Query posts successfully";

    return o;
  });
});

// Get post
app.get("/posts/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.query;

    o.data = Data.posts.find(post => post.id == id);
    o.success.message = "Query post successfully";

    return o;
  });
});

// Get comments
app.get("/comments", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { title } = req.query;

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.comments[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.comments.length) {
          N += 1;
        }
      }
    }

    o.data = result;
    o.success.message = "Query comments successfully";

    return o;
  });
});

// Get comment
app.get("/comments/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.query;

    o.data = Data.comments.find(comment => comment.id == id);
    o.success.message = "Query comment successfully";

    return o;
  });
});

// Get photos
app.get("/photos", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { title } = req.query;

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.photos[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.photos.length) {
          N += 1;
        }
      }
    }

    o.data = result;
    o.success.message = "Query photos successfully";

    return o;
  });
});

// Get photo
app.get("/photos/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.query;

    o.data = Data.photos.find(photo => photo.id == id);
    o.success.message = "Query photo successfully";

    return o;
  });
});

// Get todos
app.get("/todos", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { title } = req.query;

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.todos[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.todos.length) {
          N += 1;
        }
      } else
        Data.users[i] && result.push(Data.users[i]);
    }

    o.data = result;
    o.success.message = "Query todos successfully";

    return o;
  });
});

// Get todo
app.get("/todos/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.query;

    o.data = Data.todos.find(todo => todo.id == id);
    o.success.message = "Query todo successfully";

    return o;
  });
});

// Apply router
app.use(router);

// Start server
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";
server.listen(PORT, HOST, function() {
  console.log(`Your server is listening on http://localhost:${PORT}`);
});