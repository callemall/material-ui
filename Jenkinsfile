node {
  stage('SCM') {
    git 'https://github.com/Destinycky04/material-ui.git'
  }
   
  stage('Install dependencies') {
    bat "yarn install"
    bat "yarn add -D -W mocha-sonar-reporter"
  }
   
  stage('Prettier') {
    bat "yarn prettier check-changed"
  }
   
  stage('Lint') {
    catchError {
      bat "yarn lint:ci"
    }
  }
   
  stage('Testing') {
    try {
      bat "yarn test:coverage mocha-sonar-reporter --report-dir=.nyc_coverage"
    } catch(err) {
      echo "${err}"
    }
  }
   
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonarScanner 4.4';
      withSonarQubeEnv('SonarCloud') { // If you have configured more than one global server connection, you can specify its name
      bat "${scannerHome}/bin/sonar-scanner"
    }
  }
  
  stage('Build') {
    bat "echo Built"
  }
}
