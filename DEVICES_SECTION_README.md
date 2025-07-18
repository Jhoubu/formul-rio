# Seção 1.1 - Dispositivos com Efeito de Profundidade e Parallax Scroll

## Visão Geral

Esta implementação cria uma seção full-width com imagem de dispositivos (notebook, tablet, celular) que apresenta efeitos visuais avançados:

- **Efeito 3D com perspectiva** - Inclinação sutil para simular profundidade
- **Parallax scroll reverso** - Movimento mais lento que o scroll
- **Zoom suave durante o scroll** - Scale de 1.0 para 1.08
- **Transições fluidas** - Easing ease-out para movimentos naturais
- **Otimização de performance** - RequestAnimationFrame e throttling
- **Responsividade completa** - Adaptação para mobile

## Estrutura dos Arquivos

### HTML (formulario.html)
```html
<section id="devices-showcase" class="devices-section">
    <div class="devices-container">
        <div class="devices-image-wrapper">
            <img src="[URL_DA_IMAGEM]" 
                 alt="Notebook, Tablet e Celular" 
                 class="devices-image"
                 loading="lazy" />
            <div class="devices-overlay"></div>
        </div>
    </div>
</section>
```

### CSS (style.css)
- **Seção .devices-section**: Container principal com 70vh de altura
- **3D Transform**: Perspective de 1000px para efeito de profundidade
- **Parallax Effects**: Transform com translateZ, rotateX, rotateY e scale
- **Visual Enhancements**: Overlay gradiente e blur nas bordas
- **Responsive Design**: Media queries para tablet e mobile

### JavaScript (script.js)
- **Scroll Detection**: Intersection Observer + scroll handler otimizado
- **Transform Calculations**: Easing functions para movimentos suaves
- **Performance**: RequestAnimationFrame e throttling
- **Accessibility**: Suporte a prefers-reduced-motion

## Características Técnicas

### Efeitos Visuais
1. **Posição Inicial**: 
   - `translateZ(-20px)` - Posição atrás do plano
   - `rotateX(2deg)` - Inclinação sutil para trás
   - `rotateY(-1deg)` - Ligeira rotação lateral

2. **Durante o Scroll**:
   - `translateY(-40px)` - Movimento para cima
   - `scale(1.08)` - Zoom suave
   - `translateZ(5px)` - Emerge da tela
   - Redução gradual das rotações

3. **Filtros Dinâmicos**:
   - `brightness(1.1 → 1.25)` - Aumento do brilho
   - `contrast(1.1 → 1.2)` - Melhoria do contraste

### Performance
- **Throttling**: RequestAnimationFrame para 60fps
- **Passive Listeners**: Scroll events otimizados
- **Will-change**: Propriedades CSS para hardware acceleration
- **Intersection Observer**: Detecção eficiente de viewport

### Responsividade
- **Desktop**: Efeitos completos (70vh)
- **Tablet**: Redução dos efeitos (60vh)
- **Mobile**: Movimento limitado (50vh)

## Personalização

### Alterar a Imagem
Substitua a URL no atributo `src` da imagem:
```html
<img src="SUA_IMAGEM_AQUI.jpg" 
     alt="Descrição dos dispositivos" 
     class="devices-image" />
```

### Ajustar Intensidade dos Efeitos
No arquivo `script.js`, modifique os valores na função `applyParallaxEffect`:

```javascript
const translateY = easeOut * -40; // Movimento vertical (-60 para mais movimento)
const scale = 1 + (easeOut * 0.12); // Zoom (0.2 para mais zoom)
const rotateX = 2 - (easeOut * 1.5); // Rotação X
const rotateY = -1 + (easeOut * 0.7); // Rotação Y
```

### Alterar Altura da Seção
No arquivo `style.css`:
```css
.devices-section {
    height: 80vh; /* Altere conforme necessário */
}
```

### Customizar Overlay
```css
.devices-overlay {
    background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.4) 0%,    /* Escurecer início */
        rgba(0, 0, 0, 0.1) 50%,   /* Meio transparente */
        rgba(255, 255, 255, 0.1) 100% /* Clarear final */
    );
}
```

## Recursos Avançados

### Debug Mode
Adicione `?debug=true` na URL para ver informações de scroll em tempo real.

### Imagens em Camadas (Opcional)
Para efeito parallax por camada, substitua a imagem única por:
```html
<div class="devices-layers">
    <img src="notebook.png" class="layer-back" />
    <img src="tablet.png" class="layer-middle" />
    <img src="mobile.png" class="layer-front" />
</div>
```

E adicione CSS correspondente com velocidades diferentes de parallax.

### Acessibilidade
- Suporte automático a `prefers-reduced-motion`
- Lazy loading da imagem
- Alt text descritivo
- Focus indicators

## Otimizações Recomendadas

### Imagem
- **Formato**: WebP com fallback para JPEG
- **Resolução**: 2560x1440px (mínimo)
- **Compressão**: 80-85% de qualidade
- **CDN**: Use CDN para carregamento rápido

### Performance
- Comprima o CSS e JavaScript para produção
- Use `loading="lazy"` na imagem
- Considere image sprites para múltiplas camadas

## Compatibilidade

- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Devices**: Desktop, Tablet, Mobile
- **3D Support**: Fallback gracioso para navegadores antigos

## Troubleshooting

### Imagem não carrega
- Verifique a URL da imagem
- Confirme permissões CORS se necessário
- Teste com imagem local

### Efeitos não funcionam
- Confirme que o JavaScript está carregando
- Verifique console para erros
- Teste em navegador com suporte a 3D transforms

### Performance ruim
- Reduza a resolução da imagem
- Diminua a intensidade dos efeitos
- Use `will-change` com moderação

## Exemplo de Uso Completo

Para implementar esta seção em seu projeto:

1. Copie o HTML da seção para sua página
2. Inclua o CSS no seu arquivo de estilos
3. Adicione o JavaScript ao final do body
4. Substitua a URL da imagem pela sua imagem de dispositivos
5. Teste em diferentes dispositivos e navegadores

Esta implementação oferece uma experiência visual moderna e impactante, mantendo boa performance e acessibilidade.