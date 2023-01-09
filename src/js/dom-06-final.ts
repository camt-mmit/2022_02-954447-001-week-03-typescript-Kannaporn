import { assign as assignInput } from './input.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputTemplate = document.querySelector<HTMLTemplateElement>('template#tmp-input');
  const inputSection = document.querySelector<HTMLElement>('.cmp-input-section');

  if(inputSection === null) {
    throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`)
  }

  if(inputTemplate === null) {
    throw new Error(`Cannot find 'template#tmp-input' in DOM tree.`)
  }
  assignInput(inputSection, inputTemplate);
});