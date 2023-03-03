import { ref, update } from 'firebase/database'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { db } from '../../firebase'
import { cellProps } from '../../interface/cellProps'
import styles from './Cell.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify'
interface Props {
  setCellArr:Dispatch<React.SetStateAction<cellProps[]>>
  cellArr:cellProps[]
  num:number
  isDoned:boolean
  types:string
}
const Cell = ({setCellArr,cellArr,num,isDoned,types}: Props) => {
  const {pathname} = useLocation()
  const [user, loading, error] = useAuthState(auth);
    const [isDone,setIsDone]= useState(false)
    let   editText =()=> {
      if(pathname=='/3lot') {
          if(types=="asf") {
        update(ref(db, "0/0/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="kz") {
        update(ref(db, "0/1/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="spcc") {
        update(ref(db, "0/2/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="c4") {
        update(ref(db, "0/3/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="zp") {
        update(ref(db, "0/4/" + num ), {
          isDones: !isDone
        });
      }
      if(types=="asfl") {
        update(ref(db, "0/5/" + num ), {
          isDones: !isDone
        });
      }
      if(types=="kzl") {
        update(ref(db, "0/6/" + num ), {
          isDones: !isDone
        });
      }
      if(types=="spccl") {
        update(ref(db, "0/7/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="c4l") {
        update(ref(db, "0/8/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="zpl") {
        update(ref(db, "0/9/" + num ), {
          isDones: !isDone
        });
      }
    }else if(pathname=='/4lot') {
      if(types=="asf") {
        update(ref(db, "1/0/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="kz") {
        update(ref(db, "1/1/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="spcc") {
        update(ref(db, "1/2/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="c4") {
        update(ref(db, "1/3/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="zp") {
        update(ref(db, "1/4/" + num ), {
          isDones: !isDone
        });
      }
      if(types=="asfl") {
        update(ref(db, "1/5/" + num ), {
          isDones: !isDone
        });
      }
      if(types=="kzl") {
        update(ref(db, "1/6/" + num ), {
          isDones: !isDone
        });
      }
      if(types=="spccl") {
        update(ref(db, "1/7/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="c4l") {
        update(ref(db, "1/8/" + num ), {
          isDones: !isDone
        });
      }

      if(types=="zpl") {
        update(ref(db, "1/9/" + num ), {
          isDones: !isDone
        });
      }
    
    }
      
    }


    const handleClick=()=> {
     if(user) {
      const newArr=  cellArr.map(item=> {
        setIsDone(!isDone)
          if(item.num === num) {
            return {...item, isDones:!isDone}
          }
          return item
        })
        setCellArr(newArr)
        editText()
     }else {
      toast.error('Для редактирования зайдите  в режим Админа', {
   
        autoClose: 1000,
        
        });
     }
    }
  return (
    <div className={isDoned? styles.cellDone: styles.cell} onClick={handleClick}>
        
    </div>
  )
}

export default Cell