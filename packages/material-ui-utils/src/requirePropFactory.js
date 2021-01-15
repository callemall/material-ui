export default function requirePropFactory(componentNameInError, Component) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  // eslint-disable-next-line react/forbid-foreign-prop-types
  const prevPropTypes = Component ? { ...Component.propTypes } : null;

  const requireProp = (requiredProp) => (
    props,
    propName,
    componentName,
    location,
    propFullName,
  ) => {
    const propFullNameSafe = propFullName || propName;

    const defaultTypeChecker = prevPropTypes?.[propFullNameSafe];
    let defaultTypeCheckerResult = null;

    if (defaultTypeChecker) {
      defaultTypeCheckerResult = defaultTypeChecker(
        props,
        propName,
        componentName,
        location,
        propFullName,
      );
    }

    if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
      return new Error(
        `The prop \`${propFullNameSafe}\` of ` +
          `\`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`,
      );
    }

    return defaultTypeCheckerResult;
  };
  return requireProp;
}
