const inputJson = document.getElementById('inputJson');
const outputJson = document.getElementById('outputJson');
const formatSpacesBtn = document.getElementById('formatSpacesBtn');
const formatTabsBtn = document.getElementById('formatTabsBtn');
const indentSizeInput = document.getElementById('indentSize');
const error = document.getElementById('error');

let useSpaces = true; // Default to spaces

// Function to format JSON dynamically
function formatJSON() {
  const rawJson = inputJson.value.trim();

  let indent = '\t'; // Default to tabs
  if (useSpaces) {
    const indentSize = parseInt(indentSizeInput.value, 10);
    if (isNaN(indentSize) || indentSize < 1) {
      error.textContent = 'Please enter a valid number for spaces.';
      error.style.display = 'block';
      return;
    }
    indent = ' '.repeat(indentSize);
  }

  try {
    const parsed = JSON.parse(rawJson);
    outputJson.value = JSON.stringify(parsed, null, indent);
    error.style.display = 'none'; // Clear any errors
  } catch (err) {
    error.textContent = 'Invalid JSON! Please correct it and try again.';
    error.style.display = 'block';
    outputJson.value = '';
  }
}

// Toggle button styles and behavior
function toggleButtons(selectedButton) {
  if (selectedButton === 'spaces') {
    formatSpacesBtn.classList.add('active');
    formatTabsBtn.classList.remove('active');
    indentSizeInput.style.display = 'inline-block';
    useSpaces = true;
  } else if (selectedButton === 'tabs') {
    formatTabsBtn.classList.add('active');
    formatSpacesBtn.classList.remove('active');
    indentSizeInput.style.display = 'none';
    useSpaces = false;
  }
  formatJSON(); // Reformat JSON immediately on toggle
}

// Event listeners
formatSpacesBtn.addEventListener('click', () => toggleButtons('spaces'));
formatTabsBtn.addEventListener('click', () => toggleButtons('tabs'));
indentSizeInput.addEventListener('input', () => {
  if (useSpaces) {
    formatJSON(); // Reformat JSON automatically on input change
  }
});


