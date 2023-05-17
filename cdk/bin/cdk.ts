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
  clusterArn: 'arn:aws:rds:eu-west-2:645438430936:cluster:actsent-stack-rdscluster9d572005-rf41aba7zoc9',
  secretArn: 'arn:aws:secretsmanager:eu-west-2:645438430936:secret:rdsclusterSecret5F22C2CE-p8xEcaDMv252-xYLNp0',
  subDomain: 'actciting'
});