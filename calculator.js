 const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let expression = '';

function safeEval(expr) {
  // Replace special functions and constants with JS Math equivalents:
  expr = expr.replace(/π/g, 'Math.PI');
  expr = expr.replace(/e/g, 'Math.E');
  expr = expr.replace(/√/g, 'Math.sqrt');
  expr = expr.replace(/sin/g, 'Math.sin');
  expr = expr.replace(/cos/g, 'Math.cos');
  expr = expr.replace(/tan/g, 'Math.tan');
  expr = expr.replace(/log/g, 'Math.log10');
  expr = expr.replace(/ln/g, 'Math.log');
  // power: replace xʸ or ^ with Math.pow(base, exponent)
  // Let's transform a^b to Math.pow(a,b)
  expr = expr.replace(/(\d+|\([^()]+\))\^(\d+|\([^()]+\))/g, 'Math.pow($1,$2)');

  // Evaluate with Function to avoid eval risks a bit:
  try {
    return Function('"use strict";return (' + expr + ')')();
  } catch (e) {
    return 'Error';
  }
}

function updateDisplay() {
  display.value = expression || '0';
}

function toggleSign() {
  // Toggle the sign of the last number in the expression
  let regex = /([-\d\.]+)$/;
  let match = expression.match(regex);
  if (match) {
    let num = match[0];
    if (num.startsWith('-')) {
      expression = expression.slice(0, -num.length) + num.slice(1);
    } else {
      expression = expression.slice(0, -num.length) + '-' + num;
    }
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');

    switch (val) {
      case 'C':
        expression = '';
        break;
      case 'DEL':
        expression = expression.slice(0, -1);
        break;
      case '=':
        // Evaluate expression:
        let result = safeEval(expression);
        if (result !== 'Error') {
          expression = String(result);
        } else {
          expression = '';
          alert('Invalid Expression');
        }
        break;
      case '±':
        toggleSign();
        break;
      case 'PV':
      case 'FV':
      case 'PMT':
      case 'NPV':
      case 'Σ+':
      case 'Σ-':
      case 's':
      case 'R/S':
      case 'GTO':
      case 'BST':
      case 'PSE':
        alert(`Function ${val} is not implemented yet.`);
        break;
      default:
        // Append value to expression
        expression += val;
        break;
    }

    updateDisplay();
  });
});

// Dark Mode toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    darkModeToggle.textContent = 'Light Mode';
  } else {
    darkModeToggle.textContent = 'Dark Mode';
  }
});

// Initialize display
updateDisplay();
