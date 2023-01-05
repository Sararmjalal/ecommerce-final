import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { BiPlusCircle , BiMinusCircle} from 'react-icons/bi'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {useForm, useFieldArray} from 'react-hook-form'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyAddresses = () => {
  const [isCreate, setIsCreate] = useState(false);

  const { register: addressReg, control, handleSubmit, formState:{errors}, getValues, setValue  } = useForm({
    defaultValues: {
      newAddress: [{
        receiver: { name: '', phone: ''},
        location: {
          geo: [{ lat: '51.505', lon: '-0.09' }]
        }
      }]
    }
  })

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "newAddress",
  });

  const onSubmit = (data: unknown) => console.log(data)

  return (
    <>
    <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 p-6'></div>
    <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 p-6'>
      {isCreate ?
        <BiMinusCircle
          onClick={() => setIsCreate(false)}
          className="text-2xl cursor-pointer hover:scale-110 transition duration-200" />
        :
        <BiPlusCircle
          onClick={() => setIsCreate(true)}
          className="text-2xl cursor-pointer hover:scale-110 transition duration-200" />}

      {isCreate && (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <label className='ml-1'>Reciever Information:</label>
          <div className="flex flex-col w-1/2 md:w-full">
            {errors.newAddress && errors.newAddress[0]?.receiver?.name && (<p className='text-xs text-reddish ml-3'>Please enter receiver name</p>)}
            <input
              placeholder='Full Name'
              style={errors.newAddress && errors.newAddress[0]?.receiver?.name && {border: "1px", borderStyle: "solid", borderColor: "red"}}
              className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-4`}
              {...addressReg("newAddress.0.receiver.name", {required: true, maxLength: 50})}
              />
            {errors.newAddress && errors.newAddress[0]?.receiver?.phone && (<p className='text-xs text-reddish ml-3'>Please enter receiver phone</p>)}
            <input
              placeholder='Phone Number'
              style={errors.newAddress && errors.newAddress[0]?.receiver?.phone && {border: "1px", borderStyle: "solid", borderColor: "red"}}
              className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-4`}
              {...addressReg("newAddress.0.receiver.phone", {required: true, maxLength: 50})}
              />
            <div className="w-full h-[200px] rounded-2xl overflow-hidden mt-1">
              <MapContainer
                className="h-full"
                 center={[50,50]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker
                    icon={DefaultIcon}
                    position={[51.505, -0.09]}></Marker> 
              </MapContainer>
            </div>
            <button type="submit" className="dashboard-btn">Add Address</button>
          </div>
        </form>
      )}
      </div>
      </>
  );
}; 

export default MyAddresses;
