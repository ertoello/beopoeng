import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = useCallback((e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        setInput({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Terjadi kesalahan. Coba lagi nanti."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-[#3FA3CE] to-[#FFFFFF] p-6">
      {/* Bagian Kiri - Gambar */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img
          src="/img/login.png"
          alt="Login Beopoeng"
          className="w-full animate-fadeIn"
        />
      </div>

      {/* Form Login */}
      <div className="w-full md:w-1/3 bg-white p-8 rounded-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="/img/logopanjang.png"
              alt="Beopoeng"
              className="h-20 w-auto object-contain"
            />
          </div>

          <p className="text-gray-600 text-sm mt-2">
            Kolaborasi & Personal Branding Digital
          </p>
        </div>

        <form onSubmit={loginHandler} className="flex flex-col gap-5 mt-6">
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Kata Sandi
            </label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            />
          </div>

          {/* Tombol Login */}
          {loading ? (
            <Button className="flex items-center justify-center bg-indigo-500 text-white w-full py-2 rounded-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-lg transition-all"
            >
              Masuk
            </Button>
          )}

          <p className="text-center text-sm mt-3">
            Belum punya akun?{" "}
            <Link to="/signup" className="text-indigo-600 font-medium">
              Daftar
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>
            &copy; Copyright 2025 Yohanes Serpiyanto Elo
            <br />
            Semua Hak Dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
