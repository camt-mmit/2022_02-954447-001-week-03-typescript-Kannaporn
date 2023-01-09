import { ResultComponent, CommandComponent} from './types';

function computeTotal(inputsContainer:HTMLElement, resultComponent:ResultComponent) {
    const inputContainers = [...inputsContainer.querySelectorAll<HTMLElement>('cmp-input-container'),];

    const total = inputContainers
    .map((elem) => elem.querySelector<HTMLInputElement>('input[type="number"]'))
    .filter((elem) : elem is HTMLInputElement => elem !== null)
    .reduce((carry, elem) => carry + elem.valueAsNumber, 0);
  
    resultComponent.value = `${total}`;
  }
  
  function rebuildIndex(inputsContainer:HTMLElement) {
    const inputContainers = [
      ...inputsContainer.querySelectorAll<HTMLElement>('.cmp-input-container'),
    ];
  
    inputContainers.forEach((inputContainer, index) => {
      [...inputContainer.querySelectorAll<HTMLElement>('.cmp-input-no')].forEach((elem) => {
        elem.innerText = `${index + 1}`;
      });
    });
  
    [...inputsContainer.querySelectorAll<CommandComponent>('.cmd-remove-input')].forEach((elem) => {
      elem.disabled = inputContainers.length > 1 ? false:true;
    });
  }
  
  function add(inputsContainer:HTMLElement, resultComponent:ResultComponent, template:HTMLTemplateElement) {
    const fragment = template.content.cloneNode(true);
  
    inputsContainer.append(fragment);
  
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
  }
  
  function remove(inputsContainer:HTMLElement, resultComponent:ResultComponent, inputContainer:HTMLElement) {
    inputContainer.remove();
  
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
  }
  
  export function assign(container:HTMLElement, inputTemplate:HTMLTemplateElement) {
    const inputsContainer = container.querySelector<HTMLElement>('.cmp-inputs-container');
    const resultComponent = container.querySelector<ResultComponent>('.cmp-result');

    if( inputsContainer === null) {
      throw new Error(`Cannot find '.cmp-inputs-container' in container DOM tree.`);
    }

    if( resultComponent === null) {
      throw new Error(`Cannot find '.cmp-result' in container DOM tree.`)
    }
  
    container.addEventListener('click', (ev) => {
      if (ev.target) {
        if((ev.target as HTMLElement).matches('.cmd-add-input')) {
        add(inputsContainer, resultComponent, inputTemplate);
      }
    }
  });
  
    inputsContainer.addEventListener('change', (ev) => {
      if (ev.target) {
        if((ev.target as HTMLElement).matches('input[type="number"]')) {
        computeTotal(inputsContainer, resultComponent);
      }
      }
    });
  
    inputsContainer.addEventListener('click', (ev) => {
      if (ev.target) {
        const targetElement = ev.target as HTMLElement;
        if(targetElement.matches('.cmd-remove-input')) {
          const inputContainer = targetElement.closest<HTMLElement>('.cmp-input-container');

          if (inputContainer === null) {
            throw new Error(`Cannot find '.cmp-inputs-container' in parent path DOM tree.`);
          }
        remove(inputsContainer, resultComponent, inputContainer);
        }
      } 
    });
  
    add(inputsContainer, resultComponent, inputTemplate);
  }