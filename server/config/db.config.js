module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root", // replace with your MySQL password
    DB: "Internage",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
