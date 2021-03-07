import { JSONSchema4, JSONSchema6, JSONSchema7 } from '@types/json-schema';

export type JsonSchemaType = JSONSchema4 | JSONSchema6 | JSONSchema7;

export type PrimitiveTypes = string | number | undefined | boolean;
