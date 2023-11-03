function showTable(option) {
    const tableRow = document.getElementById('table-row');
    const tableCol = document.getElementById('table-col');
    const activeRow = document.getElementById("nav-active-row")
    const activeCol = document.getElementById("nav-active-col")

    if (option === 'col') {
      tableRow.classList.remove('hidden');
      tableCol.classList.add('hidden');
      activeRow.classList.add('active')
      activeCol.classList.remove('active')
      
    } else if (option === 'row') {
      tableRow.classList.add('hidden');
      tableCol.classList.remove('hidden');
      activeRow.classList.remove('active')
      activeCol.classList.add('active')
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
    const form = document.getElementById('addForm');
      form.classList.remove('hidden');
  }
function closeForm() {
    const form = document.getElementById('addForm');
      form.classList.add('hidden');
  }

