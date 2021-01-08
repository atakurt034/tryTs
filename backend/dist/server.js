"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("colors");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const middleWares_1 = require("./utils/middleWares");
const projectsRoutes_1 = __importDefault(require("./routes/projectsRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const app = express_1.default();
dotenv_1.default.config();
db_1.default();
const PORT = process.env.PORT;
const NODE = process.env.NODE_ENV;
app.use(express_1.default.json());
if (NODE === 'development') {
    app.use(morgan_1.default('dev'));
}
if (NODE === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/projects', projectsRoutes_1.default);
app.use('/api/contacts', contactRoutes_1.default);
app.use(middleWares_1.errorHandler);
app.use(middleWares_1.notFound);
app.listen(PORT, function () {
    console.log(`Server running at port ${PORT} in ${NODE} mode`.yellow.bold);
});
//# sourceMappingURL=server.js.map