import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { makeRequest } from '~/axios';

function FindPet(props) {
    
    const userFetch = useQuery({
        queryKey: ["userAll"],
        queryFn: async () => {
            const res = await makeRequest.get(`/user/getAll`);
            return res.data;
        },
        });
    
    return (
        <div>
            {
                userFetch.isSuccess && <FindPetAddress data = {userFetch.data}/>
            }
        </div>
    );
}
const FindPetAddress = ({ data }) => {
    const [listMarker, setListMarker] = useState([]);
    const [choiceAddress, setChoiceAddress] = useState(null);

    const checkDistance = (address1, address2 )=>{
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/cycling/${address1.longitude},${address2.latitude};${address2.longitude},${address2.latitude}?geometries=geojson&access_token=pk.eyJ1IjoiY29uZ2NodW9uZyIsImEiOiJjbGs5OThpNjEwbWxmM2ZxaWEweGF0bzdsIn0.i6C4TMolt4phtGR7w9dXJw`)
        .then(function(res){
            const distance = res.data.routes[0].distance / 1000 ;
        }) 
        .catch(function(err){
            throw new Error(err);
        })
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const newAddressData = await Promise.all(
            data.map(async (item) => {
              const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.address}.json?access_token=pk.eyJ1IjoiY29uZ2NodW9uZyIsImEiOiJjbGs5OThpNjEwbWxmM2ZxaWEweGF0bzdsIn0.i6C4TMolt4phtGR7w9dXJw`
              );
              return {
                longitude: response.data.features[0].center[0],
                latitude: response.data.features[0].center[1],
              };
            })
          );
  
          checkDistance(newAddressData[0], newAddressData[1])
          setListMarker(newAddressData);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [data]);

    const handleViewportChange = (viewPort) =>{
        setChoiceAddress({ longitude: viewPort.longitude, latitude: viewPort.latitude });
    }
    const handleMapClick = (event) => {
        // Lấy thông tin vị trí từ sự kiện click
        const { lngLat } = event;
        const [longitude, latitude] = lngLat;

        // Gọi hàm onViewportChange với vị trí đã chọn
        handleViewportChange({ longitude, latitude });
    };

  
    return (
    //   <div className='fixed z-50 inset-0'>
            <Map
            // mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: '106.666364',
                latitude: '10.736901',
                zoom: 3.5
            }}
            mapboxAccessToken="pk.eyJ1IjoiY29uZ2NodW9uZyIsImEiOiJjbGs5OThpNjEwbWxmM2ZxaWEweGF0bzdsIn0.i6C4TMolt4phtGR7w9dXJw"
            style={{ width: '600px', height: '500px' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={handleViewportChange}
            onDblClick={handleMapClick}
        >

            {listMarker.map((item, index) => {
                return (<Marker key={index} longitude={item.longitude} latitude={item.latitude}>
                        <img width={20} height={20} src="https://cdn.pixabay.com/photo/2014/04/02/10/45/location-304467_1280.png" />
                    </Marker>)
            })}
        </Map>
    //   </div>
    );
  };
  
  

export default FindPet;