// clsSVG.js
class clsSVG {
  // 1. Private library holding all your raw SVG path definitions
  static #library = {
    "icon-heart": 
    `<symbol id="icon-heart" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </symbol>`,
    
    "icon-star": 
    `<symbol id="icon-star" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </symbol>`,

    'icon-edit': 
    `<symbol id="icon-edit" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M16 2 l3 3 l-3 3 l-3 -3 z"/>  
            <path d="M4 14 v3 h3 l7.5-7.5 l -3 -3 z"/>
            <path d="M4 22h16" stroke-width="2"/>   
        </symbol>`,
        
    'icon-grid': 
    `<symbol id="icon-grid" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1" ry="1"/>
    </symbol>`,

    'icon-grid': `
        <symbol id="icon-grid" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="8" height="8" rx="1" ry="1"/>
            <rect x="13" y="3" width="8" height="8" rx="1" ry="1"/>
            <rect x="3" y="13" width="8" height="8" rx="1" ry="1"/>
            <rect x="13" y="13" width="8" height="8" rx="1" ry="1"/>
        </symbol>
    `,

    'icon-menu': `
    <symbol id="icon-menu" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
    </symbol>
    `,
    'icon-search': `
        <symbol id="icon-search" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="10" cy="10" r="6" fill="none"/>
            <path d="M16 16 l5 5" stroke-linecap="round"/>
        </symbol>
    `,
    'icon-filter': `
        <symbol id="icon-filter" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 6h18" />
            <path d="M6 12h12" />
            <path d="M9 18h6" />
        </symbol>
    `,
    'icon-download': `
        <symbol id="icon-download" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M12 5 v10" />
            <path d="M6 12 l6 4 l6 -4" fill="none"/>
            <path d="M3 20 h18" />
        </symbol>
    `,
    'icon-upload': `
        <symbol id="icon-upload" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M12 5 v12" />
            <path d="M6 10 l6 -4 l6 4" fill="none"/>
            <path d="M3 20 h18" />
        </symbol>
    `,
    'icon-save': `
        <symbol id="icon-save" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M8 2 L4 2 L2 4 L2 20 L4 22 L20 22 L22 20 L22 4 L20 2 L12 2 L12 16" />
            <path d = "M6 12L 12 16L 18 12"/>
        </symbol>
    `,
    'icon-discard': `
    <symbol id="icon-discard" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M6 6 l12 12" />
        <path d="M6 18 l12 -12" />
    </symbol>
    `,
    'icon-check': `
    <symbol id="icon-check" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M5 13 l4 4 l10 -10" />
    </symbol>
    `
  };

  /**
   * Returns the raw SVG code for a given icon key
   * @param {string} name - The key of the icon (e.g., 'icon-heart')
   * @returns {string} The SVG symbol string or empty string if not found
   */
  static getCode(name, width = 24, height = 24, style = '') {
    let symbolString = this.#library[name];
    
    if (!symbolString) return '';

    const customAttributes = `width="${width}" height="${height}"${style ? ` style="${style}"` : ''}`;
    let ret = symbolString
      .replace('<symbol', `<svg ${customAttributes}`)
      .replace('</symbol>', '</svg>');
    
    return ret;
  }

  static getIconList() {
    return Object.keys(this.#library);
  }

  /**
   * Scans the document (or looks at your library) and injects the 
   * master hidden sprite container so <use> tags can read them.
   */
  static ReplaceAll() {
    // Prevent duplicate injections if ReplaceAll has been called before
    let spriteContainer = document.getElementById('cls-sprite-master');
    
    if (!spriteContainer) {
      spriteContainer = document.createElement('div');
      spriteContainer.id = 'cls-sprite-master';
      spriteContainer.style.display = 'none';
      
      // Combine all symbols in our library into one hidden SVG string
      const allSymbols = Object.values(this.#library).join('\n');
      spriteContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${allSymbols}</svg>`;
      
      // Inject safely safely depending on DOM status
      if (document.body) {
        document.body.insertBefore(spriteContainer, document.body.firstChild);
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          document.body.insertBefore(spriteContainer, document.body.firstChild);
        });
      }
    }
  }
}