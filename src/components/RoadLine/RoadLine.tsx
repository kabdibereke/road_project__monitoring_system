import React, { useState,useEffect } from 'react'
import Container from '@mui/material/Container';
import styles from './RoadLine.module.css'
import Cell from '../Cell/Cell';
import { cellProps } from '../../interface/cellProps';
import {  ref, onValue} from "firebase/database";
import {db} from '../../firebase'
import Tables from '../Tables/Tables';
import { ToastContainer } from 'react-toastify';
import { redirect, useLocation } from 'react-router-dom';
let pk = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","272","273","274","275","276","277","278","279","280","281","282","283","284","285","286","287","288","289","290","291","292","293","294","295","296","297","298","299","300","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","374","375","376","377","378","379","380","381","382","383","384","385","386","387","388","389","390","391","392","393","394","395","396","397","398","399","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422"
]
let pk2 =["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","272","273","274","275","276","277","278","279","280","281","282","283","284","285","286","287","288","289","290","291","292","293","294","295","296","297","298","299","300","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","374","375","376","377","378","379","380","381","382","383","384","385","386","387","388","389","390","391","392","393","394","395","396","397","398","399","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433","434","435","436","437","438","439","440","441","442","443","444","445","446","447","448","449","450","451","452","453","454","455","456","457","458","459","460"]

const RoadLine = () => {
    const [cellArr, setCellArr] = useState<cellProps[]>([])
    const [KZ, setKZ] = useState<cellProps[]>([])
    const [SPCC, setSPCC] = useState<cellProps[]>([])
    const [C4, setC4] = useState<cellProps[]>([])
    const [ZP, setZP] = useState<cellProps[]>([])
    const [cellArrL, setCellArrL] = useState<cellProps[]>([])
    const [KZL, setKZL] = useState<cellProps[]>([])
    const [SPCCL, setSPCCL] = useState<cellProps[]>([])
    const [C4L, setC4L] = useState<cellProps[]>([])
    const [ZPL, setZPL] = useState<cellProps[]>([])
    
    const {pathname} = useLocation()

    
    useEffect(() => {
		try {
            onValue(ref(db), (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    if(pathname=='/3lot') {
                        setCellArr(Object.values(data[0][0]) as cellProps[])
                        setKZ(Object.values(data[0][1]) as cellProps[])
                        setSPCC(Object.values(data[0][2]) as cellProps[])
                        setC4(Object.values(data[0][3]) as cellProps[])
                        setZP(Object.values(data[0][4]) as cellProps[])
                        setCellArrL(Object.values(data[0][5]) as cellProps[])
                        setKZL(Object.values(data[0][6]) as cellProps[])
                        setSPCCL(Object.values(data[0][7]) as cellProps[])
                        setC4L(Object.values(data[0][8]) as cellProps[])
                        setZPL(Object.values(data[0][9]) as cellProps[])
                    }else if(pathname=='/4lot') {
                        setCellArr(Object.values(data[1][0]) as cellProps[])
                        setKZ(Object.values(data[1][1]) as cellProps[])
                        setSPCC(Object.values(data[1][2]) as cellProps[])
                        setC4(Object.values(data[1][3]) as cellProps[])
                        setZP(Object.values(data[1][4]) as cellProps[])
                        setCellArrL(Object.values(data[1][5]) as cellProps[])
                        setKZL(Object.values(data[1][6]) as cellProps[])
                        setSPCCL(Object.values(data[1][7]) as cellProps[])
                        setC4L(Object.values(data[1][8]) as cellProps[])
                        setZPL(Object.values(data[1][9]) as cellProps[])
                    }
                    
                }
            });

        } catch (error:any) {
            console.log('asdas')
        }

       
	}, [pathname]);

  return (
    <>
        <Container maxWidth="xl">
           <div className={styles.table_wrapper}>
                <div className={styles.road_constr}>
                    <ul className={styles.names}> 
                        <li className={styles.name}>ЩМА</li>
                        <li className={styles.name}>КЗ</li>
                        <li className={styles.name}>ЩПЗЦС</li>
                        <li className={styles.name}>С4</li>
                        <li className={styles.name}>ЗП</li>
                    </ul>
                </div>
            <div  className={styles.table} >
                <h3>Правая</h3>
               <div className={styles.pk_wrapper}>
                {pathname=="/3lot" && pk.map(item=> {
                    return (<div className={styles.pk}>{item}</div>)
                })}
                {pathname=="/4lot" && pk2.map(item=> {
                    return (<div className={styles.pk}>{item}</div>)
                })}

               </div>
                <div className={styles.asf}>
                   {cellArr?.map(item=> {
                    return (<Cell setCellArr={setCellArr} cellArr={cellArr} num={item.num} isDoned={item.isDones} types={"asf"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {KZ?.map(item=> {
                    return (<Cell setCellArr={setKZ} cellArr={KZ} num={item.num} isDoned={item.isDones} types={"kz"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {SPCC?.map(item=> {
                    return (<Cell setCellArr={setSPCC} cellArr={SPCC} num={item.num} isDoned={item.isDones} types={"spcc"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {C4?.map(item=> {
                    return (<Cell setCellArr={setC4} cellArr={C4} num={item.num} isDoned={item.isDones} types={"c4"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {ZP?.map(item=> {
                    return (<Cell setCellArr={setZP} cellArr={ZP} num={item.num} isDoned={item.isDones} types={"zp"} />)
                   })}
                </div>
            </div>
           </div>
           <div className={styles.table_wrapper}>
           <div className={styles.road_constr}>
                    <ul className={styles.names}> 
                        <li className={styles.name}>ЩМА</li>
                        <li className={styles.name}>КЗ</li>
                        <li className={styles.name}>ЩПЗЦС</li>
                        <li className={styles.name}>С4</li>
                        <li className={styles.name}>ЗП</li>
                    </ul>
            </div>
            <div  className={styles.table} >
                <h3>Левая</h3>
               <div className={styles.pk_wrapper}>
               {pathname=="/3lot" && pk.map(item=> {
                    return (<div className={styles.pk}>{item}</div>)
                })}
                {pathname=="/4lot" && pk2.map(item=> {
                    return (<div className={styles.pk}>{item}</div>)
                })}

               </div>
                <div className={styles.asf}>
                   {cellArrL?.map(item=> {
                    return (<Cell setCellArr={setCellArrL} cellArr={cellArrL} num={item.num} isDoned={item.isDones} types={"asfl"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {KZL?.map(item=> {
                    return (<Cell setCellArr={setKZL} cellArr={KZL} num={item.num} isDoned={item.isDones} types={"kzl"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {SPCCL?.map(item=> {
                    return (<Cell setCellArr={setSPCCL} cellArr={SPCCL} num={item.num} isDoned={item.isDones} types={"spccl"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {C4L?.map(item=> {
                    return (<Cell setCellArr={setC4L} cellArr={C4L} num={item.num} isDoned={item.isDones} types={"c4l"} />)
                   })}
                </div>
                <div className={styles.asf}>
                   {ZPL?.map(item=> {
                    return (<Cell setCellArr={setZPL} cellArr={ZPL} num={item.num} isDoned={item.isDones} types={"zpl"} />)
                   })}
                </div>
            </div>
           </div>
           <Tables/>
        </Container>
        <ToastContainer autoClose={500} closeOnClick={false} draggable={false}/>
    </>
  )
}

export default RoadLine