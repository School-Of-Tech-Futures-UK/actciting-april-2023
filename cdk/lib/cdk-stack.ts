import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as route53 from 'aws-cdk-lib/aws-route53'


export interface ActcitingSettings extends cdk.StackProps {
  certArn: string,
  clusterArn: string,
  secretArn: string
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

  // API GW. 
  // Bootstrap should *not* be available in the API!
  const api = new apigw.RestApi(this, 'apigw',
    {
      description: `actciting-apigw`,
      restApiName: `actciting-apigw`,
      deployOptions: {
        stageName: 'api', // must be same as default route handing in Cloud Front Distribution below 
      },
      deploy: true, // always deploy,
      // set up CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type', 'Access-Control-Allow-Origin',
          'Access-Control-Request-Method', 'Access-Control-Request-Headers'
        ],
        allowMethods: [ 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE' ],
        allowCredentials: true,
        allowOrigins: [ '*' ], // Allow all. Could be [ 'http://localhost:3000', 'https://${fullDomain}' ],
      },
    })

    api.addUsagePlan('apigw-rate-limits', {
      name: `actciting-apigw-rate-limits`,
      throttle: {
        rateLimit: 10,
        burstLimit: 5
      }
    })

    // const getVenuesApi = api.root.addResource('venues')
    // getVenuesApi.addMethod(
    //   'GET',
    //   new apigw.LambdaIntegration(getVenuesLambda, { proxy: true }),
    // )

    // const getVenueByIdApi = api.root.addResource('venues')
    // getVenueByIdApi.addMethod(
    //   'GET',
    //   new apigw.LambdaIntegration(getVenueByIdLambda, { proxy: true }),
    // )

    // const postVenueApi = api.root.addResource('venues')
    // postVenueApi.addMethod(
    //   'POST',
    //   new apigw.LambdaIntegration(postVenueLambda, { proxy: true }),
    // )

    // const putVenueApi = api.root.addResource('venues')
    // putVenueApi.addMethod(
    //   'PUT',
    //   new apigw.LambdaIntegration(putVenueLambda, { proxy: true }),
    // )

    // const deleteVenueApi = api.root.addResource('venues')
    // deleteVenueApi.addMethod(
    //   'DELETE',
    //   new apigw.LambdaIntegration(deleteVenueLambda, { proxy: true }),
    // )

    // const getGigsApi = api.root.addResource('venues')
    // getGigsApi.addMethod(
    //   'GET',
    //   new apigw.LambdaIntegration(getGigsLambda, { proxy: true }),
    // )

    // const getGigByIdApi = api.root.addResource('venues')
    // getGigByIdApi.addMethod(
    //   'GET',
    //   new apigw.LambdaIntegration(getGigByIdLambda, { proxy: true }),
    // )

    // const getGigsByVenueApi = api.root.addResource('venues')
    // getGigsByVenueApi.addMethod(
    //   'GET',
    //   new apigw.LambdaIntegration(getGigsByVenueLambda, { proxy: true }),
    // )

    // const postGigApproveApi = api.root.addResource('venues')
    // postGigApproveApi.addMethod(
    //   'POST',
    //   new apigw.LambdaIntegration(postGigApproveLambda, { proxy: true }),
    // )

    // const postGigDenyApi = api.root.addResource('venues')
    // postGigDenyApi.addMethod(
    //   'POST',
    //   new apigw.LambdaIntegration(postGigDenyLambda, { proxy: true }),
    // )

  //Deployment 
  new s3Deployment.BucketDeployment(this, 'frontend-deployment', {
    destinationBucket: bucket,
    sources: [ s3Deployment.Source.asset('../Frontend/build') ], 
    retainOnDelete: false,
    prune: true,
    memoryLimit: 256, // in case folder is big
  })

  const domainName = 'actciting.sot-apr-23.com'

  //console 
  new cdk.CfnOutput(this, 'FrontendBucketName', {
    value: bucket.bucketName,
  })

  // Raw api url
  new cdk.CfnOutput(this, 'RawApiUrl', {
    value: api.url ?? 'NO_URL',
  })

  // Pretty api url
new cdk.CfnOutput(this, 'PrettyApiUrl', {
  value: `https://${domainName}/api/`,
  })

  //certification 
  const cert = acm.Certificate.fromCertificateArn(
    this,
    'cert',
    props.certArn
  )

  const redirectsFunction = new cloudfront.Function(this,'redirects-function',
    {
      code: cloudfront.FunctionCode.fromFile({
        filePath: 'functions/redirects.js',
      }),
    }
  )


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
    additionalBehaviors: {
      '/api/*': { // must be same as default stage name above in ApiGW
        origin: new origins.HttpOrigin(
          `${api.restApiId}.execute-api.${props!.env!.region}.amazonaws.com`,
          {
            // should be empty so we don't add extra path info 
            // else it won't match in the API-GW stage
            originPath: '/'
          }
        ),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      },
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
