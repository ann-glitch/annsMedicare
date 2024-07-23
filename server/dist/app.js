"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const error_1 = __importDefault(require("./middleware/error"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const hpp_1 = __importDefault(require("hpp"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//route files
const patients_1 = __importDefault(require("./routes/patients"));
const auth_1 = __importDefault(require("./routes/auth"));
const consultations_1 = __importDefault(require("./routes/consultations"));
// body-parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//load env vars
dotenv_1.default.config();
//mongodb connection
(0, db_1.default)();
//set mongo sanitize
app.use((0, express_mongo_sanitize_1.default)());
// set security policy
app.use((0, helmet_1.default)());
// rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
});
app.use(limiter);
// prevent http param pollution
app.use((0, hpp_1.default)());
//cookie-parser
app.use((0, cookie_parser_1.default)());
const corsConfig = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsConfig));
//cookie-parser
app.use((0, cookie_parser_1.default)());
//dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.get("/", (req, res) => {
    res.send("AnnsMedicare API is up and running....");
});
//mount routers
app.use("/api/v1/patients", patients_1.default);
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/consultation", consultations_1.default);
//error handler middleware
app.use(error_1.default);
const server = app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`MongoServerError: ${err.message}`);
    //close server and exit process
    server.close(() => {
        process.exit(1);
    });
});
exports.default = app;
