function computeTotal(inputsContainer, resultComponent) {
    const inputContainers = [...inputsContainer.querySelectorAll('cmp-input-container'),];
    const total = inputContainers
        .map((elem) => elem.querySelector('input[type="number"]'))
        .filter((elem) => elem !== null)
        .reduce((carry, elem) => carry + elem.valueAsNumber, 0);
    resultComponent.value = `${total}`;
}
function rebuildIndex(inputsContainer) {
    const inputContainers = [
        ...inputsContainer.querySelectorAll('.cmp-input-container'),
    ];
    inputContainers.forEach((inputContainer, index) => {
        [...inputContainer.querySelectorAll('.cmp-input-no')].forEach((elem) => {
            elem.innerText = `${index + 1}`;
        });
    });
    [...inputsContainer.querySelectorAll('.cmd-remove-input')].forEach((elem) => {
        elem.disabled = inputContainers.length > 1 ? false : true;
    });
}
function add(inputsContainer, resultComponent, template) {
    const fragment = template.content.cloneNode(true);
    inputsContainer.append(fragment);
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
}
function remove(inputsContainer, resultComponent, inputContainer) {
    inputContainer.remove();
    rebuildIndex(inputsContainer);
    computeTotal(inputsContainer, resultComponent);
}
export function assign(container, inputTemplate) {
    const inputsContainer = container.querySelector('.cmp-inputs-container');
    const resultComponent = container.querySelector('.cmp-result');
    if (inputsContainer === null) {
        throw new Error(`Cannot find '.cmp-inputs-container' in container DOM tree.`);
    }
    if (resultComponent === null) {
        throw new Error(`Cannot find '.cmp-result' in container DOM tree.`);
    }
    container.addEventListener('click', (ev) => {
        if (ev.target) {
            if (ev.target.matches('.cmd-add-input')) {
                add(inputsContainer, resultComponent, inputTemplate);
            }
        }
    });
    inputsContainer.addEventListener('change', (ev) => {
        if (ev.target) {
            if (ev.target.matches('input[type="number"]')) {
                computeTotal(inputsContainer, resultComponent);
            }
        }
    });
    inputsContainer.addEventListener('click', (ev) => {
        if (ev.target) {
            const targetElement = ev.target;
            if (targetElement.matches('.cmd-remove-input')) {
                const inputContainer = targetElement.closest('.cmp-input-container');
                if (inputContainer === null) {
                    throw new Error(`Cannot find '.cmp-inputs-container' in parent path DOM tree.`);
                }
                remove(inputsContainer, resultComponent, inputContainer);
            }
        }
    });
    add(inputsContainer, resultComponent, inputTemplate);
}
