const router = require("express").Router();
const { sendEmail } = require('../utils_D/emailSender');

router.post("/sendNotification", async (req, res) => {
    try {
        const { orderDetails } = req.body;

        // Check if the order details are provided
        if (!orderDetails) {
            return res.status(400).json({ error: 'Order details are required' });
        }

        const { uEmail, colour, copies, slides, orientation, doubleSided, paperSize, otherOptions, documentID } = orderDetails;

        const emailMessage = `
            Hello, ${uEmail}
            Your printing order has been completed with the following details:
            
                Colour: ${colour}
                No of copies: ${copies}
                No of slides: ${slides}
                Orientation: ${orientation}
                Double/Single-Sided: ${doubleSided ? 'Double-Sided' : 'Single-Sided'}
                Paper Size: ${paperSize}
                Other Requirements: ${otherOptions}
                DocumentID: ${documentID}
 
            Thank you for using our service!
        `;

        await sendEmail(uEmail, 'Printing Order Completed', emailMessage);

        res.status(200).json({ message: `Notification sent to ${uEmail}` });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

module.exports = router;
