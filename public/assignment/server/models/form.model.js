'use strict';
module.exports = function () {
    var api = {
        //form api
        findAllForms: findAllForms,
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm,

        // field api
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldAndFormId: findFieldByFieldAndFormId,
        deleteFieldByFieldAndFormId: deleteFieldByFieldAndFormId,
        createNewFieldForForm: createNewFieldForForm
    };
    return api;
};