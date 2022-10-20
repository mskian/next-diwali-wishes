import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-indigo-200 dark:bg-current">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
