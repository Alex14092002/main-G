const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  WARRANTY: "warranty",
  COUPONS: "coupons",
  PAYMENT_INSTRUCTION: "payment_instruction",
  FAQS: "faqs",
  PRODUCT_DETAIL__CATEGORY__PID__TITLE: ":category/:pid/:title",
  PRODUCT_DETAIL: "product",
  LAST_REGISTER: "last-register/:status",
  RESET_PASSWORD: "reset-password/:token",

  //admin path
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORDERS: "manage-orders",
  CREATE_PRODUCT: "create-product",

  //customer path
  CUSTOMER: "customer",
  PROFILE: "profile",
};

export default path;
