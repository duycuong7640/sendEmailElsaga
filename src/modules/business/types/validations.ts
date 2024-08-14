export const VALIDATION_MAIL = {
  MAIL: {
    listEmails: {
      MIN: `Trường listEmails không được bỏ trống.`,
      MAX: `Trường listEmails có số lượng quá lớn.`,
    },
    to: {
      REQUIRED: `Trường TO không được bỏ trống.`,
      INVALID: `Trường TO có định dạng không đúng.`,
      MAX: `Trường TO không được lớn hơn 250 kí tự.`,
    },
    subject: {
      REQUIRED: `Trường SUBJECT không được bỏ trống.`,
      MAX: `Trường SUBJECT không được lớn hơn 250 kí tự.`,
    },
    content: {
      REQUIRED: `Trường CONTENT không được bỏ trống.`,
    },
  },
  SYSTEM: {
    ERROR: `Có lỗi trong quá gửi email, có thể là data or logic xẩy ra vấn đề.`,
  },
};
