import React, {useRef, useState} from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { BiPlusCircle , BiMinusCircle} from 'react-icons/bi'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useForm } from 'react-hook-form'
import { MdLocationOn } from "react-icons/md";
import { createAddress } from "../../apis";
import { useMutation } from "@tanstack/react-query";
import { AddAddressFormValues, AddressBody } from "../../lib/interfaces";
import { toast } from "react-toastify";

const AddAddress = () => {
  const [isCreate, setIsCreate] = useState(false);
  const locRef = useRef<null>(null);

  const { register: addressReg, handleSubmit, formState:{errors}, getValues, setValue  } = useForm({
    defaultValues: {
        address:'',
        postalcode: '',
        receiver: { name: '', phone: '' },
        geo: { lat: '51.505', lon: '-0.09' }
    }
  })

  const addAddress = useMutation({
    mutationFn: async (address: AddressBody) => await createAddress(address),
    onSuccess: async (res) => {
      console.log(res)
      toast.success("Address added successfully")
    },
    onError:(res) => console.log(res)
  })

  const onSubmit = (data: AddAddressFormValues) => {
    console.log(data)
    addAddress.mutate({
      location: {
        address: data.address,
        postalcode: data.postalcode,
        geo: {
          //@ts-ignore
          lat: parseFloat(locRef.current?.getCenter().lat), 
          //@ts-ignore
          lon: parseFloat(locRef.current?.getCenter().lng), 
        }
      },
      receiver: {
        name: data.receiver.name,
        phone: data.receiver.phone
      }
    })
  }
  return (
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
        <div className="flex flex-col w-1/2 lg:w-3/4 md:w-full">
          {errors.receiver?.name  && (<p className='text-xs text-reddish ml-3'>Please enter receiver name</p>)}
          <input
            placeholder='Full Name'
            style={errors.receiver?.name && {border: "1px", borderStyle: "solid", borderColor: "red"}}
            className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-4`}
            {...addressReg("receiver.name", {required: true, maxLength: 50})}
            />
          {errors.address && (<p className='text-xs text-reddish ml-3'>Please enter receiver name</p>)}
          <input
            placeholder='Address'
            style={errors.address &&  {border: "1px", borderStyle: "solid", borderColor: "red"}}
            className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-4`}
            {...addressReg("address", {required: true, maxLength: 50})}
            />
          {errors.receiver?.phone && (<p className='text-xs text-reddish ml-3'>Please enter receiver address</p>)}
          <input
              placeholder='Phone Number'
              type='number'
            style={errors.receiver?.phone && {border: "1px", borderStyle: "solid", borderColor: "red"}}
            className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-4`}
            {...addressReg("receiver.phone", {required: true, maxLength: 50})}
            />
            {errors.postalcode && (<p className='text-xs text-reddish ml-3'>Please enter receiver postal code</p>)}
          <input
              placeholder='Postal Code'
              type='number'
            style={errors.postalcode &&  {border: "1px", borderStyle: "solid", borderColor: "red"}}
            className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-4`}
            {...addressReg("postalcode", {required: true, maxLength: 50})}
            />
          <div className="w-full h-[200px] rounded-2xl overflow-hidden mt-1">
              <MapContainer
              ref={locRef}
              className="h-full"
               center={[50,50]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
              <MdLocationOn className='absolute top-[calc(50%-1.5rem)] left-[calc(50%-1.5rem)] z-[1000] text-[3rem] text-primary' />
            </MapContainer>
          </div>
          <button type="submit" className="dashboard-btn">Add Address</button>
        </div>
      </form>
    )}
    </div>
  )
}

export default AddAddress