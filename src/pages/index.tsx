import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuth, TUCMCLogin } from "tucmc-auth";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/material";

export default function Home() {
  const [info, setInfo] = useState({});
  const [foodname, setFoodname] = useState("");
  const [shopname, setShopname] = useState("");
  const [shopplace, setShopplace] = useState("");
  const [price, setPrice] = useState("");
  const [foodtype, setFoodtype] = useState("all");
  const [place, setPlace] = useState("all");
  const [error, setError] = useState(false);
  const [generate, setGenerate] = useState(false);
  const { loggedUser, signOut } = useAuth();

  const handleChangeFoodType = (event: SelectChangeEvent) => {
    setFoodtype(event.target.value);
  };

  const handleChangePlace = (event: SelectChangeEvent) => {
    setPlace(event.target.value);
  };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tucmcrandom-food-backend.vercel.app/api/random-foods",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      foodtype: foodtype,
      place: place,
    }),
  };

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      console.log(foodtype);
      setInfo(response.data);
      setFoodname(response.data.foodname);
      setShopname(response.data.shopname);
      setShopplace(response.data.place);
      setPrice(response.data.price);
      setGenerate(true);
      setError(false);
      console.log(response.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  if (loggedUser) {
    console.log("loggedUser:", loggedUser.user);
  }

  return (
    <div>
      <div className="flex flex-col mt-4 space-y-2">
        {!loggedUser ? (
          <>
            <div className="w-48 transition-transform hover:scale-105">
              <TUCMCLogin />
            </div>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="px-6 py-2 text-center transition-colors bg-white border border-gray-400 rounded-full w-36 hover:border-gray-600 hover:bg-gray-100"
          >
            ออกจากระบบ
          </button>
        )}
      </div>

      <div className="text-black text-bold">
        {loggedUser ? (
          <p>
            {loggedUser.user.firstname} {loggedUser.user.lastname}
          </p>
        ) : (
          <></>
        )}
      </div>

      <p className=" flex w-full justify-center my-10">เลือกประเภทอาหาร</p>
      <div>
        <div className=" flex flex-col justify-center items-center">
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Foodtype
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={foodtype}
              onChange={handleChangeFoodType}
              autoWidth
              label="foodtype"
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="อาหาร">อาหารจานหลัก</MenuItem>
              <MenuItem value="เครื่องดื่ม">เครื่องดื่ม</MenuItem>
              <MenuItem value="ของทานเล่น">ของทานเล่น</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <p className=" flex w-full justify-center my-10">เลือกโรงอาหาร</p>
      <div className="  grid place-items-center grid-cols-2 xs:flex xs:flex-row xs:justify-evenly">
        <div className=" flex flex-col justify-center items-center">
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Place
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={place}
              onChange={handleChangePlace}
              autoWidth
              label="foodtype"
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="โดมทอง">โดมทอง</MenuItem>
              <MenuItem value="ใต้ตึก 50 ปี">ใต้ตึก 50 ปี</MenuItem>
              <MenuItem value="โรงใหญ่">โรงใหญ่</MenuItem>
              <MenuItem value="โรง 80 ปี">โรง 80 ปี</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="flex justify-center my-10">
        <button
          className="bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500"
          onClick={makeRequest}
        >
          random
        </button>
      </div>
      <div className={error ? "block" : "hidden"}>
        <p className=" flex w-full justify-center my-5 text-red-700">
          Error : there is no such combination
        </p>
      </div>

      <div className={generate ? "block" : "hidden"}>
        <p className=" flex w-full justify-center my-5">
          เมนูอาหาร : {foodname}
        </p>
        <p className=" flex w-full justify-center my-5">ร้านค้า : {shopname}</p>
        <p className=" flex w-full justify-center my-5">
          สถานที่ : {shopplace}
        </p>
        <p className=" flex w-full justify-center my-5">ราคา(บาท) : {price}</p>
      </div>
    </div>
  );
}
