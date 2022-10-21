import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import slugify from "slugify"
import Image from "next/image"
import { server } from "../config"

export default function Index2() {
  const [quotesid, setInput] = useState("")
  const router = useRouter()

  const canonicalUrl = (
    `https://diwali.sanweb.info` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0]

  const subscribe = e => {
    e.preventDefault()
    if (quotesid == 0) {
      console.log("Empty Name")
      toast.error("🤖 Empty Name", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      })
      return false
    }
    const users = slugify(quotesid, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: false,
      strict: false,
    })
    const userslug = encodeURIComponent(users)
    window.open(`/${userslug}/`, "_self", "noopener, noreferrer")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center">
        <Head>
          <meta name="HandheldFriendly" content="True" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Happy Diwali Wishes Greeting Generator 🪔</title>
          <meta
            name="description"
            content="Create Happy Diwali Greeting Wishes with Name in image."
          />
          <link rel="canonical" href={canonicalUrl} />
          <meta
            property="og:title"
            content="Happy Diwali Wishes Greeting Generator 🪔"
          />
          <meta
            property="og:description"
            content="Create Happy Diwali Greeting Wishes with Name in image."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta
            property="og:image"
            content={server + `/api/image/Your-Name/`}
          />
          <meta property="og:image:alt" content="Happy Diwali" />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/icons/favicon-196.png"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/icons/favicon.ico"
          />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Happy Diwali" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Happy Diwali" />
          <link
            rel="preconnect"
            href="https://img.sanweb.info/"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
        </Head>
        <div className="dark:bg-pink-200 dark:border-pink-200 bg-white rounded-2xl border shadow-xl p-10 max-w-lg mt-6">
          <Image
            src={server + `/api/image/Your-Name/`}
            alt="Happy Diwali"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            width={1080}
            height={1080}
          />
        </div>
        <form method="GET" className="m-7 flex">
          <input
            id="quotesid"
            name="quotesid"
            method="POST"
            className="w-15 text-center rounded-l-lg p-0 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Your Name"
            autoComplete="off"
            maxLength="30"
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={subscribe}
            className="w-15 px-4 rounded-r-lg bg-purple-400 text-gray-800 font-bold p-4 uppercase border-purple-500 border-t border-b border-r"
          >
            Create
          </button>
          <ToastContainer />
        </form>
      </div>
      <br />
    </div>
  )
}
