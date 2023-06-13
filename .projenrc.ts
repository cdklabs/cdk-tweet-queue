import { cdk } from 'projen';

const project = new cdk.JsiiProject({
  name: 'cdk-tweet-queue',
  projenrcTs: true,
  description: 'Defines an SQS queue with tweet stream from a search',
  author: 'Elad Ben-Israel',
  authorAddress: 'elad.benisrael@gmail.com',
  repositoryUrl: 'https://github.com/eladb/cdk-tweet-queue',
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
    'aws-cdk@^2.20.0',
    'aws-sdk',
    'twitter',
    '@types/twitter',
    'esbuild',
    'constructs',
  ],
  keywords: [
    'cdk',
    'aws-cdk@^2.20.0',
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
