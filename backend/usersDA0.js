let users;

export default class userDAO {
  static async injectDB(connection) {
    if (users) {
      return;
    }
    try {
      users = await connection.db(process.env.TUDER_DB_URL).collection("users");
    } catch (e) {
      console.error(`unable to connect in userDAO: ${e}`);
    }
  }

  static async getUsers({
    // filter is in the form
    /*
        *  
        filter{
            key : value
            key : value
        }
        */
    filters = null,
  } = {}) {
    let query;
    if (filters) {
      if ("user" in filters) {
        // equivalent to SELECT * FROM users WHERE users.name = filters['title']
        query = { user: { $eq: filters["user"] } };
      }
      // key = subject, value = array of subjects (strings)
      else if ("subjects" in filters) {
        query = { subjects: { $elemMatch: filters["subjects"] } };
      }
    }
    let cursor;
    try {
      cursor = await users.find(query);

      const usersList = await cursor.toArray();
      const totalNumUsers = await users.countDocuments(query);
      return { usersList, totalNumUsers };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { usersList: [], totalNumUsers: 0 };
    }
  }
}