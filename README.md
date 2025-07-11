# 🧾 TexScreener

**TexScreener** is a modern token launchpad built for the **Solana** ecosystem. Designed with React and Vite, this platform enables creators to launch **tax tokens** with ease while providing transparency, simplicity, and automation.  

## 🚀 Features

- ⚡ Fast frontend powered by React + Vite  
- 📜 Customizable token tax configuration  
- 🔒 Wallet integration via Solana (e.g. Phantom, Solflare)  
- 🧠 Smart launch logic (anti-bot, fair distribution)  
- 📊 Dashboard for tracking token performance  
- 🔧 Admin tools for managing launches and taxes  

---

## 🏗️ Tech Stack

- **Frontend:** React + Vite  
- **Blockchain:** Solana (via Web3.js / Anchor / Solana Wallet Adapter)  
- **UI:** TailwindCSS or ShadCN (customizable)  
- **State Management:** Zustand or Redux (optional)  
- **Backend (optional):** Supabase / Firebase / Node / Fastify if needed  

---

## 📁 Project Structure

\`\`\`
TexScreener/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── lib/        # Blockchain & API integration
│   └── App.tsx
├── .env
├── index.html
├── package.json
└── vite.config.ts
\`\`\`

---

## 🧰 Getting Started

### 1. Clone the Repo

\`\`\`bash
git clone https://github.com/your-username/TexScreener.git
cd TexScreener
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Configure Environment

Create a \`.env\` file based on the example below:

\`\`\`env
VITE_SOLANA_NETWORK=devnet
VITE_RPC_URL=https://api.devnet.solana.com
VITE_PROJECT_NAME="TexScreener"
VITE_ADMIN_PUBLIC_KEY=your_admin_wallet_pubkey
\`\`\`

### 4. Run the Project

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The app will be available at \`http://localhost:5173\`.

---

## 🧪 Deployment

You can deploy on:  
- **Vercel** (Recommended)  
- **Netlify**  
- **Render**  
- Or your own server (Node + PM2 + Nginx)

### Build for Production

\`\`\`bash
npm run build
\`\`\`

---

## 🧠 How It Works

1. **Token Creator** connects their Solana wallet.  
2. They define:
   - Token name, symbol, supply
   - Tax settings (buy/sell %, destinations)
   - Launch type (fair launch, presale, whitelist)
3. **TexScreener** handles:
   - Token minting
   - Tax logic via smart contracts
   - Liquidity provisioning
   - Real-time monitoring
4. Users can track tokens and performance post-launch.

---

## 📄 Smart Contracts

Contracts are deployed on Solana. This repo assumes integration with a backend script or Anchor program. You can manage your smart contracts in a separate \`contracts/\` folder or repo.

> Want Anchor scaffolding included? Let me know, I can generate that too.

---

## 🙋 FAQ

- **Q:** What is a tax token?  
  - **A:** A token with embedded logic to charge fees on buys/sells (e.g. 3% redistributed to holders, 2% to treasury).

- **Q:** Can I integrate other wallets?  
  - **A:** Yes, just add adapters in \`@solana/wallet-adapter-react\`.

- **Q:** Is there a fee?  
  - **A:** That depends on how you deploy and monetize. TexScreener supports built-in launch fees or referral systems.

---

## 👨‍💻 Contributing

Pull requests welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

MIT © 2025 
