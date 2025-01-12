document.addEventListener('DOMContentLoaded', () => {
  const maskStrengthInput = document.getElementById('mask-strength');
  const maskRadiusInput = document.getElementById('mask-radius');
  const saveButton = document.getElementById('save-button');

  // Load current settings
  chrome.storage.sync.get({ maskStrength: 0.8, maskRadius: 300 }, (data) => {
    maskStrengthInput.value = data.maskStrength;
    maskRadiusInput.value = data.maskRadius;
  });

  // Save new settings
  saveButton.addEventListener('click', () => {
    const maskStrength = parseFloat(maskStrengthInput.value);
    const maskRadius = parseInt(maskRadiusInput.value, 10);

    if ((maskStrength >= 0 && maskStrength <= 1) && (maskRadius >= 100 && maskRadius <= 1000)) {
      chrome.storage.sync.set({ maskStrength, maskRadius }, () => {
        alert('Settings saved!');
      });
    } else {
      alert('Please enter valid values: Mask Strength (0.0 - 1.0), Mask Radius (100 - 1000px)');
    }
  });
});