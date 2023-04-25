import type { NextPage } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { executeRequest } from "../services/api";
import { Modal } from "react-bootstrap";

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

    return (<>
        <Header sair={sair} showModal={() => setShowModal(true)} />
        <Footer showModal={() => setShowModal(true)}/>
    </>);
}