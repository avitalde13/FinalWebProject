// import { ChangeEvent, useRef, useState } from 'react'
// import avatar from '../assets/avatar.png'
// import { faImage } from '@fortawesome/free-solid-svg-icons'
// import { uploadPhoto } from '../services/file-service'

// // import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Container, Typography, Divider, Card, CardContent, Grid , Stack , TextField, Box} from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import Navbar from "../components/NavBar";
// import axios from 'axios'
// import React from 'react'

// export interface IUser {
//   email: string,
//   password?: string,
//   imgUrl?: string,
//   _id?: string,
//   accessToken?: string,
//   refreshToken?: string
// }


// function Registration() {
//     const [imgSrc, setImgSrc] = useState<File>()
//     const [userRegister, setUserRegister] = React.useState({ email: "", password: "", name: "", profilePic: "" });
//     const [isLoggedIn, setIsLoggedIn] = React.useState(false);




//     const registrUser = (user: IUser) => {
//       const accessToken= axios.post('http://localhost:3000/users/register', { user: userRegister }).then(res => res.data);
//       if (accessToken) {
//         localStorage.setItem('accessToken', JSON.stringify(accessToken));
//   }
//   }

//     const fileInputRef = useRef<HTMLInputElement>(null)
//     const emailInputRef = useRef<HTMLInputElement>(null)
//     const passwordInputRef = useRef<HTMLInputElement>(null)


    // const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value)
    //     if (e.target.files && e.target.files.length > 0) {
    //         setImgSrc(e.target.files[0])
    //     }
    // }
    // const selectImg = () => {
    //     console.log("Selecting image...")
    //     fileInputRef.current?.click()
    // }

//     const register = async () => {
//       console.log("registering")
//       console.log(emailInputRef.current?.value) 
//       console.log(passwordInputRef.current?.value)
//         const url = await uploadPhoto(imgSrc!);
//         console.log("upload returned:" + url);
//         if (emailInputRef.current?.value && passwordInputRef.current?.value) {
//             const user: IUser = {
//                 email: emailInputRef.current?.value,
//                 password: passwordInputRef.current?.value,
//                 imgUrl: url
//             }
//             const res = await registrUser(user)
//             console.log(res)
//         }
//     }

//     // const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
//     //     console.log(credentialResponse)
//     //     try {
//     //         const res = await googleSignin(credentialResponse)
//     //         console.log(res)
//     //     } catch (e) {
//     //         console.log(e)
//     //     }
//     // }

//     // const onGoogleLoginFailure = () => {
//     //     console.log("Google login failed")
//     // }
//     return (
//         <div className="vstack gap-3 col-md-7 mx-auto" >
//           <Navbar />
//         <Typography variant="h3" align="center" gutterBottom fontFamily={'-moz-initial'} bgcolor={'grey'}>
//           Rgister
//         </Typography>


//         <Box display={"flex"} justifyContent={'center'}>
//         <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "250px", width: "250px" }} className="img-fluid" />
        
//         </Box>


        


//         <Box display={"flex"} justifyContent={'center'}>
       
//             <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
            


//             <Stack spacing={2} margin={2} width={400}>
//             <Button color="info" variant="contained"  onClick={selectImg}>Upload Profile Image</Button> 
           
//             <TextField ref={emailInputRef} variant="outlined" label="Email" > </TextField>
//             <TextField ref={passwordInputRef} variant="outlined" label="Password" type="Password" ></TextField>
//             <Button color="info" variant="contained" onClick={register}>Register</Button>
//             </Stack>
//             </Box>

//             {/* <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} /> */}
//         </div>)
// }

// export default Registration;