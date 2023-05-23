import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as rds from 'aws-cdk-lib/aws-rds'

export interface ActcitingSettings extends cdk.StackProps {
  certArn: string,
  subDomain: string
  clusterArn: string,
  secretArn: string
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ActcitingSettings) {
    super(scope, id, props)

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

    // lambda function definition

    const lambdaEnvVars = {
      NODE_ENV: 'production',
      // AWS specific var to reuse TCP connection
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SECRET_ARN: props.secretArn,
      CLUSTER_ARN: props.clusterArn,
      DATABASE_NAME: 'dev'
    }
    


    const getVenuesLambda = new nodejs.NodejsFunction(this, 'venues-get-lambda',
      {
        functionName: `${props.subDomain}-venues-get-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/venues-lambdas.ts',//folder that dan makes
        handler: 'getVenuesHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )
    const secretsManagerPermissions = new iam.PolicyStatement({
      actions: [
        'secretsmanager:DescribeSecret',
        'secretsmanager:GetSecretValue'
      ],
      effect: iam.Effect.ALLOW,
      resources: [
        '*'
      ]
    })

    getVenuesLambda.addToRolePolicy(secretsManagerPermissions)

    const getVenueByIdLambda = new nodejs.NodejsFunction(this, 'venues-get-by-Id-lambda',
      {
        functionName: `${props.subDomain}-venues-get-by-Id-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/venues-lambdas.ts',//folder that dan makes
        handler: 'getVenueByIdHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )
    getVenueByIdLambda.addToRolePolicy(secretsManagerPermissions)

    const createVenueLambda = new nodejs.NodejsFunction(this, 'create-venue-lambda',
      {
        functionName: `${props.subDomain}-create-venue-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/venues-lambdas.ts',//folder that dan makes
        handler: 'createVenueHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )
    createVenueLambda.addToRolePolicy(secretsManagerPermissions)
    const UpdateVenueLambda = new nodejs.NodejsFunction(this, 'update-venue-lambda',
      {
        functionName: `${props.subDomain}-update-venue-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/venues-lambdas.ts',//folder that dan makes
        handler: 'updateVenueHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )


    UpdateVenueLambda.addToRolePolicy(secretsManagerPermissions)

    const deleteVenueLambda = new nodejs.NodejsFunction(this, 'delete-venue-lambda',
      {
        functionName: `${props.subDomain}-delete-venue-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/venues-lambdas.ts',//folder that dan makes
        handler: 'deleteVenueHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )

    deleteVenueLambda.addToRolePolicy(secretsManagerPermissions)
    const getGigsLambda = new nodejs.NodejsFunction(this, 'get-gigs-lambda',
      {
        functionName: `${props.subDomain}-get-gigs-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/gig-lambdas.ts',//folder that dan makes
        handler: 'getGigsHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )

    getGigsLambda.addToRolePolicy(secretsManagerPermissions)
    const getGigByIdLambda = new nodejs.NodejsFunction(this, 'get-gig-by-Id-lambda',
      {
        functionName: `${props.subDomain}-get-gig-by-Id-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/gig-lambdas.ts',//folder that dan makes
        handler: 'getGigByIdHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )

    getGigByIdLambda.addToRolePolicy(secretsManagerPermissions)
    const getGigsByVenueLambda = new nodejs.NodejsFunction(this, 'get-gig-by-Venue-lambda',
      {
        functionName: `${props.subDomain}-get-gig-by-Venue-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/gig-lambdas.ts',//folder that dan makes
        handler: 'getGigsByVenueHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )

    getGigsByVenueLambda.addToRolePolicy(secretsManagerPermissions)
    const gigApproveLambda = new nodejs.NodejsFunction(this, 'gig-approve-lambda',
      {
        functionName: `${props.subDomain}-gig-approve-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/gig-lambdas.ts',//folder that dan makes
        handler: 'gigApproveHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )

    gigApproveLambda.addToRolePolicy(secretsManagerPermissions)
    const gigDenyLambda = new nodejs.NodejsFunction(this, 'gig-deny-lambda',
      {
        functionName: `${props.subDomain}-gig-deny-lambda`,
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: './functions/gig-lambdas.ts',//folder that dan makes
        handler: 'gigDenyHandler',//name of the handler that dan is making
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
      }
    )

    gigDenyLambda.addToRolePolicy(secretsManagerPermissions)

    const cluster = rds.ServerlessCluster.fromServerlessClusterAttributes(this, 'database-cluster', {
      clusterIdentifier: 'actsent-stack-rdscluster9d572005-rf41aba7zoc9'
    })

    // Venue lambda permissions
    cluster.grantDataApiAccess(getVenuesLambda)
    cluster.grantDataApiAccess(getVenueByIdLambda)
    cluster.grantDataApiAccess(getVenuesLambda)
    cluster.grantDataApiAccess(createVenueLambda)
    cluster.grantDataApiAccess(UpdateVenueLambda)
    cluster.grantDataApiAccess(deleteVenueLambda)

    // Gigs lambda permissions
    cluster.grantDataApiAccess(getGigByIdLambda)
    cluster.grantDataApiAccess(getGigsLambda)
    cluster.grantDataApiAccess(getGigsByVenueLambda)
    cluster.grantDataApiAccess(gigApproveLambda)
    cluster.grantDataApiAccess(gigDenyLambda)

    const venuesResource = api.root.addResource('venues')
    venuesResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(getVenuesLambda, { proxy: true }),
    )

    const venuesIdResource = venuesResource.addResource('{venue_id}')

    venuesIdResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(getVenueByIdLambda, { proxy: true }),
    )

    venuesResource.addMethod(
      'POST',
      new apigw.LambdaIntegration(createVenueLambda, { proxy: true }),
    )

    venuesIdResource.addMethod(
      'PUT',
      new apigw.LambdaIntegration(UpdateVenueLambda, { proxy: true }),
    )

    venuesIdResource.addMethod(
      'DELETE',
      new apigw.LambdaIntegration(deleteVenueLambda, { proxy: true }),
    )


    // /gigs/id/venue/id

    // /gigs-by-venue api.root.addResource('gigs-by-venue')
    // /gigs-by-venue/:id gigByVenueResource('{venue_id}')


    // Get all gigs gigs/
    const gigsResource = api.root.addResource('gigs')
    gigsResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(getGigsLambda, { proxy: true }),
    )

    // Gigs by id GET gigs/id:
    const gigsIdResource = gigsResource.addResource('{request_id}')
    gigsIdResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(getGigByIdLambda, { proxy: true }),
    )

    // Get gigs by venue gigs-by-venue/id:
    const gigsByVenueResource = api.root.addResource('gigs-by-venue')
    const gigsByVenueIdResource = gigsByVenueResource.addResource('{request_id}')
    gigsByVenueIdResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(getGigsByVenueLambda, { proxy: true }),
    )

    const approveGigsResource = api.root.addResource('gig-approve')
    const gigToBeApprovedResource = approveGigsResource.addResource('{request_id}')
    //PUT gig-approve/id:
    gigToBeApprovedResource.addMethod(
      'POST',
      new apigw.LambdaIntegration(gigApproveLambda, { proxy: true }),
    )

    const denyGigResource = api.root.addResource('gig-deny')
    const gigToBeDeniedResource = denyGigResource.addResource('{request_id}')
    //'PUT gig-deny/id:'
    gigToBeDeniedResource.addMethod(
      'POST',
      new apigw.LambdaIntegration(gigDenyLambda, { proxy: true }),
    )

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
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED
        },
        additionalBehaviors: {
          '/api/*': { // must be same as default stage name above in ApiGW
            origin: new origins.HttpOrigin(
              `${api.restApiId}.execute-api.${props.env!.region}.amazonaws.com`, // eslint-disable-line @typescript-eslint/no-non-null-assertion
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

