export default function deprecatedPropType(validator, reason) {
  return (props, propName, componentName, location, propFullName) => {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined') {
      return new Error(
        `The ${location} \`${propFullNameSafe}\` of ` +
          `\`${componentNameSafe}\` is deprecated. ${reason}`,
      );
    }

    return null;
  };
}
