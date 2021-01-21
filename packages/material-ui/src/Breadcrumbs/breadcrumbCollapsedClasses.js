import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getBreadcrumbCollapsedUtilityClass(slot) {
  return generateUtilityClass('PrivateBreadcrumbCollapsed', slot);
}

const breadcrumbCollapsedClasses = generateUtilityClasses('PrivateBreadcrumbCollapsed', [
  'root',
  'button',
  'icon',
]);

export default breadcrumbCollapsedClasses;
