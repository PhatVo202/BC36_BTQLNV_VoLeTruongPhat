function getMyEle(ele) {
  return document.getElementById(ele);
}

var staffList = [];

function validateForm() {
  var tknv = getMyEle("tknv").value;
  var fullName = getMyEle("name").value;
  var email = getMyEle("email").value;
  var password = getMyEle("password").value;
  var ngayLam = getMyEle("datepicker").value;
  var luongCB = getMyEle("luongCB").value;
  var chucvu = getMyEle("chucvu").value;
  var gioLam = getMyEle("gioLam").value;

  var isValid = true;
  isValid &= required(tknv, "tbTKNV") && checkTk(tknv, "tbTKNV");

  isValid &= required(fullName, "tbTen") && checkStaffName(fullName, "tbTen");

  isValid &= required(email, "tbEmail") && checkMail(email, "tbEmail");

  isValid &=
    required(password, "tbMatKhau") && checkPassWord(password, "tbMatKhau");

  isValid &= required(ngayLam, "tbNgay");

  isValid &=
    required(luongCB, "tbLuongCB") &&
    checkLuongCoBan(luongCB, "tbLuongCB", 1000000, 20000000);

  isValid &= required(chucvu, "tbChucVu");

  isValid &=
    required(gioLam, "tbGiolam") && checkGioLam(gioLam, "tbGiolam", 80, 200);

  //neu isValid = true => dung va nguoc lai
  return isValid;
}

function findById(id) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].tknv === id) {
      return i;
    }
  }
  return -1;
}

function searchTypeOfStaff() {
  var keyword = getMyEle("searchName").value;
  var result = [];
  for (var i = 0; i < staffList.length; i++) {
    var typeOfStaff = staffList[i].loaiNV;
    if (typeOfStaff.includes(keyword)) {
      result.push(staffList[i]);
    }
  }
  renderStaff(result);
}

function deleteStaff(tknv) {
  var index = findById(tknv);
  if (index === -1) {
    alert("Khong tim thay");
    return;
  }
  staffList.splice(index, 1);
  renderStaff();
  saveData();
}

//update 1: dua thong tin sinh vien len form
function getStaffDetail(tknv) {
  var index = findById(tknv);
  if (index === -1) {
    alert("Khong tim thay");
    return;
  }
  var staff = staffList[index];
  getMyEle("tknv").value = staff.tknv;
  getMyEle("name").value = staff.fullName;
  getMyEle("email").value = staff.email;
  getMyEle("password").value = staff.password;
  getMyEle("datepicker").value = staff.ngayLam;
  getMyEle("luongCB").value = staff.luongCoBan;
  getMyEle("chucvu").value = staff.chucVu;
  getMyEle("gioLam").value = staff.gioLam;

  getMyEle("tknv").disabled = true;
  getMyEle("password").disabled = true;
}

//update 2: cho phep nguoi dung sua tren form, nguoi dung nhan nut luu thi update
function updateStaff() {
  var isValid = validateForm();
  if (!isValid) return;

  var tknv = getMyEle("tknv").value;
  var fullName = getMyEle("name").value;
  var email = getMyEle("email").value;
  var password = getMyEle("password").value;
  var ngayLam = getMyEle("datepicker").value;
  var luongCB = getMyEle("luongCB").value;
  var chucvu = getMyEle("chucvu").value;
  var gioLam = getMyEle("gioLam").value;

  var index = findById(tknv);

  if (index === -1) {
    alert("Khong tim thay tknv phu hop");
    return;
  }

  var staff = staffList[index];

  staff.tknv = tknv;
  staff.fullName = fullName;
  staff.email = email;
  staff.password = password;
  staff.ngayLam = ngayLam;
  staff.luongCoBan = luongCB;
  staff.chucVu = chucvu;
  staff.gioLam = gioLam;

  renderStaff();
  saveData();
  getMyEle("formQLNV").reset();

  getMyEle("tknv").disabled = false;
  getMyEle("password").disabled = false;
}

getMyEle("btnThemNV").addEventListener("click", () => {
  var isValid = validateForm();
  if (!isValid) return;

  var tknv = getMyEle("tknv").value;
  var fullName = getMyEle("name").value;
  var email = getMyEle("email").value;
  var password = getMyEle("password").value;
  var ngayLam = getMyEle("datepicker").value;
  var luongCB = +getMyEle("luongCB").value;
  var chucVu = getMyEle("chucvu").value;
  var gioLam = +getMyEle("gioLam").value;

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].tknv === tknv) {
      alert("Trùng tài khoản");
      return;
    }
  }

  var staff = new Staff(
    tknv,
    fullName,
    email,
    password,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );

  staffList.push(staff);
  renderStaff();
  saveData();
  getMyEle("formQLNV").reset();
});

function renderStaff(data) {
  if (!data) data = staffList;
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `<tr>
    <td>${data[i].tknv}</td>
    <td>${data[i].fullName}</td>
    <td>${data[i].email}</td>
    <td>${data[i].ngayLam}</td>
    <td>${data[i].chucVu}</td>
    <td>${data[i].tong()}</td>
    <td>${data[i].xepLoai()}</td>
    <td>
        <button class="btn btn-danger" onclick="deleteStaff('${
          data[i].tknv
        }')">Xoa</button>
        <button class= "btn btn-info" id="btnThem" data-toggle="modal"
        data-target="#myModal" onclick="getStaffDetail('${
          data[i].tknv
        }')">Sua</button>
    </td>
    </tr>`;
  }
  getMyEle("tableDanhSach").innerHTML = html;
}

function saveData() {
  var staffListJSON = JSON.stringify(staffList);
  localStorage.setItem("SL", staffListJSON);
}

function getData() {
  var staffListJSON = localStorage.getItem("SL");
  if (!staffListJSON) return;

  var staffListLocal = JSON.parse(staffListJSON);
  staffList = mapData(staffListLocal);

  renderStaff();
}

//***quan trong va luon luon lam
function mapData(dataFromLocal) {
  var result = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var oldStaff = dataFromLocal[i];
    var newStaff = new Staff(
      oldStaff.tknv,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.password,
      oldStaff.ngayLam,
      oldStaff.luongCoBan,
      oldStaff.chucVu,
      oldStaff.gioLam
    );
    result.push(newStaff);
  }
  return result;
}

window.onload = () => {
  getData();
  getMyEle("formQLNV").reset();
};

//--------------------FORM VALIDATION--------------

function required(value, spanId) {
  if (value.length == "" && value.length === 0) {
    getMyEle(spanId).style.display = "block";
    getMyEle(spanId).innerHTML = "*Không được để trống!!";
    return false;
  }
  getMyEle(spanId).style.display = "none";
  getMyEle(spanId).innerHTML = "";
  return true;
}

function checkStaffName(value, spanId) {
  var parttern = /^[A-z ]+$/;
  if (parttern.test(value)) {
    getMyEle(spanId).style.display = "none";
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).style.display = "block";
  getMyEle(spanId).innerHTML = "*Tên nhân viên phải là chữ";
  return false;
}

function checkNumber(value, spanId) {
  if (value.length > 6 && value.length < 4) {
    getMyEle(spanId).style.display = "block";
    getMyEle(spanId).innerHTML = "*Toi da 4 -6 ky so";
    return false;
  }
  getMyEle(spanId).style.display = "none";
  getMyEle(spanId).innerHTML = "";
  return true;

  // var checkNumber = /^[0-9+$]/;
  // if (checkNumber.test(value) > 4 && checkNumber.test(value) < 6) {
  //   getMyEle(spanId).style.display = "none";
  //   getMyEle(spanId).innerHTML = "";
  //   return true;
  // }
  // getMyEle(spanId).style.display = "block";
  // getMyEle(spanId).innerHTML = "*Soo";
  // return false;
}

function checkMail(value, spanId) {
  var inputMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (inputMail.test(value)) {
    getMyEle(spanId).style.display = "none";
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).style.display = "block";
  getMyEle(spanId).innerHTML = "*Không đúng định dạng email";
  return false;
}

function checkLuongCoBan(value, spanId, min, max) {
  if (value >= min && value <= max) {
    getMyEle(spanId).style.display = "none";
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).style.display = "block";
  getMyEle(spanId).innerHTML = `*Lương cơ bản từ ${min} - ${max}`;
  return false;
}

function checkGioLam(value, spanId, min, max) {
  if (value >= min && value <= max) {
    getMyEle(spanId).style.display = "none";
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).style.display = "block";
  getMyEle(spanId).innerHTML = `*Số giờ làm trong tháng từ ${min} - ${max}`;
  return false;
}

function checkPassWord(value, spanId) {
  var checkPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,10}$/;
  if (checkPass.test(value)) {
    getMyEle(spanId).style.display = "none";
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).style.display = "block";
  getMyEle(spanId).innerHTML =
    "*Password 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
  return false;
}

function checkTk(value, spanId) {
  var checkId = /^[0-9]{4,6}$/;
  if (checkId.test(value)) {
    getMyEle(spanId).style.display = "none";
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).style.display = "block";
  getMyEle(spanId).innerHTML = "*Tài khoản tối đa 4-6 ký số";
  return false;
}
