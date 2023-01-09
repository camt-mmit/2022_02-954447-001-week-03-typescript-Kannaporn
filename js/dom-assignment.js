import { assign as assignInput } from './section.js';
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.cmp-main-container');
    const sectionTemplate = document.querySelector('template#tmp-section');
    const inputTemplate = document.querySelector('template#tmp-input');
    console.debug(mainContainer, sectionTemplate, inputTemplate);
    if (mainContainer === null) {
        throw new Error(`Can not find '.cmp-main-container' in DOM tree`);
    }
    if (sectionTemplate === null) {
        throw new Error(`Can not find 'template#tmp-section' in DOM tree`);
    }
    if (inputTemplate === null) {
        throw new Error(`Can not find 'template#tmp-input' in DOM tree`);
    }
    assignInput(mainContainer, sectionTemplate, inputTemplate);
});
