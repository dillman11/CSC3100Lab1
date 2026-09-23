// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";


const app = express();
const port = 8000;

<<<<<<< HEAD
=======
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);


>>>>>>> 067b6c33cc3e030478262b47fa1f7fc89bd92d29
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//GET Query
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices.getUsers(name, job)
    .then((result) => res.send({ users_list: result}))
    .catch((err) => res.status(500).send("Error: " + err));
});


//Get ID
app.get("/users/:id", (req, res) => {
    userServices.findUserById(req.params.id)
    .then((result) => {
      if (result == null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((err) => res.status(500).send("Error: " + err));
})

<<<<<<< HEAD
app.post("/users", (req, res) => {
    userServices.addUser(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send("Error: " + err));
})

app.delete("/users/:id", (req, res) => {
  userServices.deleteUser(req.params.id)
  .then((result) => {
    if (result == null) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  .catch((err) => res.status(500).send("Error: " + err));
=======

//Add user in backend
const generateId = () => Math.random().toString(36).slice(2, 8);

const addUser = (user) => {
    const newUser = { id : generateId(), ...user }
    users["users_list"].push(newUser);
    return newUser;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
})


//Delete a user in backend
const deleteUserById = (id) => {
    const origLength = users["users_list"].length
    const newUsers = users["users_list"].filter((user) => {
        return user["id"] !== id;
    })
    users["users_list"] = newUsers;
    return origLength !== users["users_list"].length;
}

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = deleteUserById(id);
    if (deleted) {
      res.status(200).send();
    } else {
      res.status(404).send("Resource not found");
    }

>>>>>>> 067b6c33cc3e030478262b47fa1f7fc89bd92d29
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});