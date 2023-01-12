import { Category } from "../../../lib/interfaces"

const CategoryInfo = ({ _id, categories }: { _id: string, categories: Category[] }) => {
  
  const thisCategory = categories.find(category => category._id === _id)

  if(!thisCategory) return <></>
  return (
    <div className="grid grid-cols-4 w-full border-t-[1px] pt-6">
      {
        Object.entries(thisCategory.variables).map(([key, val]) => {
          console.log(val.options)
          return (
            <ul >
              <li className="font-semibold">{key}</li>
              {
                val?.options?.map((opt) => (
                  opt.includes('#') ?
                  <div style={{background: opt}} className="w-6 h-6 my-3 rounded-full shadow-md" />
                  :
                  <li className="text-sm my-3">{opt}</li>
              ))
              }
            </ul>
          )
        })
      }
    </div>
  )
}

export default CategoryInfo