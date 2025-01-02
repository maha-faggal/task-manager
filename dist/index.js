"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./infrastructure/database/database");
async function bootstrap() {
    try {
        const orm = await (0, database_1.initializeDatabase)();
        console.log("Connected to database");
    }
    catch (err) {
        console.error("Failed to connect to database", err);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map