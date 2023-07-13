const express = require('express'); 
const expressApp = require('./express-app');

const StartServer = async() => {
    var PORT =  8000;
    const app = express();
     
    await expressApp(app);

    app.listen(PORT, () => { 
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();