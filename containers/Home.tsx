import type { NextPage } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { executeRequest } from "../services/api";
import { Modal } from "react-bootstrap";
import { Filter } from "@/components/Filter";
import { List } from "@/components/List";

type HomeProps = {
    setToken(s: string): void
}
export const Home: NextPage<HomeProps> = ({ setToken }) => {

    // STATES DO FILTER
    const [list, setList] = useState([]);
    const [previsionDateStart, setPrevisionDateStart] = useState('');
    const [previsionDateEnd, setPrevisionDateEnd] = useState('');
    const [status, setStatus] = useState(0);

    // STATES DO MODAL
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [finishPrevisionDate, setFinishPrevisionDate] = useState('');

    const sair = () => {
        localStorage.clear();
        setToken('');
    }

    const getFilteredData = async() => {
        try{

            let query = '?status='+status;

            if(previsionDateStart){
                query += '&finishPrevisionStart=' + previsionDateStart;
            }

            if(previsionDateEnd){
                query += '&finishPrevisionEnd=' + previsionDateEnd;
            }

            const response = await executeRequest('task'+query, 'GET');
            if(response?.data){
                setList(response?.data);
            }
        }catch(e){
            console.log('Ocorreu erro ao buscar dados:', e);
        }
    }

    useEffect(() => {
        getFilteredData();
    }, [previsionDateStart, previsionDateEnd, status]);

    return (<>
        <Header sair={sair} showModal={() => setShowModal(true)} />
        <Filter 
            previsionDateStart={previsionDateStart}
            previsionDateEnd={previsionDateEnd}
            status={status}
            setPrevisionDateStart={setPrevisionDateStart}
            setPrevisionDateEnd={setPrevisionDateEnd}
            setStatus={setStatus}
        />
        <List tasks={list}/>
        <Footer showModal={() => setShowModal(true)}/>
    </>);
}