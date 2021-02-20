import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type JsonSchemaType = JSONSchema4 | JSONSchema6 | JSONSchema7;

export type PrimitiveTypes = string | number | undefined | boolean;
