import React, { useEffect, useState } from 'react';
import axios from 'axios';

const host = "https://provinces.open-api.vn/api/";

const AddressApi = ({number, setAddressApi, setAddress2Api}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    callAPI(`${host}?depth=1`);
  }, []);

  const callAPI = (api) => {
    axios.get(api)
      .then((response) => {
        setProvinces(response.data);
      });
  };

  const callApiDistrict = (api) => {
    axios.get(api)
      .then((response) => {
        setDistricts(response.data.districts);
      });
  };

  const callApiWard = (api) => {
    axios.get(api)
      .then((response) => {
        setWards(response.data.wards);
      });
  };

  const renderOptions = (array) => {
    return array.map((element) => (
      <option key={element.code} value={element.code}>{element.name}</option>
    ));
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    callApiDistrict(`${host}p/${event.target.value}?depth=2`);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    callApiWard(`${host}d/${event.target.value}?depth=2`);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  useEffect(()=>{
    const printResult = () => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            const provinceName = provinces.find((province) => province.code === Number(selectedProvince))?.name;
            const districtName = districts.find((district) => district.code === Number(selectedDistrict))?.name;
            const wardName = wards.find((ward) => ward.code === Number(selectedWard))?.name;
            if (provinceName && districtName && wardName) {
          const result = `${wardName}/${districtName}/${provinceName}`;
          number === 1 ? setAddressApi(result): setAddress2Api(result);
        }
      }
      return null;
    };
    printResult(); 
  }, [selectedDistrict, selectedProvince, selectedWard])

  return (
    <div className='flex gap-6 flex-col items-center w-full justify-between'>
      <div className='flex w-full justify-between gap-6'>
        <select className='py-3 w-full border-b outline-none border-[#888]' id="province" value={selectedProvince} onChange={handleProvinceChange}>
            <option disabled value="" hidden className='text-[#888]'>Thành phố</option>
            {renderOptions(provinces)}
        </select>
        <select className='py-3 w-full border-b outline-none border-[#888]' value={selectedDistrict} id="district" onChange={handleDistrictChange}>
            <option disabled value="" hidden className='text-[#888]'>Quận/ Huyện</option>
            {renderOptions(districts)}
        </select>
      </div>
      <select className='py-3 w-full border-b outline-none border-[#888]' id="ward" onChange={handleWardChange} value={selectedWard}>
            <option value="" disabled hidden className='text-[#888]'>
                Phường/ Xã
            </option>
            {renderOptions(wards)}
        </select>
    </div>
  );
};

export default AddressApi;
