onLoad();
function onLoad() {
  showTable('col');
}


  const fileInput = document.getElementById("fileInput");
  const openCameraBtn = document.getElementById("openCameraBtn");

  openCameraBtn.addEventListener("click", function () {
    fileInput.capture = "user";
    fileInput.accept = "image/*";
    fileInput.click();
  });

function showForm() {
    const form = document.getElementById('addForm');
      form.classList.remove('hidden');
  }
function closeForm() {
    const form = document.getElementById('addForm');
      form.classList.add('hidden');
  }
function saveData() {
    // Retrieve input values
    let medicineKey = document.getElementById('medicine').value;
    let description = document.getElementById('description').value;
    let remarks = document.getElementById('remarks').value;
    let duration = document.getElementById('duration').value;

    // Retrieve selected schedule checkboxes
    let scheduleCheckboxes = document.getElementsByName('schedule[]');
    let selectedSchedule = [];
    scheduleCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedSchedule.push(checkbox.value);
        }
    });
    let medicineData = {
        'description': description,
        'remarks': remarks,
        'duration': duration,
        'schedule': selectedSchedule,
    };
    localStorage.setItem(medicineKey, JSON.stringify(medicineData));
    onLoad();
}
