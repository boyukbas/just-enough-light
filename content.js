// Add a listener for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'enable') {
    enableMask();
  } else if (message.action === 'disable') {
    disableMask();
  }
});

// Enable the mask by default on page load
chrome.storage.sync.get({ enabled: true }, (data) => {
  if (data.enabled) {
    enableMask();
  }
});

function enableMask() {
  if (!document.getElementById('cursor-mask')) {
    const mask = document.createElement('div');
    mask.id = 'cursor-mask';
    document.body.appendChild(mask);

    document.addEventListener('mousemove', handleMouseMove);

    chrome.storage.sync.get({ maskStrength: 0.8, maskRadius: 300 }, (data) => {
      mask.style.setProperty('--mask-opacity', data.maskStrength);
      mask.style.setProperty('--mask-radius', `${data.maskRadius}px`);
    });
  }
}

function disableMask() {
  const mask = document.getElementById('cursor-mask');
  if (mask) {
    mask.remove();
    document.removeEventListener('mousemove', handleMouseMove);
  }
}

function handleMouseMove(event) {
  const mask = document.getElementById('cursor-mask');
  if (mask) {
    const { clientX, clientY } = event;
    mask.style.setProperty('--cursor-x', `${clientX}px`);
    mask.style.setProperty('--cursor-y', `${clientY}px`);
  }
}