"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./lib/prisma"));
async function main() {
    const managers = [
        {
            name: "Marcus Hale",
            category: "Balanced",
            bio: "Balanced growth strategy across Gold, BTC, Forex, and indices.",
            markets: "Gold, BTC, Forex",
            return6m: 16.1,
            winRate: 84,
            maxDrawdown: 8.4,
            riskLevel: "Moderate",
            trackerUrl: "https://trade-tracker-rust.vercel.app/sun",
        },
        {
            name: "Sophia Chen",
            category: "Crypto",
            bio: "Momentum-focused strategy for high-liquidity crypto markets.",
            markets: "BTC, ETH, SOL",
            return6m: 22.4,
            winRate: 81,
            maxDrawdown: 12.6,
            riskLevel: "Aggressive",
            trackerUrl: "https://trade-tracker-rust.vercel.app/sun",
        },
        {
            name: "David Ross",
            category: "Conservative",
            bio: "Lower-volatility FX strategy focused on capital preservation.",
            markets: "EURUSD, GBPUSD, Gold",
            return6m: 8.7,
            winRate: 79,
            maxDrawdown: 4.2,
            riskLevel: "Conservative",
            trackerUrl: "https://trade-tracker-rust.vercel.app/sun",
        },
    ];
    for (const manager of managers) {
        const existing = await prisma_1.default.strategyManager.findFirst({
            where: { name: manager.name },
        });
        if (!existing) {
            await prisma_1.default.strategyManager.create({
                data: manager,
            });
        }
    }
    console.log("✅ Strategy managers seeded.");
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
