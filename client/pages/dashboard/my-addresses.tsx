import { useQuery } from "@tanstack/react-query";
import { myAddresses } from "../../apis";
import AddAddress from "../../components/user-panel/AddAddress";

const MyAddresses = () => {
  const { data } = useQuery({
    // queryKey: ['addresses'],
    queryFn: async () => await myAddresses(),
    onSuccess: (res) => console.log(res),
    onError: (res) => console.log(res),
  })
  console.log(data)
  return (
    <>
    <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 p-6'></div>
      <AddAddress />
      </>
  );
}; 

export default MyAddresses;
