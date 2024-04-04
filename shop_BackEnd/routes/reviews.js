const router = require('express').Router();
let Feedback = require('../models/feedback');

//create

router.route('/addreview').post((req, res) => {                           

    const email = req.body.email;
    const name = req.body.name;
    const rating = Number(req.body.rating);
    const comment = req.body.comment;

    const newFeedback = new Feedback({

        email,
        name,
        rating,
        comment

    });

    newFeedback.save()
        .then(() => res.json('Feedback added!'))
        .catch(err => console.log(err));

});


//read

router.route('/getreview').get((req, res) => { 
    Feedback.find()
        .then(feedback => res.json(feedback))
        .catch(err => console.log(err));
});


//update

router.route('/updatereview/:id').put(async(req, res) => {

    let userid = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    const rating = Number(req.body.rating);

    const updateFeedback = {
        email,
        name,
        comment,
        rating

    };

    const update = await Feedback.findByIdAndUpdate(userid, updateFeedback)
    .then(() => {

        res.status(200).send({ status: "Feedback updated" });

    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });

    });

});


//delete

router.route('/deletereview/:id').delete(async(req, res) => {
    
    let userid = req.params.id;
    
    await Feedback.findByIdAndDelete(userid)
    .then(() => {
    
        res.status(200).send({ status: "Feedback deleted" });
    
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete feedback", error: err.message });
    
    });
    
});

// router.route('/product/:productId').get((req, res) => {
//     const productId = req.params.productId;
//     Feedback.find({ productId })
//         .then(feedback => {
//             if (feedback.length === 0) {
//                 res.json({ message: 'No reviews' });
//             } else {
//                 res.json(feedback);
//             }
//         })
//         .catch(err => console.log(err));
// });

module.exports = router;