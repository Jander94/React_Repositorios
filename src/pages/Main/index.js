import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main(){

    const [ newRepo, setNewRepo ] = useState('');
    const [ repositorios, setRepositorios ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ alerta, setAlerta ] = useState(null);

    // Buscar
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage));
        }
    },[])

    // Salvar alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    },[repositorios])

    const handleSubmit = useCallback((e) => {           //Quando der um Submit
        e.preventDefault();
        
        async function submit(){
            setLoading(true)
            setAlerta(null);
            try{
                if(newRepo === ''){ 
                    throw new Error('Você precisa indicar um repositório!')                                    
                }                

                const response = await api.get(`repos/${newRepo}`)
                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if(hasRepo){
                    throw new Error('Repositório duplicado!')
                }

                const data = {
                    name: response.data.full_name,
                }
                setRepositorios([...repositorios, data])
                setNewRepo('')
            }catch(error){
                setAlerta(true)
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

        submit();
    }, [newRepo, repositorios])


    function handleinputChange(e){           //Quando altera o input
        setAlerta(null);
        setNewRepo(e.target.value)
    }


    const handledelet = useCallback((repo) => {     //Deletar item
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios])
        
    return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={alerta}>

                <input 
                type='text' 
                value={newRepo} 
                placeholder='Adicionar repositórios'
                onChange={handleinputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {!loading? (
                        <FaPlus color="#fff" size={14}/>
                    ) : (
                        <FaSpinner color="#fff" size={14}/>
                    )}                    
                </SubmitButton>

            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>                        
                        <span>
                            <DeleteButton onClick={() => handledelet(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>

                            {repo.name}
                        </span>
                        
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}> 
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))}
            </List>

        </Container>
    );                //O encodeURIComponent utilizado no Link, é para o browser trate o repo.name como um parâmetro e não como outra pasta/pagina
}