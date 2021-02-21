# TODO

- [ ] Reach test parity with `singer-python`
- [ ] Implement `VERSION` message
- [ ] Use `invariant` or something for handling errors
- [ ] Use `yup` to validate and to [replace `*Type` interfaces](https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e)
- [ ] HTTP client capable of caching and managing OAuth tokens
- [ ] Denoify library
- [ ] JSII
- [x] Check https://github.com/singer-io/singer-python to ensure some compatibility
- [x] Utility classes for generating SCHEMA, RECORD, CATALOG and METRIC messages
- [x] Use `make-error` to properly create equivalents for Singer exceptions

## Improvements
- [ ] User `faker.random` for test fixture data

## Test Parity

Notes on matching test parity:

- We won't reinvent the wheel - if there's functionality in `singer-python` we
  feel is better implemented by a library on `npm`, we will be using that
- Any JSON schema validation should be handled by the `jsonschema` library.
- Any JSON parsing logic will not be re-implemented

| `singer-python`                                                                                     | `singer-nodejs`                                                                          | `Notes` |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------- |
| `test_bookmarks.py#TestGetBookmark#test_empty_state`                                                | `bookmarks#getBookmark#should provide defaults when no state is provided`                | ⚠️      |
| `test_bookmarks.py#TestGetBookmark#test_empty_bookmark`                                             | `bookmarks#getBookmark#should provide defaults when no bookmarks exist`                  | ⚠️      |
| `test_bookmarks.py#TestGetBookmark#test_non_empty_state`                                            | `bookmarks#getBookmark#should retrieve values when state is provided`                    | ⚠️      |
| `test_bookmarks.py#TestGetOffset#test_empty_state`                                                  | `bookmarks#getOffset#should provide defaults when no state is provided`                  | ⚠️      |
| `test_bookmarks.py#TestGetOffset#test_empty_bookmark`                                               | `bookmarks#getOffset#should provide defaults when no bookmarks exist`                    | ⚠️      |
| `test_bookmarks.py#TestGetOffset#test_non_empty_state`                                              | `bookmarks#getOffset#should retrieve values when state is provided`                      | ✅️     |
| `test_bookmarks.py#TestGetCurrentlySyncing#test_empty_state`                                        | `bookmarks#getCurrentlySyncing#should provide defaults when no state is provided`        | ✅️️    |
| `test_bookmarks.py#TestGetCurrentlySyncing#test_non_empty_state`                                    | `bookmarks#getCurrentlySyncing#should retrieve values when state is provided`            | ✅️     |
| `test_catalog.py#TestWriteCatalog#test_write_empty_catalog`                                         | N/A                                                                                      | ⛔️     |
| `test_catalog.py#TestWriteCatalog#test_write_catalog_with_streams`                                  | N/A                                                                                      | ⛔️     |
| `test_catalog.py#TestGetSelectedStreams#test_one_selected_stream`                                   | `Catalog#getSelectedStreams#should get a single selected stream`                         | ✅      |
| `test_catalog.py#TestGetSelectedStreams#test_resumes_currently_syncing_stream`                      | `Catalog#getSelectedStreams#should resume a currently syncing stream`                    | ✅      |
| `test_catalog.py#TestToDictAndFromDict#test_from_dict`                                              | N/A                                                                                      | ⛔️     |
| `test_catalog.py#TestToDictAndFromDict#test_to_dict`                                                | N/A                                                                                      | ⛔️     |
| `test_catalog.py#TestGetStream#test`                                                                | `Catalog#getStream#should get a stream`                                                  | ✅      |
| `test_exceptions.py#TestSingerErrors#test_SingerError_prints_correctly`                             | `Errors#should throw a SingerError with the correct message`                             | ✅      |
| `test_exceptions.py#TestSingerErrors#test_SingerConfigurationError_prints_correctly`                | `Errors#should throw a SingerConfigurationError with the correct message`                | ✅      |
| `test_exceptions.py#TestSingerErrors#test_SingerDiscoveryError_prints_correctly`                    | `Errors#should throw a SingerDiscoveryError with the correct message`                    | ✅      |
| `test_exceptions.py#TestSingerErrors#test_SingerSyncError_prints_correctly`                         | `Errors#should throw a SingerSyncError with the correct message`                         | ✅      |
| `test_exceptions.py#TestSingerErrors#test_SingerRetryableRequestError_prints_correctly`             | `Errors#should throw a SingerRetryableRequestError with the correct message`             | ✅      |
| `test_exceptions.py#TestSingerErrors#test_SingerError_prints_multiple_lines_correctly`              | `Errors#should throw a SingerError with the correct multiline message`                   | ✅      |
| `test_metadata.py#TestStandardMetadata#test_standard_metadata`                                      | `Metadata#`                                                                              | ⚠️      |
| `test_metrics.py#TestRecordCounter#test_log_on_exit`                                                | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestRecordCounter#test_incremental`                                                | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestHttpRequestTimer#test_success`                                                 | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestHttpRequestTimer#test_success_with_http_status_code`                           | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestHttpRequestTimer#test_failure`                                                 | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestParse#test_parse_with_everything`                                              | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestParse#test_parse_without_tags`                                                 | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestParse#test_parse_invalid_json_returns_none`                                    | `Metrics#`                                                                               | ⚠️      |
| `test_metrics.py#TestParse#test_parse_no_match`                                                     | `Metrics#`                                                                               | ⚠️      |
| `test_schema.py#TestSchema#test_string_to_dict`                                                     | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_integer_to_dict`                                                    | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_array_to_dict`                                                      | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_object_to_dict`                                                     | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_string_from_dict`                                                   | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_integer_from_dict`                                                  | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_array_from_dict`                                                    | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_object_from_dict`                                                   | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_repr_atomic`                                                        | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_repr_recursive`                                                     | `Schema#`                                                                                | ⚠️      |
| `test_schema.py#TestSchema#test_object_from_dict_with_defaults`                                     | `Schema#`                                                                                | ⚠️      |
| `test_singer.py#TestSinger#test_parse_message_record_good`                                          | `RecordMessage#should successfully parse a message`                                      | ✅      |
| `test_singer.py#TestSinger#test_parse_message_record_with_version_good`                             | `RecordMessage#should successfully parse a message with a version`                       | ✅      |
| `test_singer.py#TestSinger#test_parse_message_record_naive_extraction_time`                         | `RecordMessage#should fail to parse a message with a date without a timezone`            | ✅      |
| `test_singer.py#TestSinger#test_parse_message_record_aware_extraction_time`                         | `RecordMessage#should successfully parse a message with a date with a timezone`          | ✅      |
| `test_singer.py#TestSinger#test_extraction_time_strftime`                                           | `RecordMessage#should successfully parse a message with a date with a timezone on macOS` | ✅      |
| `test_singer.py#TestSinger#test_parse_message_record_missing_record`                                | `RecordMessage#should fail to parse a message with a missing record`                     | ✅      |
| `test_singer.py#TestSinger#test_parse_message_record_missing_stream`                                | `RecordMessage#should fail to parse a message with a missing stream`                     | ✅      |
| `test_singer.py#TestSinger#test_parse_message_schema_good`                                          | `SchemaMessage#should successfully parse a message`                                      | ✅      |
| `test_singer.py#TestSinger#test_parse_message_schema_missing_stream`                                | `SchemaMessage#should fail to parse a message with a missing stream`                     | ✅      |
| `test_singer.py#TestSinger#test_parse_message_schema_missing_schema`                                | `SchemaMessage#should fail to parse a message with a missing schema`                     | ✅      |
| `test_singer.py#TestSinger#test_parse_message_schema_missing_key_properties`                        | `SchemaMessage#should fail to parse a message with missing key_properties`               | ✅      |
| `test_singer.py#TestSinger#test_parse_message_state_good`                                           | `StateMessage#should successfully parse a message`                                       | ✅      |
| `test_singer.py#TestSinger#test_parse_message_state_missing_value`                                  | `StateMessage#should fail to parse a message with a missing value`                       | ✅      |
| `test_singer.py#TestSinger#test_round_trip`                                                         |                                                                                          | ⚠️      |
| `test_singer.py#TestSinger#test_write_record`                                                       |                                                                                          | ⚠️      |
| `test_singer.py#TestSinger#test_write_schema`                                                       |                                                                                          | ⚠️      |
| `test_singer.py#TestSinger#test_write_state`                                                        |                                                                                          | ⚠️      |
| `test_singer.py#TestSinger#test_parse_int_zero`                                                     |                                                                                          | ⚠️      |
| `test_singer.py#TestParsingNumbers#test_parse_regular_decimal`                                      |                                                                                          | ⚠️      |
| `test_singer.py#TestParsingNumbers#test_parse_large_decimal`                                        |                                                                                          | ⚠️      |
| `test_singer.py#TestParsingNumbers#test_parse_small_decimal`                                        |                                                                                          | ⚠️      |
| `test_singer.py#TestParsingNumbers#test_parse_absurdly_large_decimal`                               |                                                                                          | ⚠️      |
| `test_singer.py#TestParsingNumbers#test_parse_absurdly_large_int`                                   |                                                                                          | ⚠️      |
| `test_singer.py#TestParsingNumbers#test_parse_bulk_decs`                                            |                                                                                          | ⚠️      |
| `test_statediff.py#TestPaths#test_simple_dict`                                                      |                                                                                          | ⚠️      |
| `test_statediff.py#TestPaths#test_nested_dict`                                                      |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_add`                                                               |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_remove`                                                            |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_change`                                                            |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_null_input_for_old`                                                |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_null_input_for_new`                                                |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_null_input_for_both`                                               |                                                                                          | ⚠️      |
| `test_statediff.py#TestDiff#test_null_at_leaf`                                                      |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_integer_transform`                                            |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_nested_transform`                                             |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_multi_type_object_transform`                                  |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_multi_type_array_transform`                                   |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_null_transform`                                               |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_datetime_transform`                                           |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_datetime_string_with_timezone`                                |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_datetime_fractional_seconds_transform`                        |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_anyof_datetime`                                               |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_error_path`                                                   |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_nested_error_path_throws`                                     |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_nested_error_path_no_throw`                                   |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_error_path_array`                                             |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_nested_error_path_array`                                      |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_error_path_datetime`                                          |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_unexpected_object_properties`                                 |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_unix_seconds_to_datetime`                                     |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_unix_seconds_to_datetime`                                     |                                                                                          | ⚠️      |
| `test_transform.py#TestTransform#test_null_object_transform`                                        |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_drops_no_data_when_not_dict`                     |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_keeps_selected_data_from_dicts`                  |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_keeps_automatic_data_from_dicts`                 |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_keeps_fields_without_metadata`                   |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_drops_fields_which_are_unselected`               |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_drops_fields_which_are_unsupported`              |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_drops_nested_object_fields_which_are_unselected` |                                                                                          | ⚠️      |
| `test_transform.py#TestTransformsWithMetadata#test_drops_nested_array_fields_which_are_unselected`  |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_internal_refs_resolve`                          |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_external_refs_resolve`                          |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_refs_resolve_pattern_properties`                |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_refs_resolve_items`                             |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_refs_resolve_nested`                            |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_indirect_reference`                             |                                                                                          | ⚠️      |
| `test_transform.py#TestResolveSchemaReferences#test_refs_resolve_preserves_existing_fields`         |                                                                                          | ⚠️      |
| `test_transform.py#TestPatternProperties#test_pattern_properties_match`                             |                                                                                          | ⚠️      |
| `test_transform.py#TestPatternProperties#test_pattern_properties_match_multiple`                    |                                                                                          | ⚠️      |
| `test_utils.py#TestFormat#test_small_years`                                                         |                                                                                          | ⚠️      |
| `test_utils.py#TestFormat#test_round_trip`                                                          |                                                                                          | ⚠️      |
| `test_utils.py#TestHandleException#test_successful_fn`                                              |                                                                                          | ⚠️      |
| `test_utils.py#TestHandleException#test_exception_fn`                                               |                                                                                          | ⚠️      |

```javascript
const tap = createTap({
  schema: '',
  record: '',
  state: '',
});
```
