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
}

resource "aws_signer_signing_job" "unique_signing_job" {
  profile_name = aws_signer_signing_profile.prod_sp.name

  source {
    s3 {
      bucket  = "awsjameslo-terraform-lambda-deployment"
      key     = "lambda_check_unique.zip"
      version = aws_s3_object.lambda_check_unique.version_id
    }
  }

  destination {
    s3 {
      bucket = "awsjameslo-terraform-lambda-deployment"
    }
  }
}

resource "aws_signer_signing_job" "counter_signing_job" {
  profile_name = aws_signer_signing_profile.prod_sp.name

  source {
    s3 {
      bucket  = "awsjameslo-terraform-lambda-deployment"
      key     = "lambda_get_counter.zip"
      version = aws_s3_object.lambda_get_counter.version_id
    }
  }

  destination {
    s3 {
      bucket = "awsjameslo-terraform-lambda-deployment"
    }
  }
}

resource "aws_signer_signing_job" "increment_signing_job" {
  profile_name = aws_signer_signing_profile.prod_sp.name

  source {
    s3 {
      bucket  = "awsjameslo-terraform-lambda-deployment"
      key     = "lambda_increment_counter.zip"
      version = aws_s3_object.lambda_increment_counter.version_id
    }
  }

  destination {
    s3 {
      bucket = "awsjameslo-terraform-lambda-deployment"
    }
  }
}