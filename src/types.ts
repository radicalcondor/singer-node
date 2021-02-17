import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export enum StreamTypes {
  RECORD = 'RECORD',
  SCHEMA = 'SCHEMA',
  STATE = 'STATE',
}

export type JsonSchemaType = JSONSchema4 | JSONSchema6 | JSONSchema7;
