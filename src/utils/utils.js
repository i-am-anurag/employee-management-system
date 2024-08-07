const { clientErrorCodes } = require("./status-code");

const isFieldEmpty = (field) => {
    return field === undefined || field === null || field.trim() === "";
};

const checkRequiredFields = (fields, requestBody) => {
    const missingFields = fields.filter(field => isFieldEmpty(requestBody[field]));
    if (missingFields.length > 0) {
        const missingFieldNames = missingFields.join(', ');
        throw {
            status_code: clientErrorCodes['BAD_REQUEST'],
            message: `${missingFieldNames} is missing`
        };
    }
};

const checkUnexpectedFields = (allowedFields, requestBody) => {
    const requestFields = Object.keys(requestBody);
    const unexpectedFields = requestFields.filter(field => !allowedFields.includes(field));

    if (unexpectedFields.length > 0) {
        throw {
            status_code: clientErrorCodes['BAD_REQUEST'],
            message: `Unexpected fields: ${unexpectedFields.join(', ')}`,
        };
    }
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

module.exports = {
    checkRequiredFields,
    isFieldEmpty,
    checkUnexpectedFields,
    isValidEmail,
}