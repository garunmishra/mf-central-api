const EncryptionService = require('../../services/encryption-service');

module.exports = (app) => {
    
    const service = new EncryptionService();

    app.post('/send-otp', async (req,res,next) => {
        try {
            const { payload } = req.body;
            const  data = await service.encrypt({ payload}); 
           return res.json(data);
            
        } catch (err) {
            return res.json({code: 500, err: err.toString()});
        }

    });

    app.post('/compare-otp', async (req,res,next) => {
        try {
            const { payload } = req.body;
            const  data = await service.compareOtp({ payload}); 
           return res.json(data);
            
        } catch (err) {
            return res.json({code: 500, err: err.toString()});
        }

    });

    app.post('/data', async (req,res,next) => {
        try {
            const { payload } = req.body;
            const  data = await service.getData({ payload}); 
            return res.json(data);
        } catch (err) {
            return res.json({code: 500, err: err.toString()});
        }

    });



}