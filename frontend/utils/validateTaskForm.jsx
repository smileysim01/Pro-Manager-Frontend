function ValidateTaskForm(formData, setErrors) {
    const validations = [
        {
          field: "title",
          isValid: formData.title !== null && formData.title.length > 0,
        }, {
          field: "priority",
          isValid: formData.priority !== null,
        }, {
          field: "checkList",
          isValid: formData.checkList.length || formData.checklist.every((task) => task.subTasks.every((subTask) => subTask.trim() !== ""))
        }, {
          field: "dueDate",
          isValid: formData.dueDate ? formData.dueDate.length > 0 : true,
        }
    ]

    let isFormValid = true;
    validations.forEach(({field, isValid}) => {
      if (!isValid) {
          isFormValid = false;
          setErrors((error) => ({ ...error, [field]: true }));
      }
    });
    return isFormValid;
}

export default ValidateTaskForm
