/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "homolog" | "local" | "production" | "test";
			/**
			 * Localstack
			 */
			LOCALSTACK_HOSTNAME?: string;
			/**
			 * AWS
			 */
			CLOUD_REGION: string;
			STACK_NAME: string;
			AWS_REGION: string;
			AWS_LAMBDA_FUNCTION_NAME: string;
			AWS_ACCESS_KEY_ID: string;
			AWS_SECRET_ACCESS_KEY: string;
			/**
			 * Aurora
			 */
			PGHOST: string;
			PGUSER: string;
			PGDATABASE: string;
			PGPASSWORD: string;
			PGPORT: string;
			/**
			 * Paseto
			 */
			PASETO_SECRET: string;
			/**
			 * SQS
			 */
			GENERATE_RESUME_QUEUE_URL: string;
			/**
			 * Step Functions
			 */
			GENERATE_RESUME_WORKFLOW: string;
			/**
			 * Lambdas
			 */
			UPDATE_RESUME_STATUS_LAMBDA_ARN: string;
		}
	}
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
