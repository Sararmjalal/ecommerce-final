import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GuideLinkArg } from '../../lib/interfaces'
import { BsHouseDoorFill } from 'react-icons/bs'

const GuideLink = ({ args }: { args: GuideLinkArg[] }) => {

  const { asPath } = useRouter()
  
  return (
    <div className='flex gap-2 text-grayish items-center text-sm mb-9'>
    <Link href='/'>
      <BsHouseDoorFill fontSize={15}/>
    </Link>
    <span>/</span>
    {
        args.map(({ name, href }, index, ref) => (
            <div
              key={name+index}
              className='flex gap-2 text-grayish items-center text-sm'>
            <Link href={href}
              style={{
                color: !href.query && href.pathname === asPath ? 'black'
                  : 
                    href.query?._id === asPath ? 'black'
                    :
                    "inherit"
              }}>
              {name}
            </Link>
            <span>{index + 1 < ref.length && "/"}</span>
          </div>
        ))}
    </div>
  )
}


export default GuideLink