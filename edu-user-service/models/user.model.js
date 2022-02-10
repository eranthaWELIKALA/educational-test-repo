const AdminModel = {
    firstName: {
        type: String,
        isRequired: true
    },
    lastName: {
        type: String,
        isRequired: false
    },
    password: {
        type: String,
        isRequired: true
    },
    email: {
        type: String,
        isRequired: true
    }
}

const TeacherModel = {
    firstName: {
        type: String,
        isRequired: true
    },
    lastName: {
        type: String,
        isRequired: false
    },
    password: {
        type: String,
        isRequired: true
    },
    email: {
        type: String,
        isRequired: true
    },
    attributes: {
        regNumber: {
            type: Number,
            isRequired: true
        },
        phoneNumber: {
            type: Number,
            isRequired: false
        },
        subjects: {
            type: Array,
            isRequired: false
        }
    }
}

const StudentAttributesModel = {    
    regNumber: {
        type: Number,
        isRequired: true
    },
    grade: {
        type: String,
        isRequired: false
    }
}

const StudentModel = {
    firstName: {
        type: String,
        isRequired: true
    },
    lastName: {
        type: String,
        isRequired: false
    },
    // password: {
    //     type: String,
    //     isRequired: true
    // },
    email: {
        type: String,
        isRequired: true
    },
    attributes: {
        type: typeof(StudentAttributesModel),
        isRequired: true
    }
}

module.exports = {
    AdminModel, TeacherModel, StudentModel
}