import { mathsTemplates } from './maths';
import { englishTemplates } from './english';

export const templates = [...mathsTemplates, ...englishTemplates];

export type TemplateId = (typeof templates)[number]['id'];

export function getTemplateById(id: TemplateId) {
  return templates.find((template) => template.id === id);
}
