function Staff(
  tknv,
  name,
  email,
  password,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam,
  tongLuong,
  loaiNV
) {
  this.tknv = tknv;
  this.fullName = name;
  this.email = email;
  this.password = password;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.loaiNV = loaiNV;
  this.tongLuong = tongLuong;
  this.tong = () => {
    if (this.chucVu === "Sếp") {
      return (this.tongLuong = this.luongCoBan * 3);
    }
    if (this.chucVu === "Trưởng phòng") {
      return (this.tongLuong = this.luongCoBan * 2);
    }
    if (this.chucVu === "Nhân viên") {
      return (this.tongLuong = this.luongCoBan);
    }
  };
  this.xepLoai = () => {
    if (this.gioLam >= 192) {
      return (this.loaiNV = "Nhan vien xuat sac");
    }
    if (this.gioLam >= 176) {
      return (this.loaiNV = "Nhan vien gioi");
    }
    if (this.gioLam >= 160) {
      return (this.loaiNV = "Nhan vien kha");
    }
    if (this.gioLam < 160) {
      return (this.loaiNV = "Nhan vien trung binh");
    }
  };
}
