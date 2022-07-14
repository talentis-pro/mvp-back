/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

const lambdaArnPrefix = "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${AWS::StackName}"

export const resourcesResume: AWS["resources"] = {
	Resources: {
		GenerateResumeQueue: {
			Type: "AWS::SQS::Queue",
			Properties: {
				QueueName: "${self:service}-${opt:stage, 'dev'}-generate-resume",
			},
		},
		StepFunctionsServiceRole: {
			Type: "AWS::IAM::Role",
			Properties: {
				AssumeRolePolicyDocument: {
					Version: "2012-10-17",
					Statement: [
						{
							Effect: "Allow",
							Principal: {
								Service: [
									{
										"Fn::Sub": "states.${AWS::Region}.amazonaws.com",
									},
								],
							},
							Action: ["sts:AssumeRole"],
						},
					],
				},
				Policies: [
					{
						PolicyName: {
							"Fn::Sub": "${AWS::StackName}-stepfunctions-service-role",
						},
						PolicyDocument: {
							Statement: [
								{
									Effect: "Allow",
									Action: ["lambda:InvokeFunction"],
									Resource: [
										{
											"Fn::Sub":
												"arn:${AWS::Partition}:lambda:${AWS::Region}:${AWS::AccountId}:function:*",
										},
									],
								},
							],
						},
					},
				],
			},
			Metadata: {
				cfn_nag: {
					rules_to_suppress: [
						{
							id: "W11",
							reason:
								"The * resource is required since the functions need to be created before the state machine",
						},
					],
				},
			},
		},
		GenerateResumeWorkflow: {
			Type: "AWS::StepFunctions::StateMachine",
			Properties: {
				StateMachineName: {
					"Fn::Sub": "${AWS::StackName}-generate-resume",
				},
				DefinitionString: {
					"Fn::Sub": JSON.stringify({
						StartAt: "Generate Resume",
						States: {
							"Get Resume Data": {
								Type: "Task",
								Resource: `${lambdaArnPrefix}-grGetResumeData`,
								Next: "Get PhrasesToFill",
							},
							"Get PhrasesToFill": {
								Type: "Task",
								Resource: `${lambdaArnPrefix}-grGetPhrasesToFill`,
								Next: "Get Months",
							},
							"Get Months": {
								Type: "Task",
								Resource: `${lambdaArnPrefix}-grGetMonths`,
								Next: "Get Fonts",
							},
							"Get Fonts": {
								Type: "Task",
								Resource: `${lambdaArnPrefix}-grGetFonts`,
								Next: "Chose Template",
							},
							"Chose Template": {
								Type: "Choice",
								Choices: [
									{
										Variable: "$.templateId",
										StringEquals: "MINIMALIST",
										Next: "Generate Minimalist Resume"
									}
								],
								Default: "Invalid Template",
							},
							"Generate Minimalist Resume": {
								Type: "Task",
								Resource: `${lambdaArnPrefix}-grGenerateMinimalist`,
								Next: "Update Resume",
							},
							"Invalid Template": {
								Type: "Fail",
								Cause: "Invalid Template!"
							},
							"Update Resume": {
								Type: "Task",
								Resource: `${lambdaArnPrefix}-grUpdateResume`,
								End: true,
							},
						},
					}),
				},
				RoleArn: {
					"Fn::GetAtt": ["StepFunctionsServiceRole", "Arn"],
				},
			},
		},
	},
};
