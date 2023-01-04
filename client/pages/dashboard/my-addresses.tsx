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
      addresses: [{
        receiver: { name: '', phone: ''},
        location: {
          geo: { lat: '', lon: '' }
        }
      }]
    }
  })

  const { fields: variables, append, update, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  return (
    <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 p-6'>
      {isCreate ? <BiMinusCircle className="text-2xl cursor-pointer hover:scale-110 transition duration-200"/> : <BiPlusCircle className="text-2xl cursor-pointer hover:scale-110 transition duration-200"/>}

      {isCreate && (
        <form>
          <label className='ml-1'>Reciever Information:</label>
          <div className="flex flex-col gap-2 w-1/2 md:w-full">
            {/* {errors.name && (<p className='text-xs text-reddish ml-3'>Please enter category name</p>)} */}
            <input
              placeholder='Full Name'
              // style={errors.name?.ref && {border: "1px", borderStyle: "solid", borderColor: "red"}}
              className='dashboard-input'
              // {...register("name", {required: true, maxLength: 50})}
            />
            <input
              placeholder='Phone Number'
              // style={errors.name?.ref && {border: "1px", borderStyle: "solid", borderColor: "red"}}
              className='dashboard-input'
              // {...register("name", {required: true, maxLength: 50})}
            />
          <div className="w-full h-[200px] rounded-2xl overflow-hidden mt-1">
            <MapContainer
              className="h-full"
               center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker
                  icon={DefaultIcon}
                  position={[51.505, -0.09]}></Marker>
              </MapContainer>
        </div>
          </div>
          </form>
      )}
    </div>
  );
}; 

export default MyAddresses;
