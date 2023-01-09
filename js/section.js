import { assign as assignInput } from './input.js';
function rebuildIndex(sectionsContainer) {
    const inputSections = [
        ...sectionsContainer.querySelectorAll('.cmp-input-section'),
    ];
    inputSections.forEach((inputSection, index) => {
        [...inputSection.querySelectorAll('.cmp-section-no')].forEach((elem) => {
            elem.innerText = `${index + 1}`;
        });
        [...inputSection.querySelectorAll('.cmd-remove-section')].forEach((elem) => {
            elem.disabled = inputSections.length > 1 ? false : true;
        });
    });
}
function add(sectionsContainer, sectionTemplate, inputTemplate) {
    const fragment = sectionTemplate.content.cloneNode(true);
    const inputSection = fragment.querySelector('.cmp-input-section');
    sectionsContainer.append(fragment);
    console.debug(inputSection);
    rebuildIndex(sectionsContainer);
    if (inputSection === null) {
        throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`);
    }
    assignInput(inputSection, inputTemplate);
}
function remove(sectionsContainer, inputSection) {
    inputSection.remove();
    rebuildIndex(sectionsContainer);
}
export function assign(container, sectionTemplate, inputTemplate) {
    const sectionsContainer = container.querySelector('.cmp-sections-container');
    container.addEventListener('click', (ev) => {
        if (ev.target) {
            if (ev.target.matches('.cmd-add-section')) {
                if (sectionsContainer === null) {
                    throw new Error(`Cannot find '.cmp-add-section' in DOM tree.`);
                }
                add(sectionsContainer, sectionTemplate, inputTemplate);
            }
        }
    });
    container.addEventListener('click', (ev) => {
        if (ev.target) {
            const targetElement = ev.target;
            if (targetElement.matches('.cmd-remove-section')) {
                const inputSection = targetElement.closest('.cmp-input-section');
                if (inputSection === null) {
                    throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`);
                }
                if (sectionsContainer === null) {
                    throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`);
                }
                remove(sectionsContainer, inputSection);
            }
        }
    });
    add(container, sectionTemplate, inputTemplate);
}
