const { cdk } = require('projen');

const project = new cdk.JsiiProject({
  name: 'cdk-tweet-queue',
  description: 'Defines an SQS queue with tweet stream from a search',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'elad.benisrael@gmail.com',
  repository: 'https://github.com/eladb/cdk-tweet-queue',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  releaseToNpm: true,
  publishToNuget: {
    dotNetNamespace: 'Cdklabs.CdkTweetQueue',
    packageId: 'Cdklabs.CdkTweetQueue',
  },
  publishToMaven: {
    mavenGroupId: 'io.github.cdklabs',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
    javaPackage: 'io.github.cdklabs.tweetqueue',
    mavenArtifactId: 'cdk-tweet-queue',
  },
  publishToPypi: {
    distName: 'cdk-tweet-queue',
    module: 'cdk_tweet_queue',
  },
  defaultReleaseBranch: 'master',
  deps: [
    'aws-cdk-lib',
    'constructs',
  ],
  peerDeps: [
    'aws-cdk-lib',
    'constructs',
  ],
  devDeps: [
    'aws-cdk-lib',
    'aws-cdk',
    'aws-sdk',
    'twitter',
    '@types/twitter',
    'esbuild',
    'constructs',
  ],
  keywords: [
    'cdk',
    'aws-cdk',
    'twitter',
    'constructs',
  ],
  srcdir: 'lib',
  testdir: 'lib/__tests__',
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
});

project.gitignore.exclude('cdk.out');

project.setScript('integ', "npx cdk -a 'node lib/__tests__/integ-test.js'");
const deploy = project.addTask('integ:deploy');
deploy.spawn(project.compileTask);
deploy.exec('yarn integ deploy');

const destroy = project.addTask('integ:destroy');
destroy.spawn(project.compileTask);
destroy.exec('yarn integ destroy');

project.synth();
