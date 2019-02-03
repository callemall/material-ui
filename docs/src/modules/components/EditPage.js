import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const LANGUAGES = { zh: 'zh-CN', pt: 'pt-BZ', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://translate.material-ui.com/project/material-ui-docs/';

function EditPage(props) {
  const { markdownLocation, sourceCodeRootUrl, t, userLanguage } = props;
  const crowdInLanguage = LANGUAGES[userLanguage] || userLanguage;
  const crowdInPath = markdownLocation.substring(0, markdownLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
      href={
        userLanguage === 'en'
          ? `${sourceCodeRootUrl}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLanguage}#/master${crowdInPath}`
      }
      target="_blank"
      rel="noopener"
      data-ga-event-category="l10n"
      data-ga-event-action="edit"
      data-ga-event-label={userLanguage}
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
  sourceCodeRootUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  userLanguage: PropTypes.string.isRequired,
};

export default connect(state => ({
  t: state.options.t,
  userLanguage: state.options.userLanguage,
}))(EditPage);
