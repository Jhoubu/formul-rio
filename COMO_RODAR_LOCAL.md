# 🚀 Como Rodar a Landing Page Localmente

## Arquivos Necessários
Certifique-se de ter todos estes arquivos na mesma pasta:
- ✅ `index.html`
- ✅ `landing-style.css` 
- ✅ `landing-script.js`

## 📋 Opções para Rodar Local

### 🐍 Opção 1: Python (Recomendado)
```bash
# Abra o terminal/prompt na pasta dos arquivos
# Digite um dos comandos abaixo:

# Python 3 (mais comum)
python3 -m http.server 8000

# Ou Python 2 (se não funcionar o anterior)
python -m SimpleHTTPServer 8000

# No Windows, pode ser apenas:
python -m http.server 8000
```

**Depois acesse:** http://localhost:8000

---

### 🟢 Opção 2: Node.js
```bash
# Se você tem Node.js instalado:
npx http-server

# Ou instalar globalmente:
npm install -g http-server
http-server
```

**Depois acesse:** http://localhost:8080

---

### 🌐 Opção 3: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

**Abre automaticamente no navegador**

---

### 🔧 Opção 4: XAMPP/WAMP/MAMP
1. Coloque os arquivos na pasta `htdocs` (XAMPP) ou `www` (WAMP)
2. Inicie o Apache
3. Acesse: http://localhost/nome-da-pasta

---

### 📱 Opção 5: Abrir Direto (Limitado)
**⚠️ Alguns recursos podem não funcionar**
- Clique duplo no `index.html`
- Ou arraste para o navegador

---

## 🚨 Resolução de Problemas

### Erro "Porta já em uso"
```bash
# Tente outra porta:
python3 -m http.server 3000
# Acesse: http://localhost:3000
```

### Erro "Python não encontrado"
**Windows:**
- Instale Python: https://python.org/downloads
- Marque "Add to PATH" na instalação

**Mac:**
```bash
# Instalar via Homebrew:
brew install python3
```

**Linux:**
```bash
# Ubuntu/Debian:
sudo apt install python3

# CentOS/RHEL:
sudo yum install python3
```

### Problema com CORS/JavaScript
- ❌ NÃO abra direto o arquivo (file:///)
- ✅ USE sempre um servidor local (http://localhost)

---

## 🎯 Teste Rápido

1. **Baixe/copie os arquivos** para uma pasta
2. **Abra terminal** na pasta
3. **Digite:** `python3 -m http.server 8000`
4. **Abra navegador:** http://localhost:8000
5. **Sucesso!** 🎉

---

## 📞 Precisa de Ajuda?

**Se ainda não funcionar:**
1. Verifique se os 3 arquivos estão na mesma pasta
2. Tente diferentes portas (3000, 5000, 8080)
3. Verifique se tem antivírus bloqueando
4. Tente em modo incógnito no navegador

**Exemplo de estrutura correta:**
```
minha-pasta/
├── index.html
├── landing-style.css
├── landing-script.js
└── COMO_RODAR_LOCAL.md
```

---

**🚀 A landing page estará disponível com todas as animações e funcionalidades!**