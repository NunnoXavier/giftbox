// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Caminho para o diretório do Next.js (opcional, mas útil para monorepos)
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Configurações padrão do Jest
  testEnvironment: "jsdom", // Ambiente de teste (simula browser)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Arquivo de setup global
  moduleNameMapper: {
    // Mapeamento para imports do Next.js (ex: imagens, CSS)
    "^@/(.*)$": "<rootDir>/src/$1", // Se estiver usando aliases (opcional)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mocks para CSS Modules
  },
  // Ignorar pastas desnecessárias nos testes
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  // Ativar transformações para TypeScript (usando ts-jest)
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
  // Extensões de arquivos que o Jest deve considerar
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

// Exporta a configuração combinada (Next.js + customizações)
module.exports = createJestConfig(customJestConfig);