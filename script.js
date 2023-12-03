onLoad();
function onLoad() {
  showTable("col");
  const form = document.getElementById("addForm");
  form.classList.add("hidden");
}

function showTable(option) {
  const tableRow = document.getElementById("table-row");
  const tableCol = document.getElementById("table-col");
  const activeRow = document.getElementById("nav-active-row");
  const activeCol = document.getElementById("nav-active-col");

  let tableBody = document.getElementById("medicineTableBody");
  tableBody.innerHTML = "";

  rowTableContent = document.getElementById("table-col");
  rowTableContent.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let medicineKey = localStorage.key(i);
    let medicineDataJSON = localStorage.getItem(medicineKey);
    let medicineData = JSON.parse(medicineDataJSON);
    let description = medicineData.description || "";
    let remarks = medicineData.remarks || "";
    let duration = medicineData.duration || "";
    let schedule = medicineData.schedule
      ? medicineData.schedule.join(", ")
      : "";

    if (option === "col") {
      tableRow.classList.remove("hidden");
      tableCol.classList.add("hidden");
      activeRow.classList.add("active");
      activeCol.classList.remove("active");

      let innerHTML = `
        <tr>
            <td>
                <a href="#" class="text-body">${medicineKey}</a>
            </td>
            <td>
                <span class="badge badge-soft-success mb-0">${description}</span>
            </td>
            <td>${remarks}</td>
            <td>${schedule}</td>
            <td>${duration}</td>
            <td>
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <a onclick="deleteData('${medicineKey}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                  class="px-2 text-danger"><i class="bx bx-trash-alt font-size-18"></i></a>
              </li>
            </ul>
          </td>
        </tr>`;
      tableBody.innerHTML += innerHTML;
    } else if (option === "row") {
      tableRow.classList.add("hidden");
      tableCol.classList.remove("hidden");
      activeRow.classList.remove("active");
      activeCol.classList.add("active");
      let innerHTML = `
          <tr>
          <tr>
            <th scope="col">Name</th>
            <td>
              <a href="#" class="text-body">${medicineKey}</a>
            </td>
          </tr>
          <tr>
            <th scope="col">Description</th>
            <td>
              <span class="badge badge-soft-success mb-0">${description}</span>
            </td>
          </tr>
          <tr>
            <th scope="col">Remarks</th>
            <td>${remarks}</td>
          </tr>
          <tr>
            <th scope="col">Schedule</th>
            <td>${schedule}</td>
          </tr>
          <tr>
            <th scope="col">Duration</th>
            <td>${duration}</td>
          </tr>
          <tr>
            <th scope="col">Action</th>
            <td>
              <ul class="list-inline mb-0">
                <li>
                  <a onclick="deleteData('${medicineKey}')" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                    class="px-2 text-danger"><i class="bx bx-trash-alt font-size-18"></i></a>
                </li>
              </ul>
            </td>
          </tr>
          </tr>
          <tr>
            <th colspan="2" style="border: none;"></th>
          </tr>
          `;
      rowTableContent.innerHTML += innerHTML;
    }
  }
}
const fileInput = document.getElementById("fileInput");
const openCameraBtn = document.getElementById("openCameraBtn");

openCameraBtn.addEventListener("click", function () {
  fileInput.capture = "user";
  fileInput.accept = "image/*";
  fileInput.click();
});

function showForm() {
  const form = document.getElementById("addForm");
  form.classList.remove("hidden");
}
function closeForm() {
  const form = document.getElementById("addForm");
  form.classList.add("hidden");
}
function saveData() {
  // Retrieve input values
  let medicineKey = document.getElementById("medicine").value;
  let description = document.getElementById("description").value;
  let remarks = document.getElementById("remarks").value;
  let duration = document.getElementById("duration").value;

  // Retrieve selected schedule checkboxes
  let scheduleCheckboxes = document.getElementsByName("schedule[]");
  let selectedSchedule = [];
  scheduleCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedSchedule.push(checkbox.value);
    }
  });
  let medicineData = {
    description: description,
    remarks: remarks,
    duration: duration,
    schedule: selectedSchedule,
  };
  localStorage.setItem(medicineKey, JSON.stringify(medicineData));
  onLoad();
  resetInputBox();
}
function resetInputBox(){
    // Clear form inputs after successful save
    document.getElementById("medicine").value = "";
    document.getElementById("description").value = "";
    document.getElementById("remarks").value = "";
    document.getElementById("duration").value = "";
  
    // Uncheck all schedule checkboxes
    scheduleCheckboxes = document.getElementsByName("schedule[]");
    scheduleCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
}

function deleteData(key) {
  localStorage.removeItem(key);
  onLoad();
}

const imageContainer = document.querySelector("main-container");
const image = document.getElementById('image');
let cropper;

document.getElementById('fileInput').addEventListener('change', function (event) {
  var fileInput = event.target;
  var file = fileInput.files[0];

  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      const imageElement = document.getElementById('image');
      const cropBtn = document.getElementById('btn-crop');
      imageElement.classList.remove('hidden');
      cropBtn.classList.remove('hidden');
      imageElement.src = e.target.result;

      // Destroy the previous Cropper instance if it exists
      if (cropper) {
        cropper.destroy();
      }

      // Initialize the new Cropper instance
      cropper = new Cropper(image, {
        aspectRatio: 0,
      });

      document.querySelector('#btn-crop').addEventListener('click', function() {
        const uploadBtn = document.getElementById('submit-btn-container').classList.remove('hidden');
        var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
        document.getElementById('output').src = croppedImage;
        document.querySelector(".cropped-container").style.display = 'flex';
      });
    };
    reader.readAsDataURL(file);
  }
});





// image.addEventListener("load", function () {
//   console.log("Image loaded");

  // const cropper = new Cropper(image, {
  //   aspectRatio: 0,
  // });


// });
// image.addEventListener("error", function () {
//   image.addEventListener("error", function () {
//     console.log("Image failed to load");
//   });
// });
