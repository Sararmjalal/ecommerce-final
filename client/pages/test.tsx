import GuideLink from "../components/main/GuideLink"

const Test = () => {

  return (
    <div>
      <GuideLink
        args={[{
        name: "dalam",
          href: {
          pathname: "/test"
        }
        },
          {
            name: "geee",
            href: {
              pathname: "/about"
            }
          },
          {
            name: "Its product",
            href: {
              pathname: "/product/[_id]",
              query: {
                _id: "geeee"
              }
            }
          }
        ]}
      />
    </div>
  )
}

export default Test