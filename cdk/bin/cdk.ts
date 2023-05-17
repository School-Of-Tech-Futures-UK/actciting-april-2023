#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'CdkStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT || 'NOT_SET', 
    region: 'eu-west-2'
  },
  certArn: 'arn:aws:acm:us-east-1:645438430936:certificate/035958ff-72c4-4f4d-948c-4bc92f3e7786',
  clusterArn: cdk.Fn.importValue('ClusterArn'),
  secretArn: cdk.Fn.importValue('SecretArn')
});