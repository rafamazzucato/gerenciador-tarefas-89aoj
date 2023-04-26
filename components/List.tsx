/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next"
import { Item } from "./Item"


type ListProps = {
    tasks: any
}


export const List:NextPage<ListProps> = ({tasks}) => {

    return (
        <div className={"container-list "+ (tasks.length > 0  ? 'not-empty' : '')}>
            {tasks.length > 0 
                ? 
                    tasks.map((t:any) => <Item key={t._id} task={t}/>)
                : 
                <>
                    <img src="/empty.svg" alt="Nenhuma tarefa encontrada"/>
                    <p>Você ainda não possui tarefas cadastradas!</p>
                </>
            }
        </div>
    )
}