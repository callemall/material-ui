import React from 'react';
import ApiDocs from 'docs/src/modules/components/ApiDocs';
import mapApiTranslations from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './native-select.json';

export async function getStaticProps() {
  const req1 = require.context('docs/translations', false, /component-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-descriptions.*.json$/);
  const req4 = require.context('docs/translations', false, /class-conditions.*.json$/);

  const componentDescription = mapApiTranslations(req1, 'NativeSelect');
  const propDescriptions = mapApiTranslations(req2, 'NativeSelect');
  const classDescriptions = mapApiTranslations(req3, 'NativeSelect');
  const classConditions = mapApiTranslations(req4, 'NativeSelect');

  const pageContent = {
    ...jsonPageContent,
    componentDescription,
    propDescriptions,
    classDescriptions,
    classConditions,
  };

  return {
    props: { pageContent },
  };
}

export default function Page({ pageContent }) {
  return <ApiDocs pageContent={pageContent} />;
}
