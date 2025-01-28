resource "aws_signer_signing_profile" "prod_sp" {
  platform_id = "AWSLambda-SHA384-ECDSA"
  name_prefix = "prod_sp_"

  signature_validity_period {
    value = 135
    type  = "MONTHS"
  }
}

resource "aws_lambda_code_signing_config" "lambda_csc" {
  allowed_publishers {
    signing_profile_version_arns = [
      aws_signer_signing_profile.prod_sp.arn,
    ]
  }

  policies {
    untrusted_artifact_on_deployment = "Warn"
  }

  description = "For Lambda functions"

  code_signature_configs {
    allowed_content_types = ["ZIP"]
  }
}