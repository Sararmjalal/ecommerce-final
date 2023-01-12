import React, { useState, useRef } from "react";
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

const MyAddresses = () => {
  const [isCreate, setIsCreate] = useState(false);
  const locRef = useRef<null>(null);
  console.log(locRef.current)

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
          lat: parseFloat(locRef.current?.getCenter().lat),
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
    <>
    <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 p-6'></div>
   
      </>
  );
}; 

export default MyAddresses;
