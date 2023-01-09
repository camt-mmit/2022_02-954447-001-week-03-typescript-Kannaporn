document.addEventListener('DOMContentLoaded', () => {
  const inputs = [
      ...document.querySelectorAll<HTMLInputElement>(
        '.cmp-inputs-container input[type="number"]'
      ),
    ];
  
    inputs.forEach((elem) => {
      elem.addEventListener('change', () => {
        const total = inputs.reduce(
          (carry, elem) => carry + elem.valueAsNumber,
          0,
        );
        const outputComponent = document.querySelector<HTMLOutputElement>('output.cmp-result');

        if(outputComponent === null) {
          throw new Error('Can not find \'output.cmp-result\' in DOM tree')
        }

        outputComponent.value = `${total}`;
      });
    });
  });