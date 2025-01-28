resource "aws_signer_signing_profile" "prod_sp" {
  platform_id = "AWSLambda-SHA384-ECDSA"
  name_prefix = "prod_sp_"

  signature_validity_period {
    value = 135
    type  = "MONTHS"
  }
}