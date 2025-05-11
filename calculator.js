// الحصول على الأزرار وشاشة الآلة الحاسبة
const buttons = document.querySelectorAll('input[type="button"]');
const screen = document.querySelector('input[type="text"]');

let currentInput = ""; // المدخل الحالي في الشاشة

// إضافة حدث عند الضغط على أي زر
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.value;

    if (value === 'C') {
      // مسح الشاشة
      currentInput = "";
      screen.value = "";
    } else if (value === '=') {
      // حساب النتيجة
      try {
        currentInput = eval(currentInput).toString();
        screen.value = currentInput;
      } catch {
        screen.value = "خطأ";
        currentInput = "";
      }
    } else {
      // إضافة الأرقام أو العمليات الحسابية إلى المدخل
      currentInput += value;
      screen.value = currentInput;
    }
  });
});
