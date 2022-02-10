const axios = require('axios');
const Endpoints = require('../config/resource-Endpoints');
const ErrorMessages = require('../utils/error-messages');


// getGroupInfoList()
// Headeres
// 1.Authorization: Bearer < access_token >
// =====
// QueryParams
// 1. search
function getGroupInfoList(req, res, next) {
    var url = Endpoints['admin_features']['group_endpoint'];
    if (req.query.search) {
        var searchTerm = req.query.search;
        url += `?search=${searchTerm}`;
    }
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function getGroupInfoById(req, res, next) {
    var url = Endpoints['admin_features']['group_endpoint'];
    var id = req.params.id;
    url += `/${id}`;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function createStudent(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    var payload = req.body;
    payload.emailVerified = false;
    payload.enabled = true;
    payload.requiredActions = ['VERIFY_EMAIL', 'UPDATE_PASSWORD'];
    payload.groups = ['student'];
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers };
    if (req.headers.authorization) {
        axios.post(url, payload, options)
            .then(function (response) {
                let id = response.headers.location.split("/").pop();
                req.body.id = id;
                sendVerifyEmail(req, res, next);
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function createTeacher(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    var payload = req.body;
    payload.emailVerified = false;
    payload.enabled = true;
    payload.requiredActions = ['VERIFY_EMAIL', 'UPDATE_PASSWORD'];
    payload.groups = ['teacher'];
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers };
    if (req.headers.authorization) {
        axios.post(url, payload, options)
            .then(function (response) {
                let id = response.headers.location.split("/").pop();
                req.body.id = id;
                sendVerifyEmail(req, res, next);
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function createUser(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    var payload = req.body;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers };
    if (req.headers.authorization) {
        axios.post(url, payload, options)
            .then(function (response) {
                res.send(response.headers.location.split("/").pop())
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

/* 
Body | actions(required) | required actions the user needs to complete | < string > array 
*/
function sendExecuteActionsEmail(req, res, next) {
    var id = req.body.id;
    var url = `${Endpoints['admin_features']['user_endpoint']}/${id}/execute-actions-email`;
    var payload = req.body;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers };
    if (req.headers.authorization) {
        axios.put(url, payload, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(new Error(ErrorMessages.EXECUTE_ACTION_EMAIL_NOT_SENT));
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function sendVerifyEmail(req, res, next) {
    var id = req.body.id;
    var url = `${Endpoints['admin_features']['user_endpoint']}/${id}/send-verify-email`;
    if (req.headers.origin) {
        url += `?client_id=edu-frontend&redirect_uri=${encodeURIComponent(req.headers.origin)}`;
    }
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers };
    if (req.headers.authorization) {
        axios.put(url, {}, options)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                next(new Error(ErrorMessages.VERIFY_EMAIL_NOT_SENT));
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function getGroupMemberInfoList(req, res, next) {
    var url = Endpoints['admin_features']['group_endpoint'];
    var id = req.params.id;
    url += `/${id}/members`;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function getUserInfoList(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function getUserInfoListByStatus(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    if (req.query.enabled) {
        var enabled = req.query.enabled;
        url += `?enabled=${enabled}`;
    }
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function getUnverifiedUserInfoList(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    url += `?emailVerified=${false}`;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function getUserInfoById(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    var id = req.params.id;
    url += `/${id}`;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.get(url, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

function updateUserById(req, res, next) {
    var url = Endpoints['admin_features']['user_endpoint'];
    var payload = req.body;
    var id = req.params.id;
    url += `/${id}`;
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers }
    if (req.headers.authorization) {
        axios.put(url, payload, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                console.log(error);
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

module.exports = {
    getGroupInfoList, getGroupInfoById, createStudent, createTeacher, createUser, getGroupMemberInfoList, getUserInfoList, getUserInfoById, updateUserById
}