import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Bot, InlineKeyboard } from "grammy";

import investorRoutes from "./routes/investorRoutes";
import walletRoutes from "./routes/walletRoutes";
import vaultRoutes from "./routes/vaultRoutes";
import managerRoutes from "./routes/managerRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    app: "AutoPilot API",
    version: "1.0.0",
    status: "Running",
  });
});

app.use("/api/investor", investorRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/vault", vaultRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/admin", adminRoutes);

console.log("✅ Admin routes mounted at /api/admin");

const botToken = process.env.BOT_TOKEN;
const miniAppUrl = process.env.MINIAPP_URL || "http://localhost:5173";

if (botToken) {
  const bot = new Bot(botToken);

  bot.command("start", async (ctx) => {
    const keyboard = new InlineKeyboard().webApp(
      "Launch AutoPilot",
      miniAppUrl
    );

    await ctx.reply(
      `🚀 Welcome to AutoPilot.

Your Telegram-native investment platform.

Tap below to launch your investor portal.`,
      {
        reply_markup: keyboard,
      }
    );
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