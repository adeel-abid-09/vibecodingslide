/**
 * Interactive Presentation & Fullscreen Engine
 * MERN AI Bootcamp - Teacher Cockpit & Visualizers
 *
 * Provides instant 1-click fullscreen presentation mode for:
 * - Interactive Web Request Simulator (Lesson 01)
 * - All interactive simulators & labs across Lessons 01 - 18
 * - Mermaid architecture diagrams
 */

(function () {
  'use strict';

  let currentFullscreenElem = null;

  // Check if browser native fullscreen is active
  function isNativeFullscreen() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  // Enter Fullscreen Presentation Mode
  async function enterFullscreen(element) {
    if (!element) return;

    // If another element is already in fullscreen, exit it first
    if (currentFullscreenElem && currentFullscreenElem !== element) {
      exitFullscreen();
    }

    currentFullscreenElem = element;
    element.classList.add('is-fullscreen');
    document.body.classList.add('has-interactive-fullscreen');

    // Update all toggle buttons in this element
    updateToggleButtons(element, true);

    // Try HTML5 Native Fullscreen API
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
    } catch (err) {
      // If browser blocks native fullscreen (e.g. iframe policy or sandbox),
      // the CSS .is-fullscreen class already provides a 100% flawless fullscreen viewport presentation
      console.info('Native Fullscreen API rejected or restricted; presentation CSS mode active.', err);
    }

    // Notify parent window if inside an iframe
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'INTERACTIVE_FULLSCREEN_ENTER',
          title: document.title
        }, '*');
      }
    } catch (e) {}
  }

  // Exit Fullscreen Presentation Mode
  async function exitFullscreen() {
    const prevElem = currentFullscreenElem;
    currentFullscreenElem = null;

    if (prevElem) {
      prevElem.classList.remove('is-fullscreen');
      updateToggleButtons(prevElem, false);
    }

    // Clean up any remaining elements with the class
    document.querySelectorAll('.is-fullscreen').forEach(el => {
      el.classList.remove('is-fullscreen');
      updateToggleButtons(el, false);
    });

    document.body.classList.remove('has-interactive-fullscreen');

    // Exit browser native fullscreen if active
    if (isNativeFullscreen()) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      } catch (err) {
        console.warn('Native exit fullscreen error:', err);
      }
    }

    // Notify parent window if inside iframe
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'INTERACTIVE_FULLSCREEN_EXIT'
        }, '*');
      }
    } catch (e) {}
  }

  // Toggle Fullscreen
  function toggleFullscreen(element) {
    if (!element) return;
    if (element.classList.contains('is-fullscreen') || (isNativeFullscreen() && currentFullscreenElem === element)) {
      exitFullscreen();
    } else {
      enterFullscreen(element);
    }
  }

  // Update button labels and icons
  function updateToggleButtons(container, isFs) {
    const btns = container.querySelectorAll('.btn-fullscreen, .fullscreen-toggle-btn');
    btns.forEach(btn => {
      if (isFs) {
        btn.classList.add('active');
        btn.innerHTML = '<span>🗗</span> <span>Exit Fullscreen</span>';
        btn.title = 'Exit Fullscreen Presentation Mode (Esc)';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<span>⛶</span> <span>Fullscreen</span>';
        btn.title = 'Show in Fullscreen Presentation Mode (F)';
      }
    });
  }

  // Handle native browser fullscreen changes (e.g. user pressed Esc)
  function onFullscreenChange() {
    if (!isNativeFullscreen() && currentFullscreenElem) {
      exitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
  document.addEventListener('mozfullscreenchange', onFullscreenChange);
  document.addEventListener('MSFullscreenChange', onFullscreenChange);

  // Keyboard shortcut listener:
  // - Escape exits fullscreen
  // - 'F' or 'f' toggles primary simulator fullscreen
  document.addEventListener('keydown', (e) => {
    // Ignore keypresses inside form inputs or textareas
    const tag = (e.target && e.target.tagName) || '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || (e.target && e.target.isContentEditable)) {
      return;
    }

    if (e.key === 'Escape') {
      if (currentFullscreenElem || isNativeFullscreen() || document.querySelector('.is-fullscreen')) {
        e.preventDefault();
        exitFullscreen();
      }
    } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Find the primary interactive simulator on the page
      const primary = findPrimaryInteractiveElement();
      if (primary) {
        e.preventDefault();
        toggleFullscreen(primary);
      }
    }
  });

  // Find the primary interactive element
  function findPrimaryInteractiveElement() {
    // 1. Explicit ID
    const byId = document.getElementById('interactiveSimulatorBlock') || document.querySelector('.section-block.flagship-simulator');
    if (byId) return byId;

    // 2. Section block containing sim-container or api-client
    const allBlocks = Array.from(document.querySelectorAll('.section-block'));
    for (const block of allBlocks) {
      if (block.querySelector('.sim-container, .api-client')) {
        return block;
      }
    }

    // 3. Fallback to first section-block
    return allBlocks[0] || null;
  }

  // Setup UI elements on a simulator section block
  function setupSimulatorSection(block) {
    if (block.dataset.fsInitialized === 'true') return;
    block.dataset.fsInitialized = 'true';

    // 1. Top presentation banner visible in fullscreen mode
    if (!block.querySelector('.fullscreen-presentation-bar')) {
      const h2 = block.querySelector('h2');
      const titleText = h2 ? h2.textContent.trim() : 'Interactive Simulator';

      const bar = document.createElement('div');
      bar.className = 'fullscreen-presentation-bar';
      bar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
          <div class="presentation-badge">
            <span class="pulse-dot"></span>
            <span>TEACHER PRESENTATION MODE</span>
          </div>
          <div class="presentation-title">${titleText}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="presentation-shortcut-hint" style="font-size: 0.75rem; color: var(--text-faint); font-family: var(--font-mono);">
            Press <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #fff;">ESC</kbd> or <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #fff;">F</kbd> to exit
          </span>
          <button type="button" class="btn btn-secondary fs-exit-btn" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.4); color: #fca5a5;">
            🗗 Exit Fullscreen
          </button>
        </div>
      `;

      bar.querySelector('.fs-exit-btn').onclick = (e) => {
        e.preventDefault();
        exitFullscreen();
      };

      block.insertBefore(bar, block.firstChild);
    }

    // 2. Floating quick-exit button in top right
    if (!block.querySelector('.fullscreen-close-floating')) {
      const floatClose = document.createElement('button');
      floatClose.type = 'button';
      floatClose.className = 'fullscreen-close-floating';
      floatClose.innerHTML = '✕ Exit Fullscreen <span style="opacity: 0.7; font-size: 0.75rem; margin-left: 3px;">(Esc)</span>';
      floatClose.title = 'Exit Fullscreen (Esc)';
      floatClose.onclick = (e) => {
        e.preventDefault();
        exitFullscreen();
      };
      block.appendChild(floatClose);
    }

    // 3. Ensure a Fullscreen button exists in normal view
    let btn = block.querySelector('.btn-fullscreen');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-fullscreen';
      btn.innerHTML = '<span>⛶</span> <span>Fullscreen</span>';
      btn.title = 'Show in Fullscreen Presentation Mode (Press F)';

      // Look for a suitable header spot
      const h2 = block.querySelector('h2');
      if (h2) {
        const parent = h2.parentElement;
        const grandParent = parent ? parent.parentElement : null;

        // Case A: The parent has display: flex (like Lesson 01 flex container)
        if (grandParent && (grandParent.style.display === 'flex' || grandParent.classList.contains('sim-header-row'))) {
          grandParent.appendChild(btn);
        } else if (parent && (parent.style.display === 'flex' || parent.classList.contains('sim-header-row'))) {
          parent.appendChild(btn);
        } else {
          // Case B: H2 is a direct block element. Create a flex row wrapper for H2 + Button
          const row = document.createElement('div');
          row.className = 'sim-header-row';
          row.style.display = 'flex';
          row.style.justifyContent = 'space-between';
          row.style.alignItems = 'center';
          row.style.flexWrap = 'wrap';
          row.style.gap = '1rem';
          row.style.marginBottom = '0.5rem';

          h2.parentNode.insertBefore(row, h2);
          row.appendChild(h2);
          row.appendChild(btn);
        }
      }
    }

    // Hook up click handler
    btn.onclick = (e) => {
      e.preventDefault();
      toggleFullscreen(block);
    };
  }

  // Setup UI elements on diagram boxes
  function setupDiagramBox(diag) {
    if (diag.dataset.fsInitialized === 'true') return;
    diag.dataset.fsInitialized = 'true';

    diag.style.position = 'relative';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-fullscreen diagram-fs-btn';
    btn.style.position = 'absolute';
    btn.style.top = '10px';
    btn.style.right = '10px';
    btn.style.fontSize = '0.75rem';
    btn.style.padding = '0.25rem 0.6rem';
    btn.style.zIndex = '10';
    btn.innerHTML = '<span>⛶</span> <span>Expand</span>';
    btn.title = 'View Architecture Diagram in Fullscreen';
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleFullscreen(diag);
    };
    diag.appendChild(btn);

    const floatClose = document.createElement('button');
    floatClose.type = 'button';
    floatClose.className = 'fullscreen-close-floating';
    floatClose.innerHTML = '✕ Exit <span style="opacity: 0.7; font-size: 0.75rem;">(Esc)</span>';
    floatClose.onclick = (e) => {
      e.stopPropagation();
      exitFullscreen();
    };
    diag.appendChild(floatClose);
  }

  // Initialize all interactive sections
  function initializeAll() {
    // 1. Simulator sections
    const blocks = Array.from(document.querySelectorAll('.section-block'));
    blocks.forEach((block, idx) => {
      const isSimulator = block.querySelector('.sim-container, .api-client') || idx === 0;
      if (isSimulator) {
        setupSimulatorSection(block);
      }
    });

    // 2. Architecture diagrams
    document.querySelectorAll('.diagram-box').forEach(diag => {
      setupDiagramBox(diag);
    });
  }

  // Expose global methods
  window.enterInteractiveFullscreen = enterFullscreen;
  window.exitInteractiveFullscreen = exitFullscreen;
  window.toggleInteractiveFullscreen = toggleFullscreen;

  // Run on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }
})();
