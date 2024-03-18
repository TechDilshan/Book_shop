const User = require('./model');

const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const addUser = (req, res, next) => {
    const { id, name, imgId, price, sdes, des, item, stock } = req.body;

    const user = new User({
        id: id,
        name: name,
        imgId: imgId,
        price: price,
        sdes: sdes,
        des: des,
        item: item,
        stock: stock,
    });

    user.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


const updateUser = (req, res, next) => {
    const { id, name, imgId, price, sdes, des, item, stock } = req.body;
    
    User.updateOne({ id: id }, { $set: { name: name, imgId: imgId, price: price, sdes: sdes, des: des, item:item, stock:stock } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const deleteUser = (req, res, next) => {
    const id = req.body.id;
    User.deleteOne({id: id})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const getMaxId = (req, res, next) => {
    User.find({}, { id: 1 }).sort({ id: -1 }).limit(1)
      .then(response => {
        const maxId = response.length > 0 ? response[0].id : 0;
        res.json({ maxId }); 
      })
      .catch(error => {
        res.json({ error });
      });
  };
  



exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getMaxId = getMaxId;