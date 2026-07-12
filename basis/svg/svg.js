// clsSVG.js
class clsSVG {
  // 1. Private library holding all your raw SVG path definitions
  static #library = {
    "icon-heart": `<symbol id="icon-heart" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </symbol>`,
    
    "icon-star": `<symbol id="icon-star" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </symbol>`
  };

  /**
   * Returns the raw SVG code for a given icon key
   * @param {string} name - The key of the icon (e.g., 'icon-heart')
   * @returns {string} The SVG symbol string or empty string if not found
   */
  static getCode(name) {
    return this.#library[name] || '';
  }

  /**
   * Scans the document (or looks at your library) and injects the 
   * master hidden sprite container so <use> tags can read them.
   */
  static ReplaceAll() {
    // Prevent duplicate injections if ReplaceAll has been called before
    let spriteContainer = document.getElementById('cls-svg-sprite-master');
    
    if (!spriteContainer) {
      spriteContainer = document.createElement('div');
      spriteContainer.id = 'cls-svg-sprite-master';
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