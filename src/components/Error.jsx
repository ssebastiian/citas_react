const Error = ({children}) => {
  return (
    <div className="bg-red-800 text-center text-white p-3 uppercase rounded-md font-bold mb-3">
            {children}
    </div>
  )
}

export default Error