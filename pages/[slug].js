import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CopyToClipboard } from "react-copy-to-clipboard"
import slugify from "slugify"
import Image from "next/image"
import { server } from "../config"

const PostsData = ({ post }) => {
  const router = useRouter()

  const canonicalUrl = (
    `https://diwali.sanweb.info` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0]

  const copied = () => {
    toast.dark("📝 Copied", {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  }
  const [quotesid, setInput] = useState("")
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

  if (router.isFallback) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center">
          <br />
          <br />
          <br />
          <br />
          <p className="text-gray-800 dark:text-gray-100 text-base">
            Generating the Greeting image...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center">
        <Head>
          <meta name="HandheldFriendly" content="True" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{`${post[0].content} - Happy Diwali Wishes 🪔`}</title>
          <meta
            name="description"
            content={`${post[0].content} - Sending you the Happy Diwali Greeting Wishes.`}
          />
          <link rel="canonical" href={canonicalUrl} />
          <meta
            property="og:title"
            content={`${post[0].content} - Happy Diwali Wishes 🪔`}
          />
          <meta
            property="og:description"
            content={`${post[0].content} - Sending you the Happy Diwali Greeting Wishes.`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta
            property="og:image"
            content={server + `/api/image/` + post[0].slug + `/`}
          />
          <meta property="og:image:alt" content={post[0].content} />
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
            src={server + `/api/image/` + post[0].slug + `/`}
            alt={post[0].content}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            width={1080}
            height={1080}
          />
          <br />
          <div className="flex items-center justify-center">
            <a
              className="bg-purple-500 hover:bg-yellow-600 rounded-full py-2 px-4 text-gray-100 transition-colors focus:outline-none outline-none mt-4 font-bold"
              href={
                `https://download.mskian.com/image/download.php?url=` +
                server +
                `/api/image/` +
                post[0].slug +
                `/`
              }
              target="_blank"
              rel="nofollow noreferrer noopener"
              title="Download your image"
            >
              📥
            </a>
            &nbsp;
            <ToastContainer />
            <CopyToClipboard text={canonicalUrl}>
              <button
                className="bg-green-400 text-black font-medium py-2 px-4 rounded-full mt-4"
                onClick={copied}
              >
                📝 Copy URL
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex items-center justify-center">
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
          </form>
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}

export default PostsData

export const getStaticProps = async ({ params }) => {
  const data = await fetch(`${server}/api/wish/${params.slug}`)
  const post = await data.json()
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths = async () => {
  const response = await fetch(`${server}/api/wish/`)
  const posts = await response.json()
  if (!posts) {
    return {
      notFound: true,
    }
  }
  const paths = posts.map(post => ({
    params: { slug: post.slug.toString() },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}
