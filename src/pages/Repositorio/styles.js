import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;
`;
export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0D2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }

`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
            margin-top: 12px;
        }

        img{
            width: 45px;
            height: 45px;
            border-radius: 50px;
            border: 2px solid #0D2636
        }

        div{
            flex: 1;
            margin-left: 12px;

            p{
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }
        }

        strong{
            font-size: 15px;

            a{
                text-decoration: none;
                color: #222

                
            }
            a:hover{
                color: #0071db;
                cursor: pointer;
            }

            span{
                background: #222;
                color: #fff;
                border-radius: 5px;
                font-size: 12px;
                font-weight: 600;
                padding: 5px 7px;
                margin-left: 10px;
            }
        }
    }
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        margin-top: 25px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;

export const FilterList = styled.div`

        display: flex;
        flex-direction: row;

    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 8px;
        border-radius: 5px;
        margin: 0 3px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:nth-child(${props => props.active + 1}){
            background: #0071db;
        }
    }
`;