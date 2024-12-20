# Como rodar o projeto - Projeto React com Vite e pnpm

Uma aplicação React configurada com Vite para um desenvolvimento rápido e eficiente, utilizando o pnpm como gerenciador de pacotes.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [pnpm](https://pnpm.io/) (versão 6 ou superior)

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone este repositório**:

   ```bash
   git clone https://github.com/Cacadores-CRA/sighas-fe.git
   ```

2. **Acesse o diretório do projeto**:

   ```bash
   cd sighas-fe
   ```

3. **Instale as dependências**:

   Utilize o pnpm para instalar as dependências do projeto:

   ```bash
   pnpm install
   ```

## Executando o Projeto

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

O projeto estará acessível no endereço `http://localhost:3000`.

## Construindo para Produção

Para gerar uma versão otimizada do projeto para produção:

```bash
pnpm build
```

Os arquivos de saída serão gerados no diretório `dist`.

## Executando a Versão de Produção

Após construir o projeto, você pode usar o seguinte comando para executar a versão de produção:

```bash
pnpm preview
```

O projeto estará acessível no endereço indicado no terminal.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
