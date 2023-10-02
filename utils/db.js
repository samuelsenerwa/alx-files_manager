import MongoClient, { MongoClient } from "mongodb/lib/mongo_client";

const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 27017;
const DATABSE = process.env.DB_DATABASE || "files_manager";
const url = `mongodb://${HOST}:${PORT}`;

// class DBClient containing a constructor

class DBClient {
  constructor() {
    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(`${DATABASE}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   check if the connection to the MongoClient is successful

  isAlive() {
    return this.client.isConnected();
  }

  //   an asynchronous function nbUsers that returns the number of documents in the collection users

  async nbUsers() {
    const users = this.db.collection("users");
    const usersNum = await users.countDocuments();
    return usersNum;
  }

  //   an asynchronous function nbFiles that returns the number of documents in the collection files
  async nbFiles() {
    const files = this.db.collection("files");
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;