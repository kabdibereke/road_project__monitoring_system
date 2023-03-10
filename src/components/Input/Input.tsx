import React, { useEffect, useState } from 'react'
import { InputProps } from './Input.props';
import styles from './Input.module.css'
import { ref, update } from 'firebase/database'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
interface Props extends InputProps{
  
    initialValue:number
    types:string
}

const Input = ({initialValue, types, ...props}:Props ) => {
    const [isActive, setIsActive]= useState(false)
    const [text, setText] = useState(initialValue)
    const [user, loading, error] = useAuthState(auth);
    const {pathname} = useLocation()
    const editText=()=> {
        if(user) {
            if(pathname=='/3lot') {
                if(types=="sma.right") {
                    update(ref(db, "0/sma"), {
                      right: text/1000
                    });
                    
                }
                if(types=="sma.left") {
                    update(ref(db, "0/sma"), {
                        left: text/1000
                    });
                }
                if(types=="kz.right") {
                    update(ref(db, "0/kz"), {
                      right: text/1000
                    });
                }
                if(types=="kz.left") {
                    update(ref(db, "0/kz"), {
                        left: text/1000
                    });
                }
                if(types=="spcc.right") {
                    update(ref(db, "0/spcc"), {
                      right: text/1000
                    });
                }
                if(types=="spcc.left") {
                    update(ref(db, "0/spcc"), {
                        left: text/1000
                    });
                }
                if(types=="c4.right") {
                    update(ref(db, "0/c4"), {
                      right: text/1000
                    });
                }
                if(types=="c4.left") {
                    update(ref(db, "0/c4"), {
                        left: text/1000
                    });
                }
                if(types=="zp.right") {
                    update(ref(db, "0/zp"), {
                      right: text/1000
                    });
                }
                if(types=="zp.left") {
                    update(ref(db, "0/zp"), {
                        left: text/1000
                    });
                }
            }else if(pathname=='/4lot') {
                if(types=="sma.right") {
                    update(ref(db, "1/sma"), {
                      right: text/1000
                    });
                    
                }
                if(types=="sma.left") {
                    update(ref(db, "1/sma"), {
                        left: text/1000
                    });
                }
                if(types=="kz.right") {
                    update(ref(db, "1/kz"), {
                      right: text/1000
                    });
                }
                if(types=="kz.left") {
                    update(ref(db, "1/kz"), {
                        left: text/1000
                    });
                }
                if(types=="spcc.right") {
                    update(ref(db, "1/spcc"), {
                      right: text/1000
                    });
                }
                if(types=="spcc.left") {
                    update(ref(db, "1/spcc"), {
                        left: text/1000
                    });
                }
                if(types=="c4.right") {
                    update(ref(db, "1/c4"), {
                      right: text/1000
                    });
                }
                if(types=="c4.left") {
                    update(ref(db, "1/c4"), {
                        left: text/1000
                    });
                }
                if(types=="zp.right") {
                    update(ref(db, "1/zp"), {
                      right: text/1000
                    });
                }
                if(types=="zp.left") {
                    update(ref(db, "1/zp"), {
                        left: text/1000
                    });
                }
            }
       
          setIsActive(false)
          toast.success("??????????????????")
        }
    }
    
    const handleInput=(event:any )=> {
        if(event.detail === 2) {
            if(user) {
                setIsActive(true)
                toast.warn("?????????????? ???????????? ?????????? ?? ?????? ?????????????????? ??????????. ?????????? ???????? ???????????????? ?????????? ???????????????? ???? 1000",
                {
                    autoClose: 2000,
                })
            }else {
                toast.error('?????? ???????????????????????????? ??????????????  ?? ?????????? ????????????', {
             
                  autoClose: 1000,
                  
                  });
            }
        }
    }

    function handleNumberKeyDown(event:React.KeyboardEvent<HTMLInputElement>) {
        const keyCode = event.keyCode || event.which;
        if(keyCode===13) {
            editText()
            return 
        }
        if ( keyCode === 8 || (keyCode >= 48 && keyCode <= 57)|| (keyCode >= 96 && keyCode <= 105)) {
          return true
        } else {
          event.preventDefault();
          toast.warn("?????????????? ???????????? ?????????? ?? ?????? ?????????????????? ??????????",
          {
             autoClose: 1000,
         })
        }
        
    }

  return (
   <>
   
   {isActive ? <div className={styles.input_wrapper}>
   <TextField sx={{width:"100px"}}
    hiddenLabel
    id="filled-hidden-label-small"
    defaultValue={text}
    variant="filled"
    size="small"
    value={text}   onChange={(e)=> setText(+e.target.value)}  onKeyDown={handleNumberKeyDown}
    />
    <CheckIcon className={styles.input_close} onClick={editText}/>
    <CloseIcon className={styles.input_close} onClick={()=>setIsActive(false)}/>
   </div>:<div className={styles.text} onClick={handleInput}>{initialValue}</div> }
   
   </>
  )
}

export default Input