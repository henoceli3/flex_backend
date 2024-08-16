"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const server_port = process.env.SERVER_PORT || 3000;
    await app
        .listen(server_port)
        .then(() => console.log(`Server is running on port ${server_port} : http://localhost:${server_port}`))
        .catch((err) => console.log(err));
}
bootstrap();
//# sourceMappingURL=main.js.map