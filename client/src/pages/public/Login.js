import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button } from "../../components";
import icons from "../../ultils/icons";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis";
import sweetAlert from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/users/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formValidate } from "../../ultils/helpers";

const { MdArrowBackIosNew } = icons;
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
    });
  };

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.info(response.message);
    }
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...formData } = payload;

    const invalidCount = isRegister
      ? formValidate(payload, setInvalidFields)
      : formValidate(formData, setInvalidFields);
    console.log(invalidCount);

    if (invalidCount === 0) {
      if (isRegister) {
        const responseRegis = await apiRegister(payload);
        console.log(responseRegis);
        if (responseRegis.success) {
          sweetAlert
            .fire(
              "Đăng ký thành công, hãy kiểm tra email của bạn đề hoàn tất việc tạo tài khoản.",
              responseRegis.mes,
              "success"
            )
            .then(() => {
              setIsRegister(false);
              resetPayload();
            });
        } else {
          sweetAlert.fire("Lỗi đăng ký", responseRegis.message, "error");
        }
      } else {
        const responseLogin = await apiLogin(formData);
        if (responseLogin.success) {
          dispatch(
            login({
              isLogin: true,
              token: responseLogin.loginToken,
              userData: responseLogin.userData,
            })
          );
          navigate(`/${path.HOME}`);
        } else {
          sweetAlert.fire("Lỗi đăng nhập", responseLogin.mes, "error");
        }
        console.log(responseLogin);
      }
    }
  }, [payload, isRegister]);

  return (
    <div className="flex justify-center ">
      <div className="flex bg-white justify-center p-8 min-w-[544px] w-1/2 mt-[30px] mb-[30px]">
        <div className="w-[80%] ">
          <h1 className="uppercase mb-[12px] text-xl font-medium flex justify-center">
            {isResetPassword
              ? "đặt lại mật khẩu"
              : isRegister
              ? "đăng ký"
              : "đăng nhập"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.lastName}
                setValue={setPayload}
                nameKey="lastName"
                placeholder="Họ"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.firstName}
                setValue={setPayload}
                nameKey="firstName"
                placeholder="Tên"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          {!isResetPassword && (
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey="email"
              placeholder=""
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              placeholder="Số điện thoại"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          {!isResetPassword && (
            <InputField
              value={payload.password}
              setValue={setPayload}
              nameKey="password"
              type="password"
              placeholder=""
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}

          {isResetPassword && (
            <div className="flex flex-col gap-4">
              <label htmlFor="email">Hãy nhập email của bạn:</label>
              <input
                type="text"
                className="px-4 py-2 border w-full my-2 outline-none"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex items-center justify-center w-full">
                <Button
                  name="Gửi yêu cầu"
                  handleOnClick={handleForgotPassword}
                  wFull
                />
              </div>
            </div>
          )}

          <div className="flex w-full justify-between mb-[40px]">
            <span></span>
            {!isRegister && !isResetPassword && (
              <span
                className="text-blue-500 underline italic cursor-pointer"
                onClick={() => {
                  setIsResetPassword(true);
                }}
              >
                Quên mật khẩu?
              </span>
            )}
          </div>

          {!isResetPassword && (
            <Button
              name={isRegister ? "Đăng ký" : "Đăng nhập"}
              handleOnClick={handleSubmit}
              wFull
            />
          )}

          {isResetPassword ? (
            <div className="flex w-full justify-between mt-[20px]">
              <span>
                <span
                  className="text-blue-500 cursor-pointer flex items-center justify-center"
                  onClick={() => setIsResetPassword(false)}
                >
                  <MdArrowBackIosNew />
                  Trở lại
                </span>
              </span>
              <span></span>
            </div>
          ) : (
            <div className="flex w-full justify-between mt-[20px]">
              <span>
                {isRegister ? (
                  <span
                    className="text-blue-500 cursor-pointer flex items-center justify-center"
                    onClick={() => setIsRegister(false)}
                  >
                    <MdArrowBackIosNew />
                    Trở lại
                  </span>
                ) : (
                  <>
                    Bạn chưa có tài khoản?{` `}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setIsRegister(true)}
                    >
                      Đăng ký ngay
                    </span>
                  </>
                )}
              </span>
              <span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;