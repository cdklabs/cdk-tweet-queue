import { CdklabsConstructLibrary, JsiiLanguage } from 'cdklabs-projen-project-types';
import { NpmAccess } from 'projen/lib/javascript';

const project = new CdklabsConstructLibrary({
  name: 'cdk-tweet-queue',
  projenrcTs: true,
  description: 'Defines an SQS queue with tweet stream from a search',
  repository: 'https://github.com/cdklabs/cdk-tweet-queue',
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.236.0',
  minNodeVersion: '20.0.0',
  setNodeEngineVersion: false,
  defaultReleaseBranch: 'main',
  npmAccess: NpmAccess.PUBLIC,
  private: false,
  enablePRAutoMerge: true,
  jsiiTargetLanguages: [
    JsiiLanguage.DOTNET,
    JsiiLanguage.JAVA,
    JsiiLanguage.PYTHON,
  ],
  releaseToNpm: true,
  publishToNuget: {
    dotNetNamespace: 'Cdklabs.CdkTweetQueue',
    packageId: 'Cdklabs.CdkTweetQueue',
  },
  publishToMaven: {
    mavenGroupId: 'io.github.cdklabs',
    mavenServerId: 'central-ossrh',
    javaPackage: 'io.github.cdklabs.tweetqueue',
    mavenArtifactId: 'cdk-tweet-queue',
  },
  publishToPypi: {
    distName: 'cdk-tweet-queue',
    module: 'cdk_tweet_queue',
  },
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
});

// Mark package as stable without go publishing
project.package.addField('stability', 'stable');

// Remove integ task from test workflow (added by IntegRunner)
project.testTask.reset();
project.testTask.exec('jest --passWithNoTests --updateSnapshot');
const eslintTask = project.tasks.tryFind('eslint');
if (eslintTask) {
  project.testTask.spawn(eslintTask);
}

project.gitignore.exclude('cdk.out');

project.setScript('integ', "npx cdk -a 'node lib/__tests__/integ-test.js'");
const deploy = project.addTask('integ:deploy');
deploy.spawn(project.compileTask);
deploy.exec('yarn integ deploy');

const destroy = project.addTask('integ:destroy');
destroy.spawn(project.compileTask);
destroy.exec('yarn integ destroy');

project.synth();
