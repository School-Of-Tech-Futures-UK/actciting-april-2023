import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as lambda from 'aws-cdk-lib/aws-lambda'

export interface ActcitingSettings extends cdk.StackProps {
  certArn: string,
  subDomain: string
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


// lambda function definition


const getVenuesLambda = new nodejs.NodejsFunction(this, 'venues-get-lambda',
{
  functionName: `${props.subDomain}-venues-get-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/venues-lambdas.ts',//folder that dan makes
  handler: 'getVenuesHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const getVenueByIdLambda = new nodejs.NodejsFunction(this, 'venues-get-by-Id-lambda',
{
  functionName: `${props.subDomain}-venues-get-by-Id-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/venues-lambdas.ts',//folder that dan makes
  handler: 'getVenuesByIdHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)
    
const createVenueLambda = new nodejs.NodejsFunction(this, 'create-venue-lambda',
{
  functionName: `${props.subDomain}-create-venue-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/venues-lambdas.ts',//folder that dan makes
  handler: 'createVenueHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const UpdateVenueLambda = new nodejs.NodejsFunction(this, 'update-venue-lambda',
{
  functionName: `${props.subDomain}-update-venue-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/venues-lambdas.ts',//folder that dan makes
  handler: 'updateVenueHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)


const deleteVenueLambda = new nodejs.NodejsFunction(this, 'delete-venue-lambda',
{
  functionName: `${props.subDomain}-delete-venue-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/venues-lambdas.ts',//folder that dan makes
  handler: 'deleteVenueHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const getGigsLambda = new nodejs.NodejsFunction(this, 'get-gigs-lambda',
{
  functionName: `${props.subDomain}-get-gigs-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/gig-lambdas.ts',//folder that dan makes
  handler: 'getGigsHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const getGigByIdLambda = new nodejs.NodejsFunction(this, 'get-gig-by-Id-lambda',
{
  functionName: `${props.subDomain}-get-gig-by-Id-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/gig-lambdas.ts',//folder that dan makes
  handler: 'getGigByIdHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const getGigsByVenueLambda = new nodejs.NodejsFunction(this, 'get-gig-by-Venue-lambda',
{
  functionName: `${props.subDomain}-get-gig-by-Venue-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/gig-lambdas.ts',//folder that dan makes
  handler: 'getGigsByVenueHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const gigApproveLambda = new nodejs.NodejsFunction(this, 'gig-approve-lambda',
{
  functionName: `${props.subDomain}-gig-approve-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/gig-lambdas.ts',//folder that dan makes
  handler: 'gigApproveHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)

const gigDenyLambda = new nodejs.NodejsFunction(this, 'gig-deny-lambda',
{
  functionName: `${props.subDomain}-gig-deny-lambda`,
  runtime: lambda.Runtime.NODEJS_18_X,
  entry: './functions/gig-lambdas.ts',//folder that dan makes
  handler: 'gigDenyHandler',//name of the handler that dan is making
  environment: lambdaEnvVars,
  timeout: cdk.Duration.seconds(30),
  bundling,
}
)


  }
}

