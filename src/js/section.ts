import { assign as assignInput } from './input.js';
import { CommandComponent} from './types.js';

function rebuildIndex(sectionsContainer:HTMLElement) {
    const inputSections = [
      ...sectionsContainer.querySelectorAll<HTMLElement>('.cmp-input-section'),
    ];
    inputSections.forEach((inputSection, index) => {
        [...inputSection.querySelectorAll<HTMLElement>('.cmp-section-no')].forEach((elem) => {
          elem.innerText = `${index +1}`;
        });
      
    
      [...inputSection.querySelectorAll<CommandComponent>('.cmd-remove-section')].forEach((elem) => {
        elem.disabled = inputSections.length > 1? false:true;
      },
      );
    });
}
function add(sectionsContainer:HTMLElement, sectionTemplate:HTMLTemplateElement, inputTemplate:HTMLTemplateElement) {
    const fragment = sectionTemplate.content.cloneNode(true) as DocumentFragment;
    const inputSection = fragment.querySelector('.cmp-input-section') as HTMLElement;
  
    sectionsContainer.append(fragment);
  
    console.debug(inputSection);

    rebuildIndex(sectionsContainer);
    if(inputSection === null) {
      throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`);
    }
    assignInput(inputSection, inputTemplate);
  }
  
  function remove(sectionsContainer:HTMLElement, inputSection:HTMLElement) {
    inputSection.remove();
  
    rebuildIndex(sectionsContainer);
  }
  export function assign(container:HTMLElement, sectionTemplate:HTMLTemplateElement, inputTemplate:HTMLTemplateElement) {
    const sectionsContainer = container.querySelector<HTMLElement>('.cmp-sections-container');
    
  container.addEventListener('click', (ev) => {
    if(ev.target) {
       if ((ev.target as HTMLElement).matches('.cmd-add-section')) {
        if(sectionsContainer === null) {
        throw new Error(`Cannot find '.cmp-add-section' in DOM tree.`);
       }
       add(sectionsContainer,sectionTemplate, inputTemplate);
       }
       
    }
  });

  container.addEventListener('click', (ev) => {
    if(ev.target) {
    const targetElement = ev.target as HTMLElement
    if (targetElement.matches('.cmd-remove-section')) {
      const inputSection = targetElement.closest('.cmp-input-section') as HTMLElement;

      if (inputSection === null) {
        throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`);
      }
      if(sectionsContainer === null) {
        throw new Error(`Cannot find '.cmp-input-section' in DOM tree.`);
       }
      remove(sectionsContainer, inputSection);
    }
  }
  });
  
  add(container, sectionTemplate, inputTemplate);
}