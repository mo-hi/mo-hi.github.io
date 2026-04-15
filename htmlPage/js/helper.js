function getTruncatedHTML(element, maxDepth, currentDepth = 0) {
    // 1. Clone the current node
    let clone = element.cloneNode(false);

    // 2. If we haven't reached max depth, process children
    if (currentDepth < maxDepth) {
        element.childNodes.forEach(child => {
            // --- NEW FILTER LOGIC ---
            // Skip if the node is a <script> tag
            if (child.nodeName === 'SCRIPT') {
                return; 
            }
            // ------------------------

            if (child.nodeType === Node.ELEMENT_NODE) {
                clone.appendChild(getTruncatedHTML(child, maxDepth, currentDepth + 1));
            } else if (child.nodeType === Node.TEXT_NODE) {
                // Only append text if it's not just empty whitespace between tags
                if (child.textContent.trim().length > 0) {
                    clone.appendChild(child.cloneNode(true));
                }
            }
        });
    } else if (element.childNodes.length > 0) {
        // 3. If we hit the limit and there are children, add a placeholder
        // We only add "..." if the element we are truncating isn't a script
        clone.textContent = "..."; 
    }

    return clone;
}