document.addEventListener('DOMContentLoaded', () => {
  const maskStrengthInput = document.getElementById('mask-strength');
  const saveButton = document.getElementById('save-button');

  // Load current settings
  chrome.storage.sync.get({ maskStrength: 0.8 }, (data) => {
    maskStrengthInput.value = data.maskStrength;
  });

  // Save new settings
  saveButton.addEventListener('click', () => {
    const maskStrength = parseFloat(maskStrengthInput.value);
    if (maskStrength >= 0 && maskStrength <= 1) {
      chrome.storage.sync.set({ maskStrength }, () => {
        alert('Settings saved!');
      });
    } else {
      alert('Please enter a value between 0.0 and 1.0');
    }
  });
});