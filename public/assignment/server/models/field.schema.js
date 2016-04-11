module.exports = function (mongoose) {
    var FieldSchema = mongoose.Schema({
        label: String,
        fieldType: {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "OPTIONS", "DATE"]
        },
        options: {
            type: [], default: [
                {"label": "label1", "value": "value1"},
                {"label": "label2", "value": "value2"}]
        },
        placeholder: {type: String, default: "Placeholder"}
    });

    return FieldSchema;
};