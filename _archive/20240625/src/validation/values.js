const NODE_TYPES = [
  'provider',
  'resource',
  'data',
  'variable',
  'output',
  'module',
  'locals',
  'terraform',
  'backend',
  'moved'
];
const AZURE_TAGGABLE = [
  "azurerm_api_management",
  "azurerm_app_service",
  "azurerm_app_service_plan",
  "azurerm_application_gateway",
  "azurerm_application_security_group",
  "azurerm_batch_account",
  "azurerm_cdn_endpoint",
  "azurerm_cdn_profile",
  "azurerm_container_group",
  "azurerm_container_registry",
  "azurerm_cosmosdb_account",
  "azurerm_data_factory",
  "azurerm_data_lake_store",
  "azurerm_disk_encryption_set",
  "azurerm_dns_zone",
  "azurerm_eventhub_namespace",
  "azurerm_function_app",
  "azurerm_hdinsight_cluster",
  "azurerm_image",
  "azurerm_key_vault",
  "azurerm_kubernetes_cluster",
  "azurerm_lb",
  "azurerm_log_analytics_workspace",
  "azurerm_managed_disk",
  "azurerm_network_interface",
  "azurerm_network_security_group",
  "azurerm_network_watcher",
  "azurerm_public_ip",
  "azurerm_recovery_services_vault",
  "azurerm_redis_cache",
  "azurerm_resource_group",
  "azurerm_role_assignment",
  "azurerm_route_table",
  "azurerm_servicebus_namespace",
  "azurerm_sql_database",
  "azurerm_sql_server",
  "azurerm_storage_account",
  "azurerm_subnet",
  "azurerm_virtual_machine",
  "azurerm_virtual_machine_extension",
  "azurerm_virtual_machine_scale_set",
  "azurerm_virtual_network",
  "azurerm_virtual_network_gateway",
  "azurerm_virtual_wan"
];

const AWS_TAGGABLE = [
  "aws_acm_certificate",
  "aws_ami",
  "aws_api_gateway_rest_api",
  "aws_autoscaling_group",
  "aws_batch_compute_environment",
  "aws_batch_job_queue",
  "aws_cloudformation_stack",
  "aws_cloudfront_distribution",
  "aws_cloudtrail",
  "aws_cloudwatch_log_group",
  "aws_cloudwatch_metric_alarm",
  "aws_codebuild_project",
  "aws_codepipeline",
  "aws_cognito_identity_pool",
  "aws_cognito_user_pool",
  "aws_db_instance",
  "aws_dynamodb_table",
  "aws_ebs_snapshot",
  "aws_ebs_volume",
  "aws_ec2_capacity_reservation",
  "aws_ec2_transit_gateway",
  "aws_ec2_transit_gateway_route_table",
  "aws_ecr_repository",
  "aws_ecs_cluster",
  "aws_ecs_service",
  "aws_ecs_task_definition",
  "aws_efs_file_system",
  "aws_eks_cluster",
  "aws_elasticache_cluster",
  "aws_elasticsearch_domain",
  "aws_elb",
  "aws_emr_cluster",
  "aws_fsx_lustre_file_system",
  "aws_fsx_windows_file_system",
  "aws_glue_catalog_database",
  "aws_iam_role",
  "aws_iam_user",
  "aws_instance",
  "aws_kinesis_stream",
  "aws_kms_key",
  "aws_lambda_function",
  "aws_mq_broker",
  "aws_nat_gateway",
  "aws_network_acl",
  "aws_opsworks_stack",
  "aws_rds_cluster",
  "aws_rds_cluster_instance",
  "aws_redshift_cluster",
  "aws_route53_zone",
  "aws_route_table",
  "aws_s3_bucket",
  "aws_secretsmanager_secret",
  "aws_security_group",
  "aws_service_discovery_service",
  "aws_sns_topic",
  "aws_sqs_queue",
  "aws_subnet",
  "aws_transfer_server",
  "aws_vpc",
  "aws_vpc_endpoint",
  "aws_vpn_gateway"
];

const GCP_TAGGABLE = [
  "google_bigquery_dataset",
  "google_bigtable_instance",
  "google_cloudfunctions_function",
  "google_compute_address",
  "google_compute_disk",
  "google_compute_firewall",
  "google_compute_forwarding_rule",
  "google_compute_global_address",
  "google_compute_global_forwarding_rule",
  "google_compute_health_check",
  "google_compute_http_health_check",
  "google_compute_https_health_check",
  "google_compute_image",
  "google_compute_instance",
  "google_compute_instance_group",
  "google_compute_instance_group_manager",
  "google_compute_instance_template",
  "google_compute_interconnect_attachment",
  "google_compute_network",
  "google_compute_network_endpoint_group",
  "google_compute_node_group",
  "google_compute_node_template",
  "google_compute_region_disk",
  "google_compute_region_instance_group_manager",
  "google_compute_router",
  "google_compute_router_nat",
  "google_compute_security_policy",
  "google_compute_ssl_certificate",
  "google_compute_subnetwork",
  "google_compute_target_http_proxy",
  "google_compute_target_https_proxy",
  "google_compute_target_ssl_proxy",
  "google_compute_target_tcp_proxy",
  "google_compute_url_map",
  "google_container_cluster",
  "google_dns_managed_zone",
  "google_filestore_instance",
  "google_kms_key_ring",
  "google_kms_crypto_key",
  "google_logging_metric",
  "google_logging_sink",
  "google_monitoring_alert_policy",
  "google_monitoring_dashboard",
  "google_monitoring_group",
  "google_monitoring_notification_channel",
  "google_monitoring_uptime_check_config",
  "google_pubsub_topic",
  "google_pubsub_subscription",
  "google_spanner_instance",
  "google_sql_database_instance",
  "google_storage_bucket",
  "google_storage_transfer_job",
  "google_vpc_access_connector"
];

const TAGGABLE = [
  ...GCP_TAGGABLE,
  ...AWS_TAGGABLE,
  ...AZURE_TAGGABLE
];

const isValidAwsTagName = value => {
  const regex = /^[a-zA-Z0-9+=,.@_-]{1,128}$/;
  return regex.test(value);
};
const isValidAwsTagValue = value => {
  const regex = /^[a-zA-Z0-9+=,.@_-]{0,256}$/;
  return regex.test(value);
};
const isValidAwsResourceName = value => {
  const regex = /^[a-zA-Z0-9+=,.@_-]{1,128}$/;
  return regex.test(value);
};

const isValidAzureTagName = value => {
  const regex = /^[a-zA-Z0-9_]{1,512}$/;
  return regex.test(value);
}
const isValidAzureTagValue = value => {
  const regex = /^[a-zA-Z0-9_]{0,256}$/;
  return regex.test(value);
}
const isValidAzureResourceName = value => {
  const regex = /^[a-zA-Z0-9_]{1,128}$/;
  return regex.test(value);
}

const isValidGcpLabelName = value => {
  const regex = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
  return regex.test(value);
}
const isValidGcpLabelValue = value => {
  const regex = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
  return regex.test(value);
}
const isValidGcpResourceName = value => {
  const regex = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
  return regex.test(value);
}

const isValidResourceName = (value, provider = 'aws') => {
  switch (provider.toLowerCase()) {
    case 'aws':
      return isValidAwsResourceName(value);
    case 'azure':
      return isValidAzureResourceName(value);
    case 'gcp':
      return isValidGcpResourceName(value);
    default:
      return false;
  }
}
const isValidTagQuery = (value, provider = 'aws') => {
  // Must include an equals sign
  if (!value.includes('=')) {
    return false;
  }

  // Split into left and right parts
  const [left, right] = value.split('=');

  // Define validation functions based on provider
  let isValidTagName, isValidTagValue;
  switch (provider.toLowerCase()) {
    case 'aws':
      isValidTagName = isValidAwsTagName;
      isValidTagValue = isValidAwsTagValue;
      break;
    case 'azure':
      isValidTagName = isValidAzureTagName;
      isValidTagValue = isValidAzureTagValue;
      break;
    case 'gcp':
      isValidTagName = isValidGcpTagName;
      isValidTagValue = isValidGcpTagValue;
      break;
    default:
      return false;
  }

  // Either side could be a wildcard '*'
  const isWildcard = val => val === '*';

  // Validate both sides
  const isValidLeft = isWildcard(left) || isValidTagName(left);
  const isValidRight = isWildcard(right) || isValidTagValue(right);

  return isValidLeft && isValidRight;
};
const isValidNodeQuery = (value, provider = 'aws') => {

  // The value can be divided into as many as three parts
  const parts = value.split('.');

  if (parts.length > 3) {
    return false;
  }

  // Define validation functions based on provider
  let isValidResourceType, isValidResourceName;
  switch (provider.toLowerCase()) {
    case 'aws':
      isValidResourceType = isValidAwsTagName;
      isValidResourceName = isValidAwsResourceName;
      break;
    case 'azure':
      isValidResourceType = isValidAzureTagName;
      isValidResourceName = isValidAzureResourceName;
      break;
    case 'gcp':
      isValidResourceType = isValidGcpTagName;
      isValidResourceName = isValidGcpResourceName;
      break;
    default:
      return false;
  }

  // Validate parts
  const isValidPart = (part, validValues) => part === '*' || validValues.includes(part);

  const isValidNodeType = part => isValidPart(part, NODE_TYPES);
  const isValidResourceTypePart = part => isValidPart(part, TAGGABLE);
  const isValidResourceNamePart = part => part === '*' || isValidResourceName(part);

  return parts.every((part, index) => {
    if (index === 0) {
      return isValidNodeType(part);
    } else if (index === 1) {
      return isValidResourceTypePart(part);
    } else if (index === 2) {
      return isValidResourceNamePart(part);
    }
    return false;
  });
};
const isValidTagName = (value, provider = 'aws') => {
  switch (provider.toLowerCase()) {
    case 'aws':
      return isValidAwsTagName(value);
    case 'azure':
      return isValidAzureTagName(value);
    case 'gcp':
      return isValidGcpLabelName(value);
    default:
      return false;
  }
}
const isValidTagValue = (value, provider = 'aws') => {
  switch (provider.toLowerCase()) {
    case 'aws':
      return isValidAwsTagValue(value);
    case 'azure':
      return isValidAzureTagValue(value);
    case 'gcp':
      return isValidGcpLabelValue(value);
    default:
      return false;
  }
}

const isTaggable = value => TAGGABLE.includes(value);

module.exports = {
  isValidAwsTagName,
  isValidAwsTagValue,
  isValidAwsResourceName,
  isValidAzureTagName,
  isValidAzureTagValue,
  isValidAzureResourceName,
  isValidGcpLabelName,
  isValidGcpLabelValue,
  isValidGcpResourceName,

  isValidResourceName,
  isValidTagName,
  isValidTagValue,
  isValidTagQuery,
  isValidNodeQuery,

  isTaggable
};
