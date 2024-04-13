
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getAddressFromCoordinates } from '~/API/openCageGeocodingAPI.js';

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(new Error('Lỗi khi truy cập vị trí: ' + error.message));
      }
    );
  });
};

const CurrentLocation = ({getCurrentPosition}) => {
  const { isLoading, isError, data, error } = useQuery(
    ['currentAddress'],
    async () => {
      const { latitude, longitude } = await getCurrentPosition();
      return getAddressFromCoordinates(latitude, longitude);
    }
  );

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    return <div>Lỗi: {error.message}</div>;
  }

  useEffect(() => {
    getCurrentPosition(data); 
  }, [data, getCurrentPosition]);

  return (
    <div>
      <h1>Địa chỉ hiện tại: {data}</h1>
    </div>
  );
};

export default CurrentLocation;
