import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import {  collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



function Send() {

  const [fileUrl, setfileUrl] = useState(null);
  const [fileName,setFileName] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [fileUpload,setFileUpload] = useState(false);
  const [shareCode,setShareCode] = useState(null);
  const [feedBack,setFeedBack] = useState(false)


  const navigate = useNavigate();

  const changeHandler=(e)=>{
    if (e.target.files.length > 0) {
     let filename = e.target.files[0].name;
      console.log(filename);
      setFileName(filename);
    }
  }

  const getRandomTexusId = async () => {
    const min = 10000;
    const max = 99999;
    const rand = min + Math.random() * (max - min);
    const collectionRef = collection(db, "shareRooms");
    const q = await getDocs(collectionRef);
    const ids = q.docs.map((doc) => doc.id);
    if (ids.includes(String(Math.round(rand)))) {
      getRandomTexusId();
    }

  
    // console.log(String(Math.round(rand)));
    return String(Math.round(rand));
  };

  // const addData = async () => {
  //   const roomId = await getRandomTexusId();
  //   if (roomId){
  //     await 
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          setfileUrl(downloadURL)
          const roomId =  await getRandomTexusId();
          await setDoc(
            doc(db,"shareRooms",roomId),
            {
              name: 'text',
              file: downloadURL,
              received: false,
              createdAt: serverTimestamp()
            },
            {merge: true}
          ).then(async () => {
            console.log("real");
            setFileUpload(true);
            setShareCode(roomId);
          }).catch((error) => alert(error.message));
        });
      }
      );
      // 
    }

    const handleCancel = () => {
      const fileRef = ref(storage, `files/${fileName}`);
      if (fileName){
        deleteObject(fileRef).then(async() => {
          const docRef = doc(db,"shareRooms",shareCode);
          await deleteDoc(docRef).then(() => {
            //alert deleted
            navigate('/home');
          }).catch((error) => alert(error.message));
        }).catch((error) => alert(error.message));
      }
    }

    
    

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200'>
      <div className="h-full w-full font-sans text-gray-900 flex items-center justify-center">
    <div className="flex items-center justify-center w-full mx-auto sm:max-w-lg">

        <div className="flex flex-col items-center justify-center w-full h-96 my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl ">
          {
            !fileUpload?

        <>
            <div className="mt-10 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                <p className="text-xs text-gray-500">File should be of format .pdf, .docx, .xlsx or .txt</p>
            </div>
            <form onSubmit={handleSubmit} className="relative w-4/5 h-32 max-w-xs mb-10 bg-gray-100 rounded-lg shadow-inner">
                <input type="file" id="file-upload" className='hidden' onChange={changeHandler} />
                <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                  {
                    !fileName ?
                    <>
                    <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                    <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                    </>
                    :
                    <p>{fileName}</p>
                  }
                </label>
                <div className='flex justify-center items-center mt-5'>
                  {
                    !fileUrl ?
                <button type='submit' className='px-4 py-2 bg-gradient-to-br from-[#007FFF] to-indigo-200 text-white rounded-lg hover:bg-gradient-to-br hover:from-indigo-200 hover:to-[#007FFF] transform transition-all duration-300 hover:scale-110'>
                  Upload
                  </button>
                  :
                  <>
                  {
                  progresspercent < 100 ?
                  <button disabled className='px-4 py-2 text-white rounded-lg  bg-gradient-to-br from-indigo-200 to-[#007FFF]'>
                    Uploading {progresspercent}%
                  </button>
                  :
                  <button disabled className='px-4 py-2 text-white rounded-lg  bg-gradient-to-br from-indigo-200 to-[#007FFF]'>Uploaded</button>
                  }
                  </>
                  }
                </div>
            </form>
            </>
            :
            <>
            <div className="mt-10 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-2">Share the Drop Code</h2>
                <p className="text-xs text-gray-500">Share this code with receiver to get the file</p>
            </div>
            <div className='relative w-4/5 h-32 max-w-xs mb-10 bg-gray-100 rounded-lg shadow-inner flex justify-center items-center'>
                  <h1 className='text-4xl font-bold tracking-widest'>{shareCode}</h1>
            </div>
            <div className=''>
              <button className='underline' onClick={handleCancel}>Cancel</button>
            </div>
            </>

          }
        </div>
    </div>
</div>

    </div>
  )
}

export default Send