const clientErrorCodes = Object.freeze({
    BAD_REQUEST:400,
    FORBIDDEN:403,
    UNAUTHORIZED:401,
    NOT_FOUND:404,
});

const serverErrorCodes = Object.freeze({
    INTERNAL_SERVER_ERROR:500,
    NOT_IMPLEMENTED:501,
    BAD_GATEWAY:502,
    SERVICE_UNAVAILABLE:503,
});

const SucessCodes = Object.freeze({
    OK:200,
    CREATED:201,
    ACCEPTED:202,
});

module.exports = {
    clientErrorCodes,
    serverErrorCodes,
    SucessCodes,
}