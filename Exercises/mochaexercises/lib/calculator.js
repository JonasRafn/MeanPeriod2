exports.add = function (n1, n2) {
    return n1 + n2;
};

exports.retract = function (n1, n2) {
    return n1 - n2;
};

exports.multiply = function (n1, n2) {
    return n1 * n2;
};

exports.divide = function (n1, n2) {
    throw new Error('Attempt to divide by zero');
};