const { JsiiProject } = require('projen');

const cdkDeps = [
  '@aws-cdk/aws-dynamodb',
  '@aws-cdk/aws-events',
  '@aws-cdk/aws-events-targets',
  '@aws-cdk/aws-iam',
  '@aws-cdk/aws-lambda',
  '@aws-cdk/aws-sqs',
  '@aws-cdk/core',
  '@aws-cdk/aws-lambda-nodejs',
  'constructs',
];

const project = new JsiiProject({
  name: 'cdk-tweet-queue',
  description: 'Defines an SQS queue with tweet stream from a search',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'elad.benisrael@gmail.com',
  repository: 'https://github.com/eladb/cdk-tweet-queue',
  releaseToNpm: true,
  publishToNuget: {
    dotNetNamespace: 'Eladb.CdkTweetQueue',
    packageId: 'Eladb.CdkTweetQueue',
  },
  publishToMaven: {
    javaPackage: 'com.github.eladb.tweetqueue',
    mavenArtifactId: 'cdk-tweet-queue',
    mavenGroupId: 'com.github.eladb',
  },
  publishToPypi: {
    distName: 'cdk-tweet-queue',
    module: 'cdk_tweet_queue',
  },
  defaultReleaseBranch: 'master',
  deps: cdkDeps,
  peerDeps: cdkDeps,
  devDeps: [
    'aws-cdk',
    'aws-sdk',
    'twitter',
    '@types/twitter',
    '@aws-cdk/assert',
    'esbuild',
  ],
  keywords: [
    'cdk',
    'aws-cdk',
    'twitter',
    'constructs',
  ],
  srcdir: 'lib',
  testdir: 'lib/__tests__',
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