import type { NextPage } from 'next'
import {Router, useRouter} from "next/router";
import {RoutesModel} from "./model/routes.model";

const Home: NextPage = () => {

  const router = useRouter()

  const routes = RoutesModel

  Router.events.on("routeChangeComplete", () => {

  })

  return (
    <div className="main-container">
        <style jsx />
      <div>
        {routes.map((route) => (
            <div>
              <a onClick={() => router.push(route.url)} >{route.title}</a>
            </div>
        ))}
      </div>
      <div />
    </div>
  )
}

export default Home
