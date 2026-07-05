"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const grammy_1 = require("grammy");
const investorRoutes_1 = __importDefault(require("./routes/investorRoutes"));
const walletRoutes_1 = __importDefault(require("./routes/walletRoutes"));
const vaultRoutes_1 = __importDefault(require("./routes/vaultRoutes"));
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const portfolioRoutes_1 = __importDefault(require("./routes/portfolioRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.json({
        app: "AutoPilot API",
        version: "1.0.0",
        status: "Running",
    });
});
app.use("/api/investor", investorRoutes_1.default);
app.use("/api/wallet", walletRoutes_1.default);
app.use("/api/vault", vaultRoutes_1.default);
app.use("/api/managers", managerRoutes_1.default);
app.use("/api/portfolio", portfolioRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
console.log("✅ Admin routes mounted at /api/admin");
const botToken = process.env.BOT_TOKEN;
const miniAppUrl = process.env.MINIAPP_URL || "http://localhost:5173";
if (botToken) {
    const bot = new grammy_1.Bot(botToken);
    bot.command("start", async (ctx) => {
        const keyboard = new grammy_1.InlineKeyboard().webApp("Launch AutoPilot", miniAppUrl);
        await ctx.reply(`🚀 Welcome to AutoPilot.

Your Telegram-native investment platform.

Tap below to launch your investor portal.`, {
            reply_markup: keyboard,
        });
    });
    bot.catch((err) => {
        console.error("Telegram bot error:", err);
    });
    bot.start();
    console.log("🤖 AutoPilot Telegram bot running");
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 AutoPilot API running on http://localhost:${PORT}`);
});
