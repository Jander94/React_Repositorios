import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import api from '../../services/api';

export default function Repositorio(){

    const { repositorio } = useParams();

    const [ reposit, setReposit ] = useState({});
    const [ issues, setIssues ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ tiposIndex, setTiposIndex ] = useState(0);
    const [ tipos, setTipos ] = useState([
        {state: 'all', label: 'All', active: true},
        {state: 'open', label: 'Open', active: false},
        {state: 'closed', label: 'Closed', active: false},
    ])

    

    useEffect(() => {                    //montar componente na tela
        async function load(){
            const nomeRepo = repositorio;

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: tipos.find(f => f.active).state,
                        per_page: 5
                    }
                })              
            ]);
            setReposit(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();
    },[repositorio, tipos])

    useEffect(() => {                  //Carregar as issues na tela
        async function loadIssue(){
            const nomeRepo = repositorio;
            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: tipos[tiposIndex].state,
                    page,
                    per_page: 5,
                },
            })

            setIssues(response.data);
        }

        loadIssue();
    },[page, repositorio,tipos, tiposIndex])

    function handlePage(action){                            //Alterar as paginas
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    function handleFilter(index){                           //Alterar os filtros (all, open, closed)
        setTiposIndex(index)
    }


    if(loading){
        return(
            <Loading>
                <h1>Carregando</h1>
            </Loading>
        );
    }

    return(
        <Container>
            <BackButton to='/'>
                <FaArrowLeft size={30} color='#000'/>
            </BackButton>

            <Owner>
                <img src={reposit.owner.avatar_url} alt={reposit.owner.login}/>
                <h1>{reposit.name}</h1>
                <p>{reposit.description}</p>
            </Owner>

            <FilterList active={tiposIndex}>
                {tipos.map((tipo, index) => (                    
                    <button type="button" key={tipo.label} onClick={() => handleFilter(index)}> 
                        {tipo.label}
                    </button>                   
                ))}              
            </FilterList>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>

                        <img src={issue.user.avatar_url} alt={issue.user.login}/>

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>

                            <p>{issue.user.login}</p>
                        </div>

                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button type="button" disabled={page < 2} onClick={() => handlePage('back') }>Voltar</button>
                <button type="button" onClick={() => handlePage('next')}>Avançar</button>
            </PageActions>
        </Container>
    );//
}