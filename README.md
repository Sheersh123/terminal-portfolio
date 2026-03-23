# 💻 Terminal Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.38.0-0055FF?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<br />

<div align="center">
  <h3>🚀 A sleek, interactive terminal-themed portfolio website</h3>
  <p>Experience a unique portfolio that combines the aesthetics of a command-line interface with modern web technologies. Navigate through sections like a pro hacker, complete with boot sequences, matrix rain effects, and interactive terminal commands.</p>
</div>

## ✨ Features

- **🖥️ Terminal Interface**: Navigate through portfolio sections using terminal-style commands
- **🌧️ Matrix Rain**: Cyberpunk-inspired background animation
- **⚡ Boot Sequence**: Authentic terminal boot experience on page load
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🎨 Modern UI**: Built with Shadcn/ui components and Tailwind CSS
- **🔄 Smooth Animations**: Powered by Framer Motion
- **🎯 Interactive Terminal**: Type commands to explore different sections
- **📋 Multiple Sections**: About, Skills, Projects, Education, Contact
- **🌙 Dark Theme**: Terminal-inspired dark color scheme

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Query
- **Routing**: React Router DOM
- **Testing**: Vitest + Playwright
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using bun
   bun install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using bun
   bun run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to see your portfolio in action!

## 📖 Usage

### Navigation

The portfolio features a unique terminal-style navigation:

- **Tab Navigation**: Click on section tabs (About, Skills, Projects, etc.)
- **Terminal Commands**: Use the interactive terminal to navigate:
  - `cat ~/about/README.md` - View about section
  - `./list-skills.sh` - Display skills
  - `ls ~/projects/` - Browse projects
  - `cat ~/education/degree.json` - Check education
  - `./send-message.sh --to sheersh` - Contact section

### Customization

1. **Personal Information**: Update content in the respective section components
2. **Styling**: Modify Tailwind classes and Framer Motion animations
3. **Terminal Commands**: Customize commands in `src/pages/Index.tsx`

## 🏗️ Project Structure

```
terminal-portfolio/
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── AboutSection.tsx
│   │   ├── InteractiveTerminal.tsx
│   │   ├── MatrixRain.tsx
│   │   ├── NavBar.tsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Route components
│   └── test/            # Test files
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests with Playwright
npx playwright test
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by terminal interfaces and cyberpunk aesthetics
- Built with modern React ecosystem tools
- UI components from Shadcn/ui
- Icons from Lucide React

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and a passion for clean code</p>
  <p>
    <a href="#-terminal-portfolio">Back to top</a>
  </p>
</div>
