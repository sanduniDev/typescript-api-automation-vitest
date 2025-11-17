import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // Add format validation (email, date, etc.)

export function validateSchema<T>(data: T, schema: JSONSchemaType<T> | object): boolean {
    const validate: ValidateFunction = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.error('Schema validation errors:', validate.errors);
        throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`);
    }

    return true;
}

export function getSchemaValidator<T>(schema: JSONSchemaType<T> | object): ValidateFunction {
    return ajv.compile(schema);
}