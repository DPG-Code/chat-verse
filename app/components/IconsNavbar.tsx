import { IconNavbarType } from "../types"

const ICON_ROUTE = {
  chat: () => {
    return (
      <svg className="w-6 h-6 lg:w-8 lg:h-8" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M0 0h24v24H0z" />
          <path fill="currentColor" d="M5.821 4.91c3.898-2.765 9.469-2.539 13.073.536c3.667 3.127 4.168 8.238 1.152 11.897c-2.842 3.447-7.965 4.583-12.231 2.805l-.232-.101l-4.375.931l-.075.013l-.11.009l-.113-.004l-.044-.005l-.11-.02l-.105-.034l-.1-.044l-.076-.042l-.108-.077l-.081-.074l-.073-.083l-.053-.075l-.065-.115l-.042-.106l-.031-.113l-.013-.075l-.009-.11l.004-.113l.005-.044l.02-.11l.022-.072l1.15-3.451l-.022-.036C.969 12.45 1.97 7.805 5.59 5.079l.23-.168z" />
        </g>
      </svg>
    )
  },
  users: () => {
    return (
      <svg className="w-6 h-6 lg:w-8 lg:h-8" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
        <path fill="currentColor" d="M7 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m7.5 1a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5M1.615 16.428a1.224 1.224 0 0 1-.569-1.175a6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572M14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755a4.502 4.502 0 0 1 5.874 2.636a.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16" />
      </svg>
    )
  },
  logout: () => {
    return (
      <svg className="w-6 h-6 lg:w-8 lg:h-8" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" fillRule="evenodd" d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z" clipRule="evenodd" />
      </svg>
    )
  }
}

export const IconsNavbar = ({ icon }: { icon: IconNavbarType }) => {
  const IconComponent = ICON_ROUTE[icon]

  return <IconComponent />
}
