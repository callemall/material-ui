import React from 'react';
import ApiDocs from 'docs/src/modules/components/ApiDocs';
import mapApiTranslations from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './alert.json';

export async function getStaticProps() {
  const req1 = require.context('docs/translations', false, /component-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-descriptions.*.json$/);
  const req4 = require.context('docs/translations', false, /class-conditions.*.json$/);

  const componentDescription = mapApiTranslations(req1, 'Alert');
  const propDescriptions = mapApiTranslations(req2, 'Alert');
  const classDescriptions = mapApiTranslations(req3, 'Alert');
  const classConditions = mapApiTranslations(req4, 'Alert');

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
