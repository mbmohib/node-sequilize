const Sequelize = require('sequelize');

const db = new Sequelize('nodesequilize', 'mohib', '100200', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
});

const User = db.define(
  'User',
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        len: [3],
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    bio: Sequelize.TEXT,
    password: {
      type: Sequelize.STRING,
      validate: {
        len: [6],
        isAlphanumeric: true,
      },
    },
  },
  {
    timestamps: false,
    hooks: {
      afterValidate: () => {},
    },
  }
);

const Post = db.define(
  'Post',
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      validate: {
        len: [3],
      },
    },
    content: {
      type: Sequelize.TEXT,
    },
  },
  {
    hooks: {
      afterValidate: () => {},
    },
  }
);

Post.belongsTo(User);

db.sync({
  logging: console.log,
  // force: true,
})
  .then(() => {
    // User.create({
    //   name: 'Mohib',
    //   bio: 'A good guy',
    //   password: 'mb100200',
    //   email: 'mbmohib@gmail.com',
    // });
    // Post.create({
    //   title: 'A new post',
    //   content: 'Hello from Express',
    //   UserUuid: 'e8c0bfbb-446d-429e-a1a8-c100fcc9c333',
    // });
    Post.findAll({ include: [User] }).then(posts => console.log(posts));
  })
  .then(() => {
    console.log('Connection to database established successfully');
  })
  .catch(error => {
    console.log('Unable to connect to the database: ', error);
  });
