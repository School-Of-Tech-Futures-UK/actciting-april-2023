import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'


export interface ActcitingSettings extends cdk.StackProps {
  certArn: string

}


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ActcitingSettings) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this, 'frontend-hosting', {
      bucketName: 'actciting-frontend',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED
    })
    bucket.addToResourcePolicy( // security
  new iam.PolicyStatement({
  resources: [
  bucket.arnForObjects('*'),
  bucket.bucketArn
  ],
  actions: [ 's3:*' ],
  effect: iam.Effect.DENY,
  conditions: {
  Bool: { 'aws:SecureTransport': 'false' }
  },
  principals: [ new iam.AnyPrincipal() ],
  })
  )

  //Deployment 
  new s3Deployment.BucketDeployment(this,
    'frontend-deployment'
    , {
    destinationBucket: bucket,
    sources: [ s3Deployment.Source.asset('../Frontend/build') ], 
    retainOnDelete: false,
    prune: true,
    memoryLimit: 256, // in case folder is big
    })


  //console 
  new cdk.CfnOutput(this,
      'FrontendBucketName'
      , {
      value: bucket.bucketName,
      })
    

  //certification 
  const cert = acm.Certificate.fromCertificateArn(
    this,
    'cert',
    props.certArn

  )

  const redirectsFunction = new cloudfront.Function(this,
    'redirects-function',
    {
      code: cloudfront.FunctionCode.fromFile({
        filePath: 'functions/redirects.js',
      }),
    }
  )
  const domainName = 'actciting.sot-apr-23.com'
  //cloudfront distribution 
  const frontendDistribution = new cloudfront.Distribution(this, 'frontend-distribution',
  {
    defaultBehavior: {
      origin: new origins.S3Origin(bucket),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      functionAssociations: [ // extra bit here
            { // redirects handler
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: redirectsFunction,
            },
          ],
    },
    priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    defaultRootObject: 'index.html',
    domainNames: [domainName],
    certificate: cert,

  }
  
)





//base url 
const zone = route53.HostedZone.fromLookup(this, 'zone', {
  domainName: 'sot-apr-23.com'
})


new route53.CnameRecord(this, 'client-record', {
  zone,
  domainName: frontendDistribution.domainName,
  recordName: domainName,
})




    
  }
}
