import React from 'react';
import ApiDocs from 'docs/src/modules/components/ApiDocs';
import mapApiTranslations from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './input-label.json';

export async function getStaticProps() {
  const req1 = require.context('docs/translations', false, /component-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-descriptions.*.json$/);
  const req4 = require.context('docs/translations', false, /class-conditions.*.json$/);

  const componentDescription = mapApiTranslations(req1, 'InputLabel');
  const propDescriptions = mapApiTranslations(req2, 'InputLabel');
  const classDescriptions = mapApiTranslations(req3, 'InputLabel');
  const classConditions = mapApiTranslations(req4, 'InputLabel');

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
