/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";
import { merge } from "lodash";
import { config } from "dotenv";

import { resourcesResume } from "./resources-resume";

import { authDomain } from "./src/api/auth";
import { templateDomain } from "./src/api/template";
import { resumeDomain } from "./src/api/resume";

config();

const baseConfig: Partial<AWS> = {
	configValidationMode: "error",
	plugins: [
		"serverless-webpack",
		"serverless-localstack",
	],
	frameworkVersion: "3",
	useDotenv: true,
	package: {
		individually: true,
	},
	custom: {
		region: {
			dev: "us-east-2",
			local: "us-east-2",
			production: "us-east-1",
		},
		localstack: {
			host: "http://localstack",
			stages: ["local"],
		},
	},
	provider: {
		name: "aws",
		region: "${self:custom.region.${opt:stage, 'dev'}}" as any,
		runtime: "nodejs14.x",
		memorySize: 512,
		timeout: 10,
		// logRetentionInDays: process.env.NODE_ENV === "production" ? 7 : 1,
		logRetentionInDays: 1,
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			STACK_NAME: "${self:service}-${opt:stage, 'dev'}",
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_PATH: "./:/opt/node_modules",
			NODE_ENV: "${opt:stage, 'dev'}",
			CLOUD_REGION: "${self:provider.region}",
		},
		iam: {
			role: {
				statements: [
					{
						Effect: "Allow",
						Action: [
							"s3:*",
							"lambda:*",
							"ssm:*",
							"rds-data:*",
							"sqs:*",
							"sns:*",
							"ses:*",
							"states:*",
							"dynamodb:*",
							"mediaconvert:*",
							"iam:*",
							"logs:*",
							"cloudfront:*",
						],
						Resource: "*",
					},
				]
			}
		},
		tags: {
			costs: "${self:service}-${opt:stage, 'dev'}",
			environment: "${opt:stage, 'dev'}",
		},
		stackTags: {
			costs: "${self:service}-${opt:stage, 'dev'}",
			environment: "${opt:stage, 'dev'}",
		},
	},
};

const authConfig = {
	service: "auth",
	provider: {
		environment: {
			SOURCE_EMAIL_TO_SEND_EMAILS: "${ssm:auth-${opt:stage, 'dev'}-sourceEmailToSendEmails}",
			VERIFY_ACCOUNT_URL: "${ssm:auth-${opt:stage, 'dev'}-verifyAccountUrl}",
		}
	},
	functions: {
		...authDomain,
	},
};

const resumeConfig = {
	service: "resume",
	provider: {
		environment: {
			GENERATE_RESUME_QUEUE_URL: {
				Ref: "GenerateResumeQueue",
			},
			GENERATE_RESUME_WORKFLOW: {
				"Fn::Sub":
					"arn:${AWS::Partition}:states:${AWS::Region}:${AWS::AccountId}:stateMachine:${AWS::StackName}-generate-resume",
			},
		}
	},
	resources: resourcesResume,
	functions: {
		...resumeDomain,
	},
};

const templateConfig = {
	service: "template",
	functions: {
		...templateDomain,
	},
};

const getConfig = () => {
	switch (process.env.DEPLOY_TYPE) {
		case "TEMPLATE":
			return merge(baseConfig, templateConfig);

		case "RESUME":
			return merge(baseConfig, resumeConfig);

		case "AUTH":
		default:
			return merge(baseConfig, authConfig);
	}
};

const serverlessConfig = getConfig();

//@ts-ignore
export = serverlessConfig;
