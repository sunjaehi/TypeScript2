import React from 'react';
import logo from './logo.svg';
import styled from '@emotion/styled';
import { Header } from 'components/Header';
import { BlogPost } from 'components/BlogPost';
import './App.css';
import { useState,useEffect } from 'react';
//import mockPosts from 'mock/posts.json';
import { Button } from 'components/Button';
import { Form } from 'components/Form';

const Container=styled.div`
  height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  background-color: #eee;
  overflow:scroll; 
`;
const ButtonContainer = styled.div`
  position:absolute;
  right:40px;
  bottom:40px;
`;
interface Post {
  readonly id:number;
  readonly userId:number;
  readonly title:string;
  readonly body:string;
}
function App() {
  const [posts,setPosts]=useState<ReadonlyArray<Post>>([]);
  const [showForm, setShowForm]=useState(false);

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response)=>response.json()) //서버로부터 전달받은 데이터를 JSON으로 파싱
      .then((json)=>setPosts(json)) //JSON으로 파싱한 데이터를 전달받아 state에 저장
      .catch((error)=>{ //에러 처리
        console.error(error);
      });
  },[]);
  
  return (
    <Container>
      <Header/>
      {posts.map((post)=> (
        <BlogPost key={post.id} title={post.title} body={post.body} />
      ))}
      <ButtonContainer>
        <Button label="등록" onClick={()=>setShowForm(true)} />
      </ButtonContainer>
      {showForm && <Form onClose={()=>setShowForm(false)} />}
    </Container>
  );
}

export default App;
