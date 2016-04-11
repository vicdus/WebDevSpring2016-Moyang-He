'use strict';
var q = require("q");

module.exports = function (mongoose, db) {
    var api;
    var allForms = require("./form.mock.json");
    api = {
        findFormsByUserId: findFormsByUserId,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        createFieldForFormId: createFieldForFormId,
        updateFieldByFormIdAndFieldId: updateFieldByFormIdAndFieldId
    };

    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    FormModel.remove({}, function (err, res) {

    });

    return api;

    function createFieldForFormId(formId, field) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.push(field);
                FormModel.update({_id: formId}, {$set: form}, function (err, res) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        FormModel.findOne({_id: formId}, function (err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        })
                    }
                })
            }
        });
        return deferred.promise;
    }


    //function findFormByTitle(title) {
    //    var res = null;
    //    for (var i = 0; i < allForms.length; i++) {
    //        if (allForms[i].title == title) {
    //            return allForms[i];
    //        }
    //    }
    //    return null;
    //}
    function createForm(newForm) {
        var deferred = q.defer();
        newForm.fields = [];
        FormModel.create(newForm, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.find({userId: form.userId}, function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                })
            }
        });
        return deferred.promise;
    }

    //
    //function findAllForm() {
    //    return allForms;
    //}
    //
    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        FormModel.update({_id: formId}, {$set: form}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.findOne({_id: formId}, function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
        });
        return deferred.promise
    }


    function deleteFormById(formId) {
        var deferred = q.defer();
        var userId;
        FormModel.findOne({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                userId = form.userId;
                FormModel.remove({_id: formId}, function (err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        FormModel.find({userId: userId}, function (err, forms) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(forms);
                            }
                        })
                    }
                })

            }
        });
        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId}, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }


    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields = form.fields.filter(function (field) {
                    return field._id != fieldId;
                });

                FormModel.update({_id: formId}, {$set: form}, function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        FormModel.findOne({_id: formId}, function (err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        })
                    }
                })
            }
        });
        return deferred.promise;
    }

    function updateFieldByFormIdAndFieldId(formId, fieldId, field) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        form.fields[i] = field;
                        break;
                    }
                }

                FormModel.update({_id: formId}, {$set: form}, function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        FormModel.findOne({_id: formId}, function (err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        })
                    }
                })
            }
        });
        return deferred.promise;
    }
};