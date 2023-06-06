import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { db } from '../firebase';

function Receive() {
  const [code, setCode] = useState("");
  const [file,setFile] = useState();

  const handleChange = (code) => {
    setCode(code);
  }
  const handleCancel = () => {
    console.log("cancel")
  }
  const handleSubmit = async() => {

    console.log(code)
    const docRef = doc(db,"shareRooms",code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      const fileDoc = docSnap.data()
      setFile(fileDoc)

    } else {
      console.log("Error in OTP")
    }
  }
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          {
            !file?
          <>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Enter the Drop Code</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Enter the code from the sender to get the file</p>
            </div>
          </div>
    
          <div>
              <div className="flex flex-col space-y-16">
                <div className='flex justify-center items-center'>
              <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={5}
              renderSeparator={<span style={{ width: "9px" }}></span>}
              shouldAutoFocus={true}
              inputStyle={{
                  border: "1.5px solid #808080",
                  borderRadius: "8px",
                  width: "58px",
                  height: "58px",
                  fontSize: "20px",
                  color: "#000",
                  fontWeight: "700",
                  caretColor: "blue",
                  outline: 'None',
                  
                }}
              renderInput={(props) => <input {...props} />}
            />
    </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    onClick={handleSubmit}
                    >
                      Download
                    </button>
                  </div>
    
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <button className='underline' onClick={handleCancel}>Cancel</button>
                    {/* <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a> */}
                  </div>
                </div>
              </div>
          </div>
          </>
          :
          <>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Hurray!, File Received from {file.name}</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Thank you for using DropIt, Click Download to receive your file </p>
            </div>
            {/* <div className="flex flex-col space-y-5"> */}
                  <div className='w-3/4'>
                    <a className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    href={file.file}
                    target="_blank"
                    rel='noreferrer'
                    download
                    >
                      Download 
                    </a>
                  </div>
            {/* </div> */}
          </div>
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default Receive