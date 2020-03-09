import React from 'react';
import PreviewCard from '../components/PreviewCard'
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <PreviewCard postTitle="Redux에서 Normalize 다루기" contents="웹이 복잡해질수록 프런트엔드(자바스크립트 환경)에서 다뤄야 하는 상태가 많아진다. 그 종류도 점점 다양해지면서 UI의 상태와 도메인 데이터에 대한 값들도 함께 다뤄야 한다. UI도 중요하지만 React Application의 상태를 ‘잘’ 설계(Design)해야 한다.자연스럽게 상태 관리를 위한 라이브러리가 많이 등장했다. 를 시작으로 , 등 여러 라이…"/>
      <PreviewCard postTitle="hello world" contents="asdfasdfasdfasdfsadf"/>
      <PreviewCard postTitle="hello world" contents="asdfasdfasdfasdfsadf"/>
      <PreviewCard postTitle="hello world" contents="asdfasdfasdfasdfsadf"/>
    </div>
  );
}

export default Home;
