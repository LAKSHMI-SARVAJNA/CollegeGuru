const sanitizeInput = (req, res, next) => {
    const allowedFields = [
        "title",
        "description",
        "duration",
        "minimumEligibility",
        "upperAgeLimit",
        "entranceExams",
        "admissionProcess",
        "managementQuotaAvailable",
        "averageFee",
        "scholarships",
        "internships",
        "averageStipendForInternships",
        "averageStartingSalary",
        "careerOptions"
    ];

    req.body = Object.keys(req.body)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = req.body[key];
            return obj;
        }, {});

    next();
};

module.exports = sanitizeInput;
