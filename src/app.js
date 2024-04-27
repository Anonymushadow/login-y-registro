const express = require('express');
const dotenv = require("dotenv");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const homeController = require("./routes/home.routes");
const profileController = require("./routes/profile.routes");
const administrationController = require("./routes/admin.routes");
const profesorController = require("./routes/profesor.routes");
const logController = require("./routes/log.routes");

dotenv.config({ path: "../.env" });
const app = express();

//Configuraciones
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// Rutas
app.use(homeController); 
app.use(profileController); 
app.use(administrationController); 
app.use(profesorController); 
app.use(logController); 

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
