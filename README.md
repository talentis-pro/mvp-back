# Proximos passos

- Create lambda triggered by the SQS queue
  - Integrar Symb no projeto
  - Criar uma funcao q recebe o url, e a partir do URL atualiza/cria um registro no dynamo
- Descobrir como criar topicos em diferentes regioes no SNS (como o cara diz aqui https://stackoverflow.com/questions/53179828/sns-to-sqs-vs-direct-sqs-put-in-lambdaedge-applications)
- Subscribe SQS to all SNS topics
- Descobrir qual vai ser o preco cobrado por mb usado
  - Fazer o calculo de quanto é gasto por mb consumido (video 1080p)

# Orcamento

```
Lambda@Edge (1 view) -> $0.000063

CloudFront (1 view) -> $0.085

---

Lambda@Edge (10.000 views) -> $0.63

SNS (1.010.000 messages) -> Free

SQS (1.010.000) -> $0.5 SQS

Lambda (150.000.000 ms 128mb) -> $1.25

DynamoDB -> ???

CloudFront (1TB)
	Transfer-Out (112GB) -> $9.6
	Requests (1.010.000 requests) -> Free

S3
	Storage (5GB) -> $0.115
	HEAD requests to get file size (1.010.000 requests) -> $0.41

TOTAL -> $15

---

Lambda@Edge (100.000 views) -> $6.3

SNS (10.100.000 messages) -> Free

SQS (10.100.000 messages) -> $5 SQS

Lambda (1.500.000.000 ms 128mb) -> $12.5

DynamoDB -> ???

CloudFront
	Transfer-Out (1.397GB) -> $118.75
	Requests (10.100.000 requests) -> $0.075

S3
	Storage (10GB) -> $0.23
	HEAD requests to get file size (10.100.000 requests) -> $4.05
```
