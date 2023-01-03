import ListItem from "./ListItem"

const List = ({ data, name }: { data: any, name: string }) => {
  return (
    <div>
      {!data[0] ?
        <p className='font-light'>No {name.slice(0,1).toUpperCase() + name.slice(1)} found.</p>
        :
        data.map((item: any) => (<ListItem key={item._id} item={item} name={name} />))
    }
   </div>
  )
}

export default List