// Load the mask strength from storage
chrome.storage.sync.get({ maskStrength: 0.8 }, (data) => {
    const maskStrength = data.maskStrength;
  
    // Create the mask
    const mask = document.createElement('div');
    mask.id = 'cursor-mask';
    document.body.appendChild(mask);
  
    // Update mask position on mouse move
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event;
      mask.style.setProperty('--cursor-x', `${clientX}px`);
      mask.style.setProperty('--cursor-y', `${clientY}px`);
    });
  
    // Update mask CSS with the configured strength
    mask.style.setProperty('--mask-opacity', maskStrength);
  });