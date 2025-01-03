"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = require("./infrastructure/database/DatabaseConnection");
async function bootstrap() {
    try {
        await DatabaseConnection_1.DatabaseConnection.initialize();
    }
    catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map