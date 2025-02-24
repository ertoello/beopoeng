import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Akun berhasil dibuat! Silakan masuk.");
        navigate("/login");
        setInput({ username: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-[#3FA3CE] to-[#FFFFFF] p-6">
      {/* Gambar Kiri */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img
          src="/img/register.png"
          alt="Signup"
          className="w-full animate-fadeIn"
        />
      </div>

      {/* Form SignUp */}
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
            Bangun personal branding & kolaborasi digital Anda
          </p>
        </div>
        <form onSubmit={signupHandler} className="flex flex-col gap-5 mt-6">
          <div>
            <label className="block font-medium text-gray-700">
              Nama Pengguna
            </label>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
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
              className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>
          {loading ? (
            <Button className="flex items-center justify-center bg-blue-500 text-white w-full py-2 rounded-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mendaftarkan...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg transition-all"
            >
              Daftar Sekarang
            </Button>
          )}
          <p className="text-center text-sm mt-3">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Masuk
            </Link>
          </p>
        </form>
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>
            &copy;Copyright 2025 Yohanes Serpiyanto Elo
            <br />
            Semua Hak Dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
