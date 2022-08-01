const connectDB = require("./../database/config");
const { isEmpty } = require("lodash");

const TABLE_NAME = "users";

class UserModel {
  constructor() {}

  find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
      // const sql = 'CALL TK_FIND_USER(?)';
      try {
        connectDB.query(sql, [id], (err, results) => {
          if (isEmpty(results)) {
            resolve({ results: false });
          } else {
            // console.log(results[0]);
            resolve({ results });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${TABLE_NAME} WHERE email = ? AND password = ? `;
      const values = [email, password];
      try {
        connectDB.query(sql, values, (err, results) => {
          resolve({ results });
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  loginAdmin(email, password) {
    return new Promise((resolve, reject) => {
      const sql = "CALL LOGIN_ADMIN(?, ?)";
      const values = [email, password];
      try {
        connectDB.query(sql, values, (err, results) => {
          if (err === null) {
            resolve({ data: results[0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  create(user) {
    return new Promise((resolve, reject) => {
      const sql = "CALL REGISTER_USER(?, ?, ?, ?, ?, ?, ?, ?, ?);";
      let permission = 0;
      let status = 1;
      const values = [
        user.name,
        user.email,
        user.password,
        user.image ? user.image : null,
        user.phone ? user.phone : null,
        user.birtday ? user.birtday : null,
        user.address ? user.address : null,
        permission,
        status,
      ];

      try {
        connectDB.query(sql, values, (err, res) => {
          if (err === null) {
            resolve({ results: res[0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  updateInfo(user) {
    return new Promise((resolve, reject) => {
      const sql = "CALL UPDATE_USER(?, ?, ?, ?, ?);";
      const values = [
        user.name,
        user.phone,
        user.birtday,
        user.address,
        user.id,
      ];
      try {
        connectDB.query(sql, values, (err, res) => {
          if (err === null) {
            resolve({ results: res[0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  updateAvatar(id, image) {
    return new Promise((resolve, reject) => {
      const sql = "CALL UPDATE_AVATAR_USER(?, ?);";
      const values = [image, id];
      try {
        connectDB.query(sql, values, (err, res) => {
          if (err === null) {
            resolve({ results: res[0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  updatePassword(email, password) {
    return new Promise((resolve, reject) => {
      const sql = "CALL UPDATE_PASSWORD_USER(?, ?);";
      const values = [password, email];
      try {
        connectDB.query(sql, values, (err, res) => {
          if (err === null) {
            resolve({ data: res[0][0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  }

  getAllUserBy = (permission) => {
    return new Promise((resolve, reject) => {
      const sql = "CALL GET_ALL_USER_BY(?)";
      const values = [permission];
      try {
        connectDB.query(sql, values, (err, res) => {
          if (err === null) {
            resolve({ data: res[0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  };

  updateInfoUserAdmin = ({ id, email, password, status, per }) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "CALL UPDATE_INFO_USER_ADMIN(?, ?, ?, ?, ?);";
        const values = [id, email, password, status, per];
        connectDB.query(sql, values, (err, res) => {
          if (err === null) {
            resolve({ data: res[0] });
          } else {
            reject({ error: err });
          }
        });
      } catch (error) {
        reject({ error });
      }
    });
  };
}

module.exports = new UserModel();
